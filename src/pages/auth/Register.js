import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Kayıt Başarılı!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Kayıt Yapılamadı.");
    }
  };

  return (
    <div>
      <Jumbotron title="Alışveriş Yapabilmek İçin Lütfen Kayıt Olunuz!" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Adınızı Giriniz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

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
                Kayıt Ol
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
