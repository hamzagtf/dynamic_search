from rest_framework import serializers
from .models import ControlData, PatientControlData, PatientArchiveControlData

class ControlDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlData 
        fields = ['id','unitName', 'unit']
        
    
    

class PatientControlCreateDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientControlData
        fields = ('id', 'patient', 'controlData', 'value', 'date')

class PatientControlRetrieveDataSerializer(serializers.ModelSerializer):
    controlData = ControlDataSerializer()

    class Meta:
        model = PatientControlData
        fields = ('id', 'patient', 'controlData', 'value', 'date')  
        read_only = ('id', 'patient', 'controlData', 'value', 'date')    
    



class PatientControlDataArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientArchiveControlData
        fields = ['id','unitName', 'unit', 'patient', 'value', 'date']
    

    
 