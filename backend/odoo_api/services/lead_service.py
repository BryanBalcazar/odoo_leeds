from odoo_client import OdooClient

class LeadService:

    def __init__(self):
        self.client = OdooClient()

    def list(self, limit=20, offset=0):
        return self.client.execute_kw(
            'crm.lead',
            'search_read',
            [[]],
            {
                'fields': [
                    'id',
                    'name',
                    'email_from',
                    'stage_id',
                    'expected_revenue'
                ],
                'limit': limit,
                'offset': offset
            }
        )

    def retrieve(self, lead_id):
        return self.client.execute_kw(
            'crm.lead',
            'read',
            [[lead_id]]
        )[0]

    def create(self, data):
        return self.client.execute_kw(
            'crm.lead',
            'create',
            [data]
        )

    def update(self, lead_id, data):
        return self.client.execute_kw(
            'crm.lead',
            'write',
            [[lead_id], data]
        )

    def delete(self, lead_id):
        return self.client.execute_kw(
            'crm.lead',
            'unlink',
            [[lead_id]]
        )
