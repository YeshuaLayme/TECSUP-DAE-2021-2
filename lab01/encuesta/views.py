from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
    return HttpResponse("Saludos desde la vista de encuestas!")

def detalle(request,pregunta_id):
    return HttpResponse("Estás viendo la pregunta %s." % pregunta_id)

def resultados(request,pregunta_id):
    response = "Estás viendo los resultados de la pregunta %s."
    return HttpResponse(response % pregunta_id)

def votar(request,pregunta_id):
    respuesta = "Estás votando por la pregunta " + str(pregunta_id)
    return HttpResponse(respuesta)