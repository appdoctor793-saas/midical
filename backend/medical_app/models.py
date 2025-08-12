from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    available_from = models.TimeField()
    available_to = models.TimeField()

    def __str__(self):
        return f"Dr. {self.name} ({self.specialization})"

class Patient(models.Model):
    name = models.CharField(max_length=100,null=True)
    email = models.EmailField(unique=True,null=True)
    phone = models.CharField(max_length=15,null=True)
    address = models.TextField(blank=True, null=True)
    dob = models.DateField(verbose_name="Date of Birth",null=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return self.name
    
class NewPatient(models.Model):
    patient = models.CharField(max_length=255 )
    age = models.IntegerField()
    sex = models.CharField(max_length=10)
    email = models.EmailField(unique=False, default='null', blank=True)
    mobile = models.CharField(max_length=15,default='null', blank=True)
    address = models.TextField(blank=False, null=True,default='null')
    doctor_name = models.CharField(max_length=100)
    appointment_date = models.DateTimeField()
    note_date = models.DateTimeField(auto_now_add=True,null=True)
    custom_patient_id = models.CharField(max_length=100)
    UVA_OD = models.CharField(max_length=10)
    UVA_OS = models.CharField(max_length=10)
    BCVA_OD = models.CharField(max_length=10)
    BCVA_OS = models.CharField(max_length=10)
    IOP_OD = models.CharField(max_length=10)
    IOP_OS = models.CharField(max_length=10)
    doctor_notes = models.TextField()
    investigation = models.TextField()

    def __str__(self):
        return f"{self.patient.name} - {self.custom_patient_id}"


class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Scheduled')

    def __str__(self):
        return f"{self.appointment_date} - {self.patient.name} with Dr. {self.doctor.name}"
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    middle_name = models.CharField(max_length=100, blank=True)
    mobile = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.username}'s profile"