import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function AdminRoute() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(`/admin-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) adminCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading path="" />;
}
