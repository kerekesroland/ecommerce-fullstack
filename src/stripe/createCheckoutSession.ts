import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { initializeStripe } from "./initializeStripe";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { ICartItem } from "../models/ICartItem";
import { CheckoutProps } from "../pages/Checkout/Checkout";

//--------------------------Subscriptions Start-----------------------------------------------

export const createPremiumBronzeSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_bronze_key,
      success_url: "http://localhost:3000/profile",
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      const res = await stripe.redirectToCheckout({ sessionId });
      if (res.error) {
        toast.error("Error during payment", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
        });
      } else {
        toast.success("Successful subscription!", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
        });
      }
    }
  });
};

export const createPremiumSilverSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_silver_key,
      success_url: "http://localhost:3000/profile",
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};
export const createPremiumGoldSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_gold_key,
      success_url: "http://localhost:3000/profile",
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};

//--------------------------Subscriptions End-----------------------------------------------

//--------------------------Payment Start-----------------------------------------------

export const handlePaymentWithCreditCard = async (
  uid: string,
  items: ICartItem[],
  shipping: number,
  dataWithPayment: CheckoutProps
) => {
  const formattedItems = items.map((item: ICartItem) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
        tax_behavior: "exclusive",
      },
      quantity: item.quantity || 1,
    };
  });

  // Modify it to add shipping costs
  formattedItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Shipping",
      },
      unit_amount: shipping * 100,
      tax_behavior: "exclusive",
    },
    quantity: 1,
  });

  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      line_items: formattedItems,

      success_url:
        "http://localhost:3000/success/?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout",
      mode: "payment",
      receipt_email: dataWithPayment.email,
      metadata: {
        userId: uid,
        name: dataWithPayment.name,
        email: dataWithPayment.email,
        mobile: dataWithPayment.mobile,
        city: dataWithPayment.city,
        state: dataWithPayment.state,
        zip: dataWithPayment.zip,
        address: dataWithPayment.address,
      },
    }
  );

  const waitForSuccessUrlUpdate = async () => {
    return new Promise<string>((resolve) => {
      onSnapshot(checkoutSessionRef, async (snap: any) => {
        const { sessionId } = snap.data() || {};
        if (sessionId) {
          resolve(sessionId);
        }
      });
    });
  };

  const sessionId = await waitForSuccessUrlUpdate();
  const stripe = await initializeStripe();
  if (stripe && sessionId) {
    await stripe.redirectToCheckout({ sessionId });
  }
};

//--------------------------Payment End-----------------------------------------------
