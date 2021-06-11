from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from doctors.models import Doctors, DoctorSchedules


class DoctorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctors
        fields = (
            'uuid',
            'first_name',
            'last_name',
            'email',
            'latitude',
            'longitude',
            'phone_number',
            'registration_date'
        )


class DoctorsSerializerWithToken(serializers.ModelSerializer):

    doctor = DoctorsSerializer()
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    #   Return token immediately after account creation.
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        doctor_data = validated_data.pop('doctor')
        user = User.objects.create_user(**validated_data)
        Doctors.objects.create(
            user=user,
            first_name=doctor_data['first_name'],
            last_name=doctor_data['last_name'],
            email=doctor_data['last_name'],
            phone_number=doctor_data['phone_number'],
            latitude=doctor_data['latitude'],
            longitude=doctor_data['longitude'],
            )
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'doctor')


class DoctorsAppointmentSerial(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedules
        fields = (
            'uuid',
            'drid',
            'patient_name',
            'date',
            'time',
            'phone_number',
            'duration'
        )
