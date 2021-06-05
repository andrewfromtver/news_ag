from dadata import Dadata
import app_config
import sys

a = str(sys.argv[1])
t = app_config.address_api_key

dadata = Dadata(t)

result = dadata.suggest("address", a)
resp = str(result).replace("'", '"').replace("None", "null")
print(resp)