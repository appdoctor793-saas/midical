from django.contrib import admin

# Register your models here.
from .models import Patient, Doctor, Appointment,UserProfile, NewPatient

admin.site.register(UserProfile)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(NewPatient)