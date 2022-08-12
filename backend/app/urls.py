from django.urls import path, re_path
from .views import ControlDataApiView, PatientApiView, FilterControlData,PatientArchiveApiView


urlpatterns = [
    path('' , ControlDataApiView.as_view()),
    path('patient/', PatientApiView.as_view()),
    path('patientArchive/', PatientArchiveApiView.as_view()),
    path('patient/<int:pk>/', PatientApiView.as_view()),
    path('search/', FilterControlData.as_view()),
]
