from django.contrib import admin
from .models import Level0Design, User, Signals, Level1Design

# Register your models here.

admin.site.register(Level0Design)
admin.site.register(User)
admin.site.register(Signals)
admin.site.register(Level1Design)
