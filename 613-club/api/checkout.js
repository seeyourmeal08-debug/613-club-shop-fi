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

    // Association dynamique avec inclusion de la taille choisie par le client
    const lineItems = cartItems.map((item) => {
      const lowerName = (item.name || "").toLowerCase().replace(/[\s-_]/g, "");
      let finalName = item.name || "Article 613 Club";
      let amountInCents = 4500; // Prix par défaut T-shirt (45.00 CA$)

      if (
        lowerName.includes("tshirt") ||
        lowerName.includes("t-shirt") ||
        lowerName.includes("tee")
      ) {
        amountInCents = 4500; // 45.00 CA$
      } else {
        amountInCents = 8000; // 80.00 CA$ (Hoodie)
      }

      // Si une taille existe (ex: S, M, L, XL), on l'ajoute directement au nom visible sur Stripe
      if (item.size) {
        finalName = `${finalName} - Taille ${item.size.toUpperCase()}`;
      }

      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: finalName,
          },
          unit_amount: amountInCents,
        },
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
      // ✅ Tes options de livraison et pickup Stripe sont maintenant actives ici :
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "cad",
            },
            display_name: "Pickup chez Massalia Pizza",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1495,
              currency: "cad",
            },
            display_name: "Montréal",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 3,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 3495,
              currency: "cad",
            },
            display_name: "États-Unis",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 3695,
              currency: "cad",
            },
            display_name: "Canada",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 5995,
              currency: "cad",
            },
            display_name: "International",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 15,
              },
            },
          },
        },
      ],
    });

    // Return the secure checkout session URL
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Erreur Stripe Checkout sur Vercel:", err);
    return res.status(500).json({ error: err.message || "Erreur interne de Stripe" });
  }
}