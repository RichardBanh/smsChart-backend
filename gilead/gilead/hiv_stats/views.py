from django.core.exceptions import PermissionDenied
from django.http import Http404
from hiv_stats.models import HIVStats
from hiv_stats.serializers import HIVStatsSerializer
from doctors.models import Doctors
from patients.models import Patients
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class HIVStatsList(APIView):
    """List all HIV stats of all patients."""

    def get(self, request, format=None):
        if request.user.is_staff:
            hiv_stats = HIVStats.objects.all()
        else:
            hiv_stats = list(HIVStats.objects.filter(
                doctor_id=request.user.doctor.pk
                )
            )
        serializer = HIVStatsSerializer(hiv_stats, many=True)
        return Response(serializer.data)


class HIVStatsDetail(APIView):
    """Create, Get, Update or Delete a patients HIV stats."""

    def get_hiv_stats(self, uuid):
        try:
            return HIVStats.objects.get(
                patient_id=Patients.objects.get(uuid=uuid).pk
            )
        except HIVStats.DoesNotExist:
            raise Http404

    def get(self, request, uuid, format=None):
        hiv_stats = self.get_hiv_stats(uuid)
        serializer = HIVStatsSerializer(hiv_stats)
        return Response(serializer.data)

    def put(self, request, uuid, format=None):
        try:
            hiv_stats = self.get_hiv_stats(uuid)
        except Http404:
            return self.post(request, uuid)

        request.data['patient_id'] = Patients.objects.get(uuid=uuid).pk
        request.data['patient_uuid'] = Patients.objects.get(uuid=uuid).uuid
        request.data['doctor_id'] = request.user.doctor.pk
        request.data['doctor_uuid'] = Doctors.objects.get(
            pk=request.user.doctor.pk
        ).uuid

        serializer = HIVStatsSerializer(hiv_stats, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid, format=None):
        hiv_stats = self.get_hiv_stats(uuid)
        hiv_stats.delete()
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

        serializer = HIVStatsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        if serializer.errors.get('patient_id'):
            return Response(
                f'Error: {serializer.errors}.'
                f'Did you already create hiv_stats for patient {uuid}?',
                status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
