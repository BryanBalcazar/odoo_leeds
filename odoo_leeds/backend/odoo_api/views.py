# odoo_api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .odoo_client import OdooClient

@api_view(['GET'])
def get_leads(request):
    """API para obtener leads de Odoo"""
    limit = request.GET.get('limit', 100)
    
    odoo_client = OdooClient()
    leads = odoo_client.get_leads(limit=int(limit))
    
    return Response({
        'success': True,
        'data': leads,
        'count': len(leads)
    })

@api_view(['GET'])
def health_check(request):
    """Verificar conexión con Odoo"""
    odoo_client = OdooClient()
    odoo = odoo_client.connect()
    
    return Response({
        'success': odoo is not None,
        'message': 'Conectado a Odoo' if odoo else 'Error de conexión'
    })