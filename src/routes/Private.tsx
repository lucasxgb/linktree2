import { auth } from "../services/firebaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        setSigned(false);
        return;
      }
      const userData = {
        uid: user?.uid,
        email: user?.email,
      };
      localStorage.setItem("@detailUser", JSON.stringify(userData));
      setLoading(false);
      setSigned(true);
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
