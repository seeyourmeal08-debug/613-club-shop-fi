import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is required. Please define it in your AI Studio secrets environment.");
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API Checkout endpoint
  app.post("/api/checkout", async (req, res) => {
    try {
      const { cartItems } = req.body;
      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: "Le panier est vide." });
      }

      // Check key before actual initialization to avoid crashing Express
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({
          error: "STRIPE_SECRET_KEY n'est pas configuré. Veuillez l'ajouter dans les paramètres secrets d'AI Studio ou votre fichier .env."
        });
      }

      const stripe = getStripe();

      const lineItems = cartItems.map((item: any) => {
        let priceId = "";
        const lowerName = (item.name || "").toLowerCase().replace(/[\s-_]/g, "");
        
        // Map to prices provided by user:
        // T-shirt Price ID: price_1TYvqJB91Q9ZMuPwAZxzvXp6
        // Hoodie Price ID: price_1TYvquB91Q9ZMuPwtPvNBqOO
        if (
          lowerName.includes("tshirt") || 
          lowerName.includes("t-shirt") || 
          lowerName.includes("tee")
        ) {
          priceId = "price_1TYvqJB91Q9ZMuPwAZxzvXp6";
        } else if (
          lowerName.includes("hoodie") || 
          lowerName.includes("hood")
        ) {
          priceId = "price_1TYvquB91Q9ZMuPwtPvNBqOO";
        } else {
          // Default fallback to hoodie
          priceId = "price_1TYvquB91Q9ZMuPwtPvNBqOO";
        }

        return {
          price: priceId,
          quantity: item.quantity || 1,
        };
      });

      const origin = req.headers.origin || `http://localhost:${PORT}`;

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

      res.json({ url: session.url });
    } catch (err: any) {
      console.error("Erreur de création de session Stripe:", err);
      res.status(500).json({ error: err.message || "Erreur interne du serveur lors de l'initialisation du paiement." });
    }
  });

  // Vite middleware setup based on NODE_ENV
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
