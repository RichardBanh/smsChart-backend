from django.db import models
from doctors.models import Doctors
from patients.models import Patients


# Create your models here.
class HIVStats(models.Model):
    patient_id = models.OneToOneField(
        Patients,
        on_delete=models.CASCADE,
        related_name='hiv_stats'
    )
    patient_uuid = models.CharField(max_length=50, unique=True)
    doctor_id = models.ForeignKey(
        Doctors, null=True, on_delete=models.SET_NULL
    )
    doctor_uuid = models.CharField(max_length=50, unique=True)
    antibody_test_result = models.CharField(max_length=50, null=True)
    antigen_test_result = models.CharField(max_length=50, null=True)
    nucleic_acid_test_result = models.IntegerField(null=True)
    cd4_t_test_result = models.CharField(max_length=50, null=True)
    drug_resistant_type = models.CharField(max_length=50, null=True)
    symptoms = models.TextField(null=True)
    hiv_test = models.IntegerField(null=True)

    def __str__(self):
        return f'Patient: {Patients.objects.get(pk=self.patient_id).uuid}'
