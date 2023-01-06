import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";

export default function Login() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Giriş Başarılı");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Giriş Yapılamadı.");
    }
  };

  return (
    <div>
      <Jumbotron title="Lütfen Giriş Yapınız!" subTitle="" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="E-Posta Adresinizi Giriniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Şifrenizi Giriniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
