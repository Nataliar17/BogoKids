from django.contrib import admin
from .models import Actividad
from django.utils.html import format_html

class ActividadAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'edad', 'costo', 'imagen_preview', 'destacada']
    list_editable = ('destacada',)
    def imagen_preview(self,obj):
        if obj.imagen:
            return format_html('<img src= "{}" style="max-width:50px; max-height:50px"/>', obj.imagen.url)
        else:
            return 'No image'
admin.site.register(Actividad, ActividadAdmin)
# Register your models here.
