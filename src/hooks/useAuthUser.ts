import { User } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { auth } from "../firebase/config";

const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
    return unsubscribe;
  }, []);

  const memoizedUser = useMemo(() => user, [user]);

  return memoizedUser;
};

export default useAuthUser;
