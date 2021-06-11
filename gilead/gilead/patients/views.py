from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from django.http import Http404
from patients.models import Patients, PatientChartModel
from patients.serializers import PatientsSerializer, PatientChartSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PatientsList(APIView):
    """List all patients, or create a new patient."""

    def get(self, request, format=None):
        if request.user.is_staff:
            patients = Patients.objects.all()
        else:
            patients = list(Patients.objects.filter(
                doctor_id=request.user.doctor.pk)
            )
        serializer = PatientsSerializer(patients, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # New patients should not be creatable from admins as they do not
        # have doctor relations.
        if request.user.is_staff:
            raise PermissionDenied()
        # Set doctor ID to logged in doctor user
        request.data['doctor_id'] = request.user.doctor.pk
        serializer = PatientsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatientsDetail(APIView):
    """Get, Update or Delete a patient."""

    def get_patient(self, uuid):
        try:
            return Patients.objects.get(uuid=uuid)
        except Patients.DoesNotExist:
            raise Http404

    def get(self, request, uuid, format=None):
        patient = self.get_patient(uuid)
        serializer = PatientsSerializer(patient)
        return Response(serializer.data)

    def put(self, request, uuid, format=None):
        patient = self.get_patient(uuid)
        serializer = PatientsSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, uuid, format=None):
        patient = self.get_patient(uuid)
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PatientChart(APIView):

    def get_patientChart(self, patient_uuid):
        try:
            return PatientChartModel.objects.filter(patient_uuid=patient_uuid)
        except ObjectDoesNotExist:
            raise Http404
    
    def put(self, request, format=None):
        patientcharts = self.get_patientChart(request.data['patient_uuid'])
        serializer = PatientChartSerializer(patientcharts , many=True)
        return Response(serializer.data)

    def post(self, request, format=None ):
        print(request.data)
        serializer = PatientChartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
