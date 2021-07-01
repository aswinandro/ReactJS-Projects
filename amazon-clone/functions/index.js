const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe") ('sk_test_51J76HlSBuTZk2PfyEtc9b0o1MjScfVKt2fH96lsWpWqNu3zQDfF26p4yKCwdTZpNtImY7y8gAEk1VFRM0YCZX59b00NGXaqkCQ')

// API

// -App config
const app = express();
// -Middlewares
app.use(cors ({ orgin: true}));
app.use(express.json());

// - API routes
app.get('/', (request,response) => response.status(200).send
('hello world'))

app.post('/payments/create', async (request, response) => {
        const total = request.query.total;
        console.log('Payment Request Received --- for this amount', total)

        const paymentIntent = await stripe.paymentIntents.create( {
            amount: total,
            currency: "usd",
        });

        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        })
} )

// - Listen Command
exports.api = functions.https.onRequest(app)


// Example Endpoint

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
