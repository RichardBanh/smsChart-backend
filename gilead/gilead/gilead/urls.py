"""gilead URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.urlpatterns import format_suffix_patterns
from doctors import views as doctors_views
from hiv_stats import views as hiv_stats_views
from patients import views as patients_views
from medication import views as medication_views
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),

    path('doctors/', doctors_views.DoctorsList.as_view()),

    path('doctors/current_user/', doctors_views.current_user),
    path(
        'doctors/<str:uuid>/',
        doctors_views.DoctorsDetail.as_view(),
        name='doctors-detail'
    ),
    path('doctors/appointments/<str:dr_id>/', doctors_views.DoctorsAppointment.as_view()),
    path('patients/', patients_views.PatientsList.as_view()),


    path('patients/', patients_views.PatientsList.as_view()),
    path('patients/medication', medication_views.MedicationList.as_view()),
    path('patients/hiv_stats', hiv_stats_views.HIVStatsList.as_view()),
    path(
        'patients/<str:uuid>/',
        patients_views.PatientsDetail.as_view(),
    ),
    path('patient-chart/', patients_views.PatientChart.as_view()),
    path(
        'patients/<str:uuid>/medication',
        medication_views.MedicationDetail.as_view()
    ),
    path(
        'patients/<str:uuid>/hiv_stats',
        hiv_stats_views.HIVStatsDetail.as_view()
    ),

    path('token-auth/', obtain_jwt_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)
