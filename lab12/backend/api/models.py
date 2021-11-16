from django.db import models

# Create your models here.
    
class Prestamo(models.Model):
    libro = models.CharField(max_length=200, null=True)
    Usuario = models.CharField(max_length=200)  
    fecPrestamo = models.DateTimeField(auto_now=False)
    feacDevolucion = models.DateTimeField(null=True)    
    
    def __str__(self):
        return self.libro