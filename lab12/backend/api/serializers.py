from django.db import models
from rest_framework import serializers
from rest_framework.utils import field_mapping


from .models import  Prestamo

       
class PrestamoSerializer(serializers.ModelSerializer):
       class Meta:
           model = Prestamo
           fields = '__all__'     