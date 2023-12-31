const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4hbo1s9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const usersCollection = client.db('swapnoDB').collection('users');
        const servicesCollection = client.db('swapnoDB').collection('services');
        const employeesCollection = client.db('swapnoDB').collection('employees');
        const garmentsSectorCollection = client.db('swapnoDB').collection('garmentsSector');
        const telecomSectorCollection = client.db('swapnoDB').collection('telecomSector');
        const rhdBangladeshCollection = client.db('swapnoDB').collection('rhdBangladesh');
        const bangladeshRailwayCollection = client.db('swapnoDB').collection('bangladeshRailway');
        const otherProjectsCollection = client.db('swapnoDB').collection('otherProjects');
        const eventsCollection = client.db('swapnoDB').collection('events');
        const messagesCollection = client.db('swapnoDB').collection('messages');

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                res.send({ message: "User already exist" });
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/our-services', async (req, res) => {
            const result = await servicesCollection.find().toArray();
            res.send(result);
        });

        app.get('/our-services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await servicesCollection.findOne(query);
            res.send(result);
        });

        app.get('/employees', async (req, res) => {
            const result = await employeesCollection.find().toArray();
            res.send(result);
        });

        app.post('/employees', async (req, res) => {
            const newEmployee = req.body;
            const result = await employeesCollection.insertOne(newEmployee);
            res.send(result);
        });

        app.put('/employees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updatedEmployee = req.body;
            const updatedDoc = {
                $set: updatedEmployee
            };
            const result = await employeesCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        app.delete('/employees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await employeesCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/garments-sector', async (req, res) => {
            const result = await garmentsSectorCollection.find().toArray();
            res.send(result);
        });

        app.get('/garments-sector/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await garmentsSectorCollection.findOne(query);
            res.send(result);
        });

        app.get('/events', async (req, res) => {
            const result = await eventsCollection.find().toArray();
            res.send(result);
        });

        app.get('/events/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await eventsCollection.findOne(query);
            res.send(result);
        });

        app.get('/messages', async (req, res) => {
            const result = await messagesCollection.find().toArray();
            res.send(result);
        });

        app.post('/messages', async (req, res) => {
            const message = req.body;
            const result = await messagesCollection.insertOne(message);
            res.send(result);
        });

        app.delete('/messages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await messagesCollection.deleteOne(query);
            res.send(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('swapno designer and consultant is running');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});