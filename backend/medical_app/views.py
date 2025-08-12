from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Doctor, Patient, Appointment,UserProfile, NewPatient
from django.contrib.auth.models import User
from .serializers import DoctorSerializer, PatientSerializer, AppointmentSerializer, UserSerializer
from .serializers import NewPatientSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class NewPatientViewSet(viewsets.ModelViewSet):
    queryset = NewPatient.objects.all()
    serializer_class = NewPatientSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
# @api_view(['POST'])
# def register_user(request):
#     serializer = CustomUserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_user(request):
    data = request.data

    username = data.get('username')
    password = data.get('password')
    email = data.get('email', '')
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')

    # profile-related
    middle_name = data.get('middle_name', '')
    mobile = data.get('mobile', '')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    # ✅ Create user
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    # ✅ Assign and save first and last name
    user.first_name = first_name
    user.last_name = last_name
    user.save()  # 🔴 Don't forget this!

    # ✅ Create UserProfile for extra fields
    UserProfile.objects.create(
        user=user,
        middle_name=middle_name,
        mobile=mobile
    )

    return Response({'success': True,'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=401)

@api_view(['GET'])

def fetch_patient_visits(request):
    mobile = request.GET.get('mobile')
    patient_id = request.GET.get('custom_patient_id')

    if not mobile and not patient_id:
        return Response({"error": "Please provide mobile or custom_patient_id"}, status=400)

    if patient_id:
        patients = NewPatient.objects.filter(custom_patient_id=patient_id)
    else:
        patients = NewPatient.objects.filter(mobile=mobile)

    serializer = NewPatientSerializer(patients, many=True)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def create_new_visit(request):
    data = request.data

    # Required: custom_patient_id must be passed from frontend
    if not data.get('custom_patient_id'):
        return Response({'error': 'custom_patient_id is required for revisit'}, status=400)

    serializer = NewPatientSerializer(data=data)
    if serializer.is_valid():
        serializer.save()  # Creates new visit
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def patient_history(request):
    mobile = request.GET.get('mobile', None)
    patient_id = request.GET.get('patient_id', None)

    if not mobile and not patient_id:
        return Response({"error": "Please provide mobile or patient_id"}, status=status.HTTP_400_BAD_REQUEST)

    # Filter by either mobile or patient_id
    if mobile:
        visits = NewPatient.objects.filter(mobile=mobile).order_by('-note_date')
    elif patient_id:
        visits = NewPatient.objects.filter(custom_patient_id=patient_id).order_by('-note_date')

    if not visits.exists():
        return Response({"error": "No patient found"}, status=status.HTTP_404_NOT_FOUND)

    # First record = patient details (can be latest or first)
    patient_details = NewPatientSerializer(visits.first()).data

    # All visits list
    visits_data = NewPatientSerializer(visits, many=True).data

    return Response({
        "patient": patient_details,
        "visits": visits_data
    }, status=status.HTTP_200_OK)