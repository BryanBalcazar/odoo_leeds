from django.urls import path
from .views import get_leads, health_check

urlpatterns = [
    path('leads/', get_leads),
    path('health/', health_check),
]
