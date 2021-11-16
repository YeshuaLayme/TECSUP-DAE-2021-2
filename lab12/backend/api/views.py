from rest_framework.decorators import api_view 
from rest_framework.response import Response

from .models import Prestamo 
from .serializers import PrestamoSerializer
# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({'mensaje':'Api rest de PRESTAMOS DE LIBROS'})


@api_view(['GET', 'POST'])
def prestamos(request):
    if request.method == 'GET':
        lstPrestamos = Prestamo.objects.all()
        serPrestamos = PrestamoSerializer(lstPrestamos,many=True)
        return Response(serPrestamos.data)
    elif request.method == 'POST':
        serPrestamos = PrestamoSerializer(data=request.data)
        if serPrestamos.is_valid():
            serPrestamos.save()
            return Response(serPrestamos.data)
        else:
            return Response(serPrestamos.erros)

@api_view(['GET','PUT','DELETE'])
def prestamosdetalle(request,prestamo_id):
    objPrestamos = Prestamo.objects.get(id=prestamo_id)
    
    if request.method == 'GET':
        serPrestamos = PrestamoSerializer(objPrestamos)
        return Response(serPrestamos.data)
    elif request.method == 'PUT':
        serPrestamos = PrestamoSerializer(objPrestamos,data=request.data)
        if serPrestamos.is_valid():
            serPrestamos.save()
            return Response(serPrestamos.data)
        else:
            return Response(serPrestamos.errors)
    elif request.method == 'DELETE':
        objPrestamos.delete()
        return Response(status=204)   