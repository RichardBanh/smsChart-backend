from django.db import models
from doctors.models import Doctors
from patients.models import Patients


# Create your models here.
class Medication(models.Model):
    patient_id = models.OneToOneField(
        Patients,
        on_delete=models.CASCADE,
        related_name='medication'
    )
    patient_uuid = models.CharField(max_length=50, unique=True)
    doctor_id = models.ForeignKey(
        Doctors, null=True, on_delete=models.SET_NULL
    )
    doctor_uuid = models.CharField(max_length=50, unique=True)
    medication_1 = models.CharField(max_length=50, null=True)
    medication_2 = models.CharField(max_length=50, null=True)
    medication_3 = models.CharField(max_length=50, null=True)
    medication_4 = models.CharField(max_length=50, null=True)
    medication_5 = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f'Patient: {Patients.objects.get(pk=self.patient_id).uuid}'
