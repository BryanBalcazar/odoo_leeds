from ..odoo_client import OdooClient


class LeadService:

    def __init__(self):
        self.client = OdooClient()
        self.odoo = self.client.odoo
        self.model = self.odoo.env['crm.lead']

    def list(self, limit=20, offset=0):
        ids = self.model.search([], limit=limit, offset=offset)
        # Pedimos los campos necesarios a Odoo
        leads = self.model.read(ids, ['id', 'name', 'email_from', 'phone', 'stage_id', 'user_id', 'expected_revenue', 'probability'])
        
        for lead in leads:
            lead['email'] = lead.get('email_from') or ''
            lead['phone'] = lead.get('phone') or ''
            lead['stage'] = lead['stage_id'][1] if lead.get('stage_id') else 'Nuevo'
            lead['assigned_to'] = lead['user_id'][1] if lead.get('user_id') else 'Sin asignar'
            lead['expected_revenue'] = lead.get('expected_revenue') or 0
            lead['probability'] = lead.get('probability') or 0
                    
        return leads

    def retrieve(self, lead_id):
        result = self.model.read([lead_id])
        if not result:
            return None
        return result[0]

    def create(self, data):
        return self.model.create(data)

    def update(self, lead_id, data):
        return self.model.write([lead_id], data)

    def delete(self, lead_id):
        return self.model.unlink([lead_id])