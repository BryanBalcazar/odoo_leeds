from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.lead_service import LeadService
from django.http import JsonResponse

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
        "data": [
    {
      "id": 1,
      "name": "Lead de prueba",
      "email": "ejemplo@mail.com",
      "stage": "Nuevo",
      "expected_revenue": 500,
      "probability": 10
    }
  ]
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
    service = LeadService()
    lead_id = service.create(request.data)

    return Response({
        "success": True,
        "id": lead_id
    })


@api_view(['PUT'])
def update_lead(request, lead_id):
    service = LeadService()
    service.update(lead_id, request.data)

    return Response({"success": True})


@api_view(['DELETE'])
def delete_lead(request, lead_id):
    service = LeadService()
    service.delete(lead_id)

    return Response({"success": True})
