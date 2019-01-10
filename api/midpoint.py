from geographiclib.geodesic import Geodesic
import sys
import googlemaps
import string
import math
api_key="AIzaSyD4ULRyhwhux8lmfESkwICF4ZJSJnlQesI"


gmaps = googlemaps.Client(key=api_key)

# Gets the coordinates of a location given an address (text, lat, long etc)
def getCoordinates(gmaps,address):
    try:
        result = gmaps.geocode(address)
        lat = result[0]['geometry']['location']['lat']
        long = result[0]['geometry']['location']['lng']
    except:
        print("Something isnt right")
        return (0,0)
    return lat,long

#gets the mid point given 2 lat,long coordinates
def getMidPoint(c1,c2):
    lat1, lon1 = c1[0], c1[1]
    lat2, lon2 = c2[0], c2[1]

    # Compute path from 1 to 2
    g = Geodesic.WGS84.Inverse(lat1, lon1, lat2, lon2);
    # Compute midpoint starting at 1
    h1 = Geodesic.WGS84.Direct(lat1, lon1, g['azi1'], g['s12']/2);

    new_l1= h1['lat2']
    new_l2= h1['lon2']

    return (new_l1,new_l2)

#converts gps point to a point on a plane
def convert_to_plane(c1):
    lat, lon = c1[0], c1[1]

    #assume lon/lat input
    #convert to radians
    radians_lat = lat * math.pi/180
    radians_lon = lon * math.pi/180

    #convert to x y z coordinates
    x = math.cos(radians_lon) * math.cos(radians_lat)
    y = math.sin(radians_lon) * math.cos(radians_lat)
    z = math.sin(radians_lat)

    return (x,y,z)

def find_midpoint(list_of_coords):
    x_total = 0
    y_total = 0
    z_total = 0

    #sum of all points
    for i in range(len(list_of_coords)):
        x_total = x_total + list_of_coords[i][0]
        y_total = y_total + list_of_coords[i][1]
        z_total = z_total + list_of_coords[i][2]

    #divide by total number
    x_total = x_total/len(list_of_coords)
    y_total = y_total/len(list_of_coords)
    z_total = z_total/len(list_of_coords)
    #averages are calculated by here

    #convert back to radians
    radians_lon = math.atan2(y_total, x_total)
    hyp = math.sqrt(x_total * x_total + y_total * y_total)
    radians_lat = math.atan2(z_total, hyp)

    #convert back to long/lat points
    lat = radians_lat * 180/math.pi
    lon = radians_lon * 180/math.pi

    return (lat,lon)

#test examples here for midpoints

def finalmidpoint(locationtexts):
    coords = []
    for location in locationtexts:
        coords.append(getCoordinates(gmaps,location))
    convtoplane = []
    if all(c == 'null' for c in coords):
        return 'null'
    for coord in coords:
        if coord != 'null':
            convtoplane.append(convert_to_plane(coord))
    midpoint = find_midpoint(convtoplane)
    return midpoint

#Returns a dictionary of results of venues in a radius around the 2 supplied points
def getPlacesNear2People(address1,address2,keyword="",name="",type="restuarant",radius=800):
    gmaps = googlemaps.Client(key=api_key)
    midPoint = getMidPoint(getCoordinates(gmaps,address1),getCoordinates(gmaps,address2))
    fields = ['formatted_address','geometry','name','photos']
    results  = gmaps.places_nearby(location=midPoint,keyword=keyword,language="en-AU",min_price=1,max_price=5,name=name,open_now=True,type=type,radius=radius)
    results = formatResults(results['results'])
    return midpoint,results


def formatResults(results):
    resultDics = []
    i = 0
    for r in results:
        dic = {}
        dic['name'] = r['name']
        dic['price_level'] = r['price_level']
        dic['rating'] = r['rating']
        dic['types']= r['types']
        dic['coordinates'] = str(r['geometry']['location']['lat']) + ',' + str(r['geometry']['location']['lng'])
        resultDics.append(dic)
    return resultDics

def staticMap(midpoint, coordinates,zoom="14",size="600x600"):
    baseString = "https://maps.googleapis.com/maps/api/staticmap?center={}&zoom={}&size={}".format(midpoint,zoom,size)
    chars = string.ascii_uppercase + string.ascii_uppercase + string.ascii_uppercase
    colours = ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white','black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white','black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white']
    for set in zip(colours,chars,coordinates):
        addString = "&markers=color:{}%7Clabel:{}%7C{}".format(set[0],set[1],set[2])
        baseString = baseString + addString
    baseString = baseString + "&key={}".format(api_key)
    return baseString

def GenerateStaticMap(address1,address2):
    midpoint,results = getPlacesNear2People(address1,address2)
    coords = []
    for r in results:
        coords.append(r['coordinates'])
    return staticMap(midpoint,coords)
