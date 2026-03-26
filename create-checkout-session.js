import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: "Support PIALAW" },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://your-site.vercel.app",
    cancel_url: "https://your-site.vercel.app",
  });

  res.json({ url: session.url });
}