from medical_app import serializers
from rest_framework import serializers
from .models import Doctor, Patient, Appointment,UserProfile, NewPatient
from django.contrib.auth.models import User


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['middle_name', 'mobile']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        UserProfile.objects.create(user=user, **profile_data)
        return user
    
# class NewPatientSerializer(serializers.ModelSerializer):
#     patient = PatientSerializer()

#     class Meta:
#         model = NewPatient
#         fields = '__all__'

#     def create(self, validated_data):
#         patient_data = validated_data.pop('patient')
#         patient = Patient.objects.create(**patient_data)
#         new_patient = NewPatient.objects.create(patient=patient, **validated_data)
#         return new_patient


class NewPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewPatient
        fields = '__all__'

