from django.db import models
from django.db.models import JSONField 
from django.contrib.auth.models import AbstractUser

class Level0Design(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True)
    project_name = models.TextField(default='')
    module_name = models.TextField(default='')
    inputs = JSONField(default=list)  # Store inputs as a list of dictionaries
    outputs = JSONField(default=list)  # Store outputs as a list of dictionaries
    functionality = models.TextField(default='')

    date = models.TextField(default='')
    time = models.TextField(default='')

    def __str__(self):
        return self.project_name 

class User(AbstractUser):
    
    def __str__(self):
        return self.username




    
