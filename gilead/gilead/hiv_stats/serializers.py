from rest_framework import serializers
from .models import HIVStats


class HIVStatsSerializer(serializers.ModelSerializer):

    class Meta:
        model = HIVStats
        fields = (
            'patient_id',
            'patient_uuid',
            'doctor_id',
            'doctor_uuid',
            'antibody_test_result',
            'antigen_test_result',
            'nucleic_acid_test_result',
            'cd4_t_test_result',
            'drug_resistant_type',
            'symptoms',
            'hiv_test'
        )
