from ..odoo_client import OdooClient


class LeadService:

    def __init__(self):
        self.client = OdooClient()
        self.odoo = self.client.odoo
        self.model = self.odoo.env['crm.lead']

    def list(self, limit=20, offset=0):
        ids = self.model.search([], limit=limit, offset=offset)
        return self.model.read(ids, [
            'id',
            'name',
            'email_from',
            'stage_id',
            'expected_revenue'
        ])

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