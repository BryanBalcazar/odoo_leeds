# odoo_api/odoo_client.py
import odoorpc
from django.conf import settings

class OdooClient:
    def __init__(self):
        self.host = 'localhost'
        self.port = 8069
        self.database = 'odoo_db'
        self.username = 'admin'
        self.password = 'admin'
        self.protocol = 'jsonrpc'
        
    def connect(self):
        """Establece conexión con Odoo"""
        try:
            odoo = odoorpc.ODOO(self.host, port=self.port, protocol=self.protocol)
            odoo.login(self.database, self.username, self.password)
            return odoo
        except Exception as e:
            print(f"Error conectando a Odoo: {e}")
            return None
    
    def get_leads(self, limit=100):
        """Get the leads of Odoo"""
        odoo = self.connect()
        if not odoo:
            return []
        
        try:
            #Search leads: crm.lead in Odoo
            lead_ids = odoo.env['crm.lead'].search([], limit=limit)
            leads = odoo.env['crm.lead'].read(lead_ids, [
                'id', 'name', 'partner_id', 'email_from', 'phone', 
                'stage_id', 'user_id', 'create_date', 'expected_revenue',
                'probability', 'company_id', 'description'
            ])
            
            formatted_leads = []
            for lead in leads:
                formatted_leads.append({
                    'id': lead['id'],
                    'name': lead['name'],
                    'email': lead.get('email_from', ''),
                    'phone': lead.get('phone', ''),
                    'stage': lead.get('stage_id', [False, ''])[1] if lead.get('stage_id') else '',
                    'assigned_to': lead.get('user_id', [False, ''])[1] if lead.get('user_id') else '',
                    'created_date': lead.get('create_date', ''),
                    'expected_revenue': lead.get('expected_revenue', 0),
                    'probability': lead.get('probability', 0),
                    'description': lead.get('description', '')
                })
            
            return formatted_leads
        except Exception as e:
            print(f"Error obteniendo leads: {e}")
            return []