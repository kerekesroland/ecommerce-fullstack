export const getInvoice = async (chargeId?: string) => {
  try {
    const charge = await fetch(
      `https://api.stripe.com/v1/charges/${chargeId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_stripe_secret_key}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const chargeResponse = await charge.json();

    return chargeResponse.receipt_url;
  } catch (error) {
    console.error(error);
  }
};
