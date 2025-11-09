from django.urls import path
from . import views

urlpatterns = [
    path('', views.actividades_lista)
]