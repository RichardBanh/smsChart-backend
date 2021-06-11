from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from django.http import Http404
from doctors.models import Doctors, DoctorSchedules
from doctors.serializers import DoctorsSerializer, DoctorsSerializerWithToken, DoctorsAppointmentSerial
from django.urls import reverse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status


@api_view(['GET'])
def current_user(request):
    """Redirect authenticated doctors to DoctorsDetail view"""
    if request.user.is_staff:
        raise PermissionDenied()

    doctor_uuid = Doctors.objects.filter(user=request.user.pk).first().uuid

    return redirect(reverse('doctors-detail', kwargs={'uuid': doctor_uuid}))


class DoctorsList(APIView):
    """List all doctors, or create a new doctor."""

    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        doctors = Doctors.objects.all()
        serializer = DoctorsSerializer(doctors, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DoctorsSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                'data': serializer.data,
                'message': 'Doctor registered successfully.'
            }
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorsDetail(APIView):
    """Get, Update or Delete a Doctor."""

    def get_doctor(self, uuid):
        try:
            return Doctors.objects.get(uuid=uuid)
        except Doctors.DoesNotExist:
            raise Http404

    def get(self, request, uuid, format=None):
        doctor = self.get_doctor(uuid)
        username = doctor.user.username
        serializer_data = DoctorsSerializer(doctor).data
        serializer_data['username'] = username
        return Response(serializer_data)

    def put(self, request, uuid, format=None):
        doctor = self.get_doctor(uuid)
        serializer = DoctorsSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid, format=None):
        doctor = self.get_doctor(uuid)
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DoctorsAppointment(APIView):
    def get_dr_appoint(self, dr_id):
        try: 
            return DoctorSchedules.objects.filter(drid=dr_id)
        except DoctorSchedules.objects.DoesNotExist:
            raise Http404
    
    def get_appointment(self, uuid):
        try:
            return DoctorSchedules.objects.get(uuid=uuid)
        except DoctorSchedules.DoesNotExist:
            raise Http404

    def get(self, request, dr_id, format=None):
        doctor_app = self.get_dr_appoint(dr_id)
        serializer_data = DoctorsAppointmentSerial(doctor_app, many=True)
        return Response(serializer_data.data)
    
    def put(self, request, dr_id,format=None):
        appointment = self.get_appointment(request.data["uuid"])
        print(appointment)
        serializer = DoctorsAppointmentSerial(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, dr_id,format=None):
        appointment = self.get_appointment(request.data.uuid)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request, dr_id, format=None):
        serializer = DoctorsAppointmentSerial(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
