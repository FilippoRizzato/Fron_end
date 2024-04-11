from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import DB
import product
o = DB.get_product_by_id
def test_get_product_by_id(o):
    assert o == 
