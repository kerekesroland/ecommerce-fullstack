import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateSession } from "../../stripe/validateCheckoutSession";

const SuccessPayment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateCheckout = async () => {
      setLoading(true);
      if (sessionId) {
        const res = await validateSession(sessionId);
        if (res === true) {
          setValidated(true);
        } else {
          navigate("/");
        }
      }
      setLoading(false);
    };
    validateCheckout();
  }, [sessionId, navigate]);

  return <div>{validated ? "SuccessPayment" : "Loading..."}</div>;
};

export default SuccessPayment;
