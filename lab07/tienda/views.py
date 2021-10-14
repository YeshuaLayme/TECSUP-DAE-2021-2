
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

def producto(request,product_id):
    product = Producto.objects.get(pk=product_id)
    context = {
        'producto':producto
    }
    return render(request,'productos.html',context)

def agregarCarrito(request,producto_id):
    objProducto = Producto.objects.get(id=producto_id)
    carritoProducto = Cart(request)
    carritoProducto.add(objProducto,1)
    print(request.session.get("cart"))
    return render(request,'carrito.html')

def eliminarProductoCarrito(request,producto_id):
    objProducto = Producto.objects.get(id=producto_id)
    carritoProducto = Cart(request)
    carritoProducto.remove(objProducto)
    print(request.session.get("cart"))
    return render(request,'carrito.html')

def limpiarCarrito(request):
    CarritoProducto = Cart(request)
    CarritoProducto.clear()
    print(request.session.get("cart"))
    return render(request,'carrito.html')

def carrito(request):
    print(request.session.get("cart"))
    return render(request,'carrito.html')
