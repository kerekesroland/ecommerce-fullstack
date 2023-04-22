import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return user;
};

export default useAuthUser;
