from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class ControlData(models.Model):
    """
    this model include the name of all control data 
    """
    unitName = models.CharField(max_length=200)
    unit = models.CharField(max_length=50)

    



class PatientControlData(models.Model):

    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    unitName = models.CharField(max_length=100)
    unit = models.CharField(max_length=50)
    value = models.IntegerField() 
    date = models.CharField(max_length=200)
    #DOCTOR = models.ForeignKey(Doctor, on_delete=models.CASCADE)



class PatientArchiveControlData(models.Model):

    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    unitName = models.CharField(max_length=100)
    unit = models.CharField(max_length=50)
    value = models.IntegerField() 
    date = models.CharField(max_length=200)
    #DOCTOR = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    

  










