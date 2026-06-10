import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Le panier est vide." });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        error: "STRIPE_SECRET_KEY n'est pas configuré sur Vercel.",
      });
    }

    const lineItems = cartItems.map((item: any) => {
      let priceId = "";
      const lowerName = (item.name || "").toLowerCase().replace(/[\s\-_]/g, "");

      if (
        lowerName.includes("tshirt") ||
        lowerName.includes("t-shirt") ||
        lowerName.includes("tee")
      ) {
        priceId = "price_1TYvqJB91Q9ZMuPwAZxzvXp6";
      } else if (lowerName.includes("hoodie") || lowerName.includes("hood")) {
        priceId = "price_1TYvquB91Q9ZMuPwtPvNBqOO";
      } else {
        priceId = "price_1TYvquB91Q9ZMuPwtPvNBqOO";
      }

      return {
        price: priceId,
        quantity: item.quantity || 1,
      };
    });

    const origin = req.headers.origin || "https://www.613club.shop";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ["CA", "US", "FR", "IL"],
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur Stripe:", err);
    return res.status(500).json({
      error: err.message || "Erreur interne du serveur.",
    });
  }
}
