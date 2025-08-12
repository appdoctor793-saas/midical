from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import DoctorViewSet, PatientViewSet, AppointmentViewSet,register_user,NewPatientViewSet
from . import views
router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'newpatients', NewPatientViewSet, basename='newpatient')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('fetch-patient-visits/', views.fetch_patient_visits, name='fetch_patient_visits'),
    path('create_new_visit/', views.create_new_visit, name='create_new_visit'),
    path('patient-history/', views.patient_history, name='patient-history'),
]