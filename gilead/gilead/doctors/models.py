import uuid
from django.contrib.auth.models import User
from django.db import models

from datetime import datetime


def hex_uuid():
    return uuid.uuid4().hex

class Doctors(models.Model):
    uuid = models.CharField(
        max_length=32, default=hex_uuid, editable=False, unique=True
    )
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='doctor'
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    latitude = models.IntegerField(null=True)
    longitude = models.IntegerField(null=True)
    phone_number = models.CharField(max_length=20)
    email = models.CharField(max_length=50, null=True)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
                f'uuid: {self.uuid}.'
                f'Username: {self.user.username}.'
                f'Name: {self.first_name} {self.last_name}'
            )

class DoctorSchedules(models.Model):
    uuid = models.CharField(
        max_length=32, default=hex_uuid, editable=False, unique=True
    )
    drid = models.CharField(max_length=32,  unique=False, null=True)
    patient_name = models.CharField(max_length=32,  unique=False, null=True)
    date = models.CharField(max_length=32, unique=False,null=True)
    time = models.CharField(max_length=32, unique=False,null=True)
    duration = models.CharField(max_length=32, unique=False,null=True)
    phone_number = models.CharField(max_length=20, null=True)
    
    def __str__(self):
        return f'uuid: {self.uuid}. Patient: {self.patient_name}'

# mon =  models.BooleanField(editable=True, default=False)
#     tue = models.BooleanField(editable=True, default=False)
#     wed = models.BooleanField(editable=True, default=False)
#     thu = models.BooleanField(editable=True, default=False)
#     fri = models.BooleanField(editable=True, default=False)
#     sat = models.BooleanField(editable=True, default=False)
#     sun = models.BooleanField(editable=True, default=False)