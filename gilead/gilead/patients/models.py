import uuid
from doctors.models import Doctors
from django.db import models


def hex_uuid():
    return uuid.uuid4().hex


# Create your models here.
class Patients(models.Model):
    doctor_id = models.ForeignKey(
        Doctors, null=True, on_delete=models.SET_NULL
    )
    uuid = models.CharField(
        max_length=32, default=hex_uuid, editable=False, unique=True
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.PositiveSmallIntegerField(null=True)
    height = models.CharField(max_length=50, null=True)
    blood_type = models.CharField(max_length=3)
    weight = models.PositiveSmallIntegerField(null=True)
    latitude = models.IntegerField(null=True)
    longitude = models.IntegerField(null=True)
    phone_number = models.CharField(max_length=20)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'uuid: {self.uuid}. Name: {self.first_name} {self.last_name}'

class PatientChartModel(models.Model):
    doctor_id = models.ForeignKey(
        Doctors, null=True, on_delete=models.SET_NULL
    )
    uuid = models.CharField(
        max_length=32, default=hex_uuid, editable=False, unique=True
    )
    patient_uuid = models.CharField(
        max_length=50
    )
    patient = models.ForeignKey(Patients, on_delete=models.SET_NULL, null=True,)
    patientNote = models.TextField()
    date = models.CharField(max_length=32)
    def __str__(self):
        return f'patient_uuid: {self.patient_uuid}. Patient: {self.patient}'


# class PatientHivModel(models.Model):
#     uuid = models.CharField(
#         max_length=32, default=hex_uuid, editable=False, unique=True
#     )
#     patient_uuid = models.CharField(
#         max_length=50
#     )
#     def __str__(self):
#         return f'patient_uuid: {self.patient_uuid}. Patient: {self.patient}'
