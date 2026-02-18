import odoorpc
from django.conf import settings
import os

DB_NAME= os.environ.get('DB_NAME')
USER_NAME= os.environ.get('USER_NAME')
PORT= os.environ.get('PORT')
HOST= os.environ.get('HOST')
PASSWORD= os.environ.get('PASSWORD')
API_RPC= os.environ.get('API_RPC')

class OdooClient:
    def __init__(self):
        self.host = HOST
        self.port = 8069
        self.database = DB_NAME
        self.username = 'andres@mail.com'
        self.password = PASSWORD
        self.protocol = 'jsonrpc'

        self.odoo = self._connect()
        
    def _connect(self):
        try:
            odoo = odoorpc.ODOO(
                self.host,
                port=self.port,
                protocol=self.protocol
            )
            odoo.login(self.database, self.username, self.password)
            return odoo
        except Exception as e:
            raise ConnectionError(f"Odoo connection failed: {e}")
    
