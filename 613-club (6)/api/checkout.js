import Stripe from "stripe";

// Initialize Stripe with the environment variable set on Vercel or locally
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export default async function handler(req, res) {
  // CORS Headers support
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Le panier est vide." });
    }

    // Association dynamique des articles avec les ID de prix Stripe de la marque
    const lineItems = cartItems.map((item) => {
      let priceId = "";
      const lowerName = (item.name || "").toLowerCase().replace(/[\s-_]/g, "");

      // Mapping matching the brand prices:
      // T-shirt: price_1TYvqJB91Q9ZMuPwAZxzvXp6
      // Hoodie: price_1TYvquB91Q9ZMuPwtPvNBqOO
      if (
        lowerName.includes("tshirt") ||
        lowerName.includes("t-shirt") ||
        lowerName.includes("tee")
      ) {
        priceId = "price_1TYvqJB91Q9ZMuPwAZxzvXp6";
      } else {
        priceId = "price_1TYvquB91Q9ZMuPwtPvNBqOO";
      }

      return {
        price: priceId,
        quantity: item.quantity || 1,
      };
    });

    const origin = req.headers.origin || `https://${req.headers.host}`;

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ["CA", "US", "FR", "IL"],
      },
    });

    // Return the secure checkout session URL
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Erreur Stripe Checkout sur Vercel:", err);
    return res.status(500).json({ error: err.message || "Erreur interne de Stripe" });
  }
}
