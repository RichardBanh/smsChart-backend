from rest_framework import serializers
from .models import Patients, PatientChartModel


class PatientsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patients
        fields = (
            'uuid',
            'doctor_id',
            'first_name',
            'last_name',
            'age',
            'blood_type',
            'weight',
            'latitude',
            'longitude',
            'phone_number',
            'registration_date',
            'height'
        )

class PatientChartSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientChartModel
        fields= (
            'uuid',
            'doctor_id',
            'patient_uuid',
            'patient',
            'patientNote',
            'date'
        )
