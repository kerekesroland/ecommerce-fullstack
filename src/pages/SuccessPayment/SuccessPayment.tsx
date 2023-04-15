import { useState, useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { validateSession } from "../../stripe/validateCheckoutSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { emptyCart } from "../../store/slices/cartSlice";

const SuccessPayment = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const validateCheckout = async () => {
      setLoading(true);
      if (sessionId) {
        const { validated, data } = await validateSession(sessionId);
        if (validated === true) {
          setValidated(true);
          if (data.payment_status === "paid") {
            dispatch(emptyCart());
          }
        } else {
          setValidated(false);
          navigate("/");
        }
      }
      setLoading(false);
    };
    validateCheckout();
  }, [sessionId, navigate, dispatch]);

  return <div>{validated ? "SuccessPayment" : "Loading..."}</div>;
};

export default SuccessPayment;
