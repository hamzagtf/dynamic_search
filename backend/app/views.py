from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, ListAPIView, GenericAPIView
from .models import ControlData, PatientControlData
from .serializers import ControlDataSerializer,PatientControlCreateDataSerializer, PatientControlDataArchiveSerializer, PatientArchiveControlData, PatientControlRetrieveDataSerializer
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError



class ControlDataApiView(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericAPIView):

    queryset = ControlData.objects.all()
    serializer_class = ControlDataSerializer
    #permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):
        data = request.data
        if isinstance(data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                    headers=headers)

    
   

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    
   
    

class FilterControlData(ListAPIView):
    """
    filter the data from control model according
    to url param
    """
    serializer_class = ControlDataSerializer
    
    def get_queryset(self):
        queryset = ControlData.objects.all()
        keyword = self.request.query_params.get('query')
        if keyword is not None:
            queryset = queryset.filter(CONTROLNAME__contains=keyword)
        
        return queryset


    

class PatientApiView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericAPIView):
    queryset = PatientControlData.objects.all() 
    serializer_class = PatientControlRetrieveDataSerializer

    def create(self, request, *args, **kwargs):
       
        data = request.data
        if isinstance(data, list):
            serializer = PatientControlCreateDataSerializer(data=request.data, many=True)
        else:
            serializer = PatientControlCreateDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                    headers=headers)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # uses PK from URL
        serializer = PatientControlCreateDataSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



class PatientArchiveApiView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericAPIView):
    queryset = PatientArchiveControlData.objects.all() 
    serializer_class = PatientControlDataArchiveSerializer
    
    def get_object(self, obj_id):
        try:
            return PatientArchiveControlData.objects.get(id=obj_id)
        except (PatientArchiveControlData.DoesNotExist, ValidationError):
            raise  status.HTTP_400_BAD_REQUEST
    

    def validated_id(self, id_list):
        for id in id_list:
            try:
                PatientArchiveControlData.objects.get(id=id)
            except (PatientArchiveControlData.DoesNotExist, ValidationError):
                raise status.HTTP_400_BAD_REQUEST
        return True
    
    def put(self, request, *args, **kwargs):
        id_list = request.data['id']
        self.validated_id(id_list=id_list)
        instances = []
        for id in id_list:
            obj = self.get_object(obj_id=id)
            obj.enabled = True
            obj.save()
            instances.append(obj)
        serializer = PatientControlDataArchiveSerializer(instances, many=True)
        return Response(serializer.data)


    def create(self, request, *args, **kwargs):
       
        data = request.data
        if isinstance(data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                    headers=headers)
    

    
        
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    # def put(self, request, *args, **kwargs):
    #     return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
 
 