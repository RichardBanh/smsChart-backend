from rest_framework import serializers
from .models import Medication


class MedicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medication
        fields = (
            'patient_id',
            'patient_uuid',
            'doctor_id',
            'doctor_uuid',
            'medication_1',
            'medication_2',
            'medication_3',
            'medication_4',
            'medication_5'
        )
