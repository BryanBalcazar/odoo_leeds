from django.urls import path
from .views import *

urlpatterns = [
    path('leads/', list_leads),
    path('leads/<int:lead_id>/', retrieve_lead),
    path('leads/create/', create_lead),
    path('leads/<int:lead_id>/update/', update_lead),
    path('leads/<int:lead_id>/delete/', delete_lead),
]
