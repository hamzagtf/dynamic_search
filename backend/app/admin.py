from django.contrib import admin
from .models import PatientControlData, ControlData

admin.site.register(PatientControlData)
admin.site.register(ControlData)
