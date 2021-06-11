from django.core.exceptions import PermissionDenied
from django.http import Http404
from medication.models import Medication
from medication.serializers import MedicationSerializer
from doctors.models import Doctors
from patients.models import Patients
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class MedicationList(APIView):
    """List all medications of all patients."""

    def get(self, request, format=None):
        if request.user.is_staff:
            medication = Medication.objects.all()
        else:
            medication = list(Medication.objects.filter(
                doctor_id=request.user.doctor.pk
                )
            )
        serializer = MedicationSerializer(medication, many=True)
        return Response(serializer.data)


class MedicationDetail(APIView):
    """Create, Get, Update or Delete a patients medication."""

    def get_medication(self, uuid):
        try:
            return Medication.objects.get(
                patient_id=Patients.objects.get(uuid=uuid).pk
            )
        except Medication.DoesNotExist:
            raise Http404

    def get(self, request, uuid, format=None):
        medication = self.get_medication(uuid)
        serializer = MedicationSerializer(medication)
        return Response(serializer.data)

    def put(self, request, uuid, format=None):
        try:
            medication = self.get_medication(uuid)
        except Http404:
            return self.post(request, uuid)

        request.data['patient_id'] = Patients.objects.get(uuid=uuid).pk
        request.data['patient_uuid'] = Patients.objects.get(uuid=uuid).uuid
        request.data['doctor_id'] = request.user.doctor.pk
        request.data['doctor_uuid'] = Doctors.objects.get(
            pk=request.user.doctor.pk
        ).uuid

        serializer = MedicationSerializer(medication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid, format=None):
        medication = self.get_medication(uuid)
        medication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, uuid, format=None):
        if request.user.is_staff:
            raise PermissionDenied()

        request.data['patient_id'] = Patients.objects.get(uuid=uuid).pk
        request.data['patient_uuid'] = Patients.objects.get(uuid=uuid).uuid
        request.data['doctor_id'] = request.user.doctor.pk
        request.data['doctor_uuid'] = Doctors.objects.get(
            pk=request.user.doctor.pk
        ).uuid

        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        if serializer.errors.get('patient_id'):
            return Response(
                f'Error: {serializer.errors}.'
                f'Did you already create medication for patient {uuid}?',
                status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
