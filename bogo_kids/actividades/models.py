from django.db import models

class Actividad(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    edad = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=150)
    costo = models.CharField(max_length=50)
    horario = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='actividades/', blank=True, null=True)
    destacada = models.BooleanField(default=False) 

    def __str__(self):
        return self.nombre
