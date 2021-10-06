const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MongoUtil = require('./MongoUtil.js')
const ObjectId = require('mongodb').ObjectId;

let app = express();

// important for RESTFul API:

// allow Express to process JSON payload
// in POST, PUT and PATCH requests
app.use(express.json());

// enable CORS so that our React applications
// hosted on a domain name can use it
app.use(cors());

async function main() {

    await MongoUtil.connect(process.env.MONGO_URI, "tgc14-free-food-sightings")

    app.get('/', (req, res) => {
        res.json({
            "message": "hello world"
        })
    })

    app.post('/sighting', async (req, res) => {

        try {
            // req.body is an object that contains the
            // data sent to the express endpoint
            let description = req.body.description;
            let food = req.body.food;
            // check if the datetime key exists in the req.body object
            // if it does, create a new Date object from it
            // or else, default to today's date
            let datetime = req.body.datetime ? new Date(req.body.datetime) : new Date();

            let db = MongoUtil.getDB();
            let result = await db.collection('sightings').insertOne({
                description, food, datetime
            })

            // inform the client that the process is successful
            res.status(200);
            res.json(result);
        } catch (e) {
            res.status(500);
            res.json({
                'error': "We have encountered an interal server error. Please contact admin"
            });
            console.log(e);
        }
    })

    app.get('/sightings', async (req, res) => {

        try {
            let db = MongoUtil.getDB();

            // start with an empty critera object
            let criteria = {};

            // we fill in the critera depending on whether specific
            // query string keys are provided

            // if the `description` key exists in req.query
            if (req.query.description) {
                criteria['description'] = {
                    '$regex': req.query.description,
                    '$options': 'i'
                }
            }

            if (req.query.food) {
                criteria['food'] = {
                    '$in': [req.query.food]
                }
            }

            // console.log(criteria)

            let sightings = await db.collection('sightings').find(criteria).toArray();
            res.status(200);
            res.send(sightings);
        } catch (e) {
            res.status(500);
            res.send({
                'error':"We have encountered an internal server error"
            })         
        }


    })

}

main();

// START SERVER
app.listen(3000, () => {
    console.log("Server started")
})
