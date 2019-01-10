from geographiclib.geodesic import Geodesic
import googlemaps
import string
api_key="AIzaSyD4ULRyhwhux8lmfESkwICF4ZJSJnlQesI"

def getCoordinates(address):
	if address is "":
		return (-33.870398,151.206738)
	api_key="AIzaSyD4ULRyhwhux8lmfESkwICF4ZJSJnlQesI"
	try:
	    gmaps = googlemaps.Client(key=api_key)
	    result = gmaps.geocode(address)
	    lat = result[0]['geometry']['location']['lat']
	    long = result[0]['geometry']['location']['lng']
	    return lat,long
	except Exception as e:
	    print("Something isnt right", e)
	    return ('null')
