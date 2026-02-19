from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.lead_service import LeadService
from django.http import JsonResponse
from .odoo_client import OdooClient


def health_check(request):
    return JsonResponse({
        "success": True, 
        "message": "Backend conectado exitosamente"
    })

@api_view(['GET'])
def list_leads(request):
    service = LeadService()
    limit = int(request.GET.get('limit', 20))
    offset = int(request.GET.get('offset', 0))

    leads = service.list(limit=limit, offset=offset)

    return Response({
        "success": True,
        "data": leads
    })


@api_view(['GET'])
def retrieve_lead(request, lead_id):
    service = LeadService()
    lead = service.retrieve(lead_id)

    return Response({
        "success": True,
        "data": lead
    })


@api_view(['POST'])
def create_lead(request):
    try:
        odoo = OdooClient()
        lead_id = odoo.create_lead(request.data)
        return Response({
            "success": True,
            "lead_id": lead_id
        })

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e)
        }, status=500)


@api_view(['PUT'])
def update_lead(request, lead_id):
    try:
        odoo = OdooClient()
        odoo.update_lead(lead_id, request.data)
        return Response({
            "success": True,
            "message": "Lead updated"})

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e)}, 
            status=500)


@api_view(['DELETE'])
def delete_lead(request, lead_id):
    service = LeadService()
    service.delete(lead_id)

    return Response({"success": True})

@api_view(['GET'])
def get_lead(request, lead_id):
    try:
        odoo = OdooClient()
        lead = odoo.get_lead_by_id(lead_id)
        return Response({
            "success": True,
            "data": lead
        })
    except Exception as e:
        return Response({"success": False, "error": str(e)}, status=500)