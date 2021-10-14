
from tienda.models import Producto, Categoria
from django.shortcuts import render

# Create your views here.
def index(request):
    product_list = Producto.objects.order_by('nombre')[:10]
    category_list = Categoria.objects.all()
    context = {
        'product_list':product_list,
        'category_list':category_list,
    }
    return render(request,'index.html',context)