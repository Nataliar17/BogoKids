from django.shortcuts import render
from .models import Actividad

def actividades_lista(request):
    actividades = Actividad.objects.all()
    actividades_destacadas = Actividad.objects.filter(destacada=True)[:5]

    return render(request, 'actividades_lista.html', {
        'actividades': actividades,
        'actividades_destacadas': actividades_destacadas
    })
