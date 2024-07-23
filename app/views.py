from django.shortcuts import render
from django.views.generic import TemplateView
import json
from django.http import JsonResponse, HttpResponseForbidden
from .models import Level0Design

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

        print("Incoming data:", data)

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

        # Create new data entry in database
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

        new_design.save()

        return JsonResponse({'message': 'Data saved successfully'})
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)
      
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)