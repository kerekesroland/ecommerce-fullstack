export const validateSession = async (session_id: string) => {
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_stripe_secret_key}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
