


# The Endpoints

The `API base URL` is `https://ckx-restful-api.herokuapp.com/`

## Get all food sightings 

```
GET /sightings
```
Returns an array of sighting JSON objects.

### Document structure
The JSON object returns by the endpoint follow the structure below:
```
{
    "_id": "615d3e2d790e2daeada21ec4",
    "description": "Free food outisde LT2",
    "food": [
        "curry chicken",
        "fried rice",
        "spring rolls"
    ],
    "datetime": "2021-12-01T00:00:00.000Z"
}
```

## Create a new sighting
```
POST /sighting
```

Create a new free food sighting. The structure of the JSON object is:
```
{
    "description": "",
    "food": [
      
     ],
    "datetime": "2021-12-01T00:00:00.000Z"
}
```

### Parameters

* `description`: The description of the food sighting
* `food`: An array of the food items at the sighting
* `datetime`: (optional) the date and time of the sighting

## Update existing sightings


```
PUT /sighting/<sighting_id>
```
Replace the sighting record associated with `sighting_id` with the object in the request.

### URL parameters
* `sighting_id`: the ID of the sighting

### Parameters
* `description`: The description of the food sighting
* `food`: An array of the food items at the sighting
* `datetime`: (optional) the date and time of the sighting

## Delete a sighting
Delete a sighting by its ID

```
DELETE /sighting/<sighting_id>
```
# Dependencies:

* express
* dotenv
* cors
* mongodb

