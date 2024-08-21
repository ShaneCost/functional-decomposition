from django.shortcuts import render
from django.views.generic import TemplateView
import json
from django.http import JsonResponse, HttpResponseForbidden
from .models import Level0Design, Signals, Level1Design

# Create your views here.

class LandingPageView(TemplateView):
    template_name = "landing.html"

class LevelZeroDesignPageView(TemplateView):
    template_name = "level_0_design.html"

class PrintView(TemplateView):
    template_name = "level_0_design.html"

def save_data(request):
    try:
        # Get the data from the POST request
        data = json.loads(request.body)

        # Get the current user + username
        current_user = request.user

        # Retrieve all the data fields from the JSON
        project_name = data.get('project_name')
        module_name = data.get('module_name')
        inputs = data.get('inputs')
        outputs = data.get('outputs')
        functionality = data.get('functionality')
        date = data.get('date')
        time = data.get('time')
        type = data.get('type')

        if(type == 0):
            # Create new Level0Design object in database
            new_design = Level0Design.objects.create(
                user=current_user,
                project_name=project_name,
                module_name=module_name,
                inputs=inputs,
                outputs=outputs,
                functionality=functionality,
                date=date,
                time=time
            )
        elif(type == 1):
            # Create new Level1Design object in database
            new_design = Level1Design.objects.create(
                user=current_user,
                project_name=project_name,
                module_name=module_name,
                inputs=inputs,
                outputs=outputs,
                functionality=functionality,
                date=date,
                time=time
            ) 
        
        new_design.save()

        # Handle signal creation
        for input_signal in inputs:
            signal_name = input_signal.get('name')
            signal_description = input_signal.get('description')

            # Check if the signal already exists
            if not Signals.objects.filter(signal_name=signal_name).exists():
                Signals.objects.create(
                    user=current_user,
                    signal_name=signal_name,
                    signal_description=signal_description
                )

        for output_signal in outputs:
            signal_name = output_signal.get('name')
            signal_description = output_signal.get('description')

            # Check if the signal already exists
            if not Signals.objects.filter(signal_name=signal_name).exists():
                Signals.objects.create(
                    user=current_user,
                    signal_name=signal_name,
                    signal_description=signal_description
                )

        # Update the project name in our user object 
        current_user.project_name = project_name
        current_user.save()

        return JsonResponse({'message': 'Data saved successfully'})
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)
      
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

class LevelOneDesignPageView(TemplateView):
    template_name = "level_1_design.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Retrieve the current user
        current_user = self.request.user
        # Retrive  the project name
        context['project_name'] = current_user.project_name
        # Retrive all the signals
        signals = Signals.objects.all()  # QuerySet
        signals_data = [{'signal_name': signal.signal_name, 'signal_description': signal.signal_description} for signal in signals]
        context['signals'] = signals_data

        return context