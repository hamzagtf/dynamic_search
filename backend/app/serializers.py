from rest_framework import serializers
from .models import ControlData, PatientControlData, PatientArchiveControlData

class ControlDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlData 
        fields = ['id','unitName', 'unit']
        
    
    

class PatientControlDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientControlData
        fields = ['id', 'unitName', 'unit', 'patient', 'value', 'date']
    



class PatientControlDataArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientArchiveControlData
        fields = ['id','unitName', 'unit', 'patient', 'value', 'date']
    

    
 