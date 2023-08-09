import dotenv from "dotenv";
import Stripe from "stripe";
import express from 'express';
import cors from 'cors';
dotenv.config();
const STRIPE_KEY = process.env.STRIPE_KEY;
const FRONT_PAY_FAILED_URL = 'https://flipkaart.vercel.app/failed';
const FRONT_PAY_SUCCESS_URL = 'https://flipkaart.vercel.app/success';
const stripe = Stripe(STRIPE_KEY);
const app = express();
app.use(cors());
app.use(express.json());

export const checkout = async (req, res) => {
    const cartItems =req.body.cartItems; // Assuming the frontend sends an array of items
    const user = req.body.user; //    // console.log("🚀 ~ file: stripe.js:15 ~ checkout ~ user:", userName)
    if (!user || !user.email || !user.firstname) {
        return res.status(400).json({ error: "Invalid user data" });
    }
    const lineItems = cartItems.map((item) => {
        if (!item.title || !item.title.shortTitle || !item.url || !item.price || !item.price.cost || !item.quantity) {
            return null; // Skip invalid item data
        }

        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title.shortTitle,
                    images: [item.url],
                },
                unit_amount: item.price.cost * 100,
            },
            quantity: item.quantity,
        };
    }).filter(Boolean); // Remove any null items caused by invalid data

    // Add the delivery charge as a new line item representing the delivery charge
    lineItems.push({
        price_data: {
            currency: "inr",
            product_data: {
                name: "Delivery Charge",
            },
            unit_amount: 4000,
        },
        quantity: 1,
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: FRONT_PAY_SUCCESS_URL,
            cancel_url: FRONT_PAY_FAILED_URL,
            customer_email: user.email, // Add the customer's email to the session data
            client_reference_id: user.firstname, // Add the customer's name to the session data
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'IN', 'AU'], // Specify the allowed shipping countries
            },
            
        });
        

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};
