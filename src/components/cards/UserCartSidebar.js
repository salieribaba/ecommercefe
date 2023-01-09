import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserCartSidebar() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  };

  return (
    <div className="col-md-4">
      <h4>Sepet Özeti</h4>
      Toplam / Adres / Ödeme Şekli
      <hr />
      <h4>Toplam: {cartTotal()}</h4>
      <hr />
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h4>Adres:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Adresi Güncelle
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Adres Ekle
            </button>
          ) : (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Giriş Yapınız
            </button>
          )}
        </div>
      )}
      <hr />
      <div className="mb-3">
        <h4>Ödeme Şekli</h4>
        <p>
          Sayın Müşterilerimiz; Sistemimiz şu an için yalnızca, Banka Havalesi
          veya EFT işlemiyle ödeme kabul etmektedir.
        </p>
        <p>
          Banka hesap bilgilerimiz, Üst menü de İletişim sekmesinde
          bulunmaktadır.
        </p>
        <p>
          "Sipariş Oluştur" butonuna bastıktan sonra sipariş numaranız
          oluşturulacaktır. Bu numarayı lütfen gönderdiğiniz ödeme formunun
          açıklama kısmına yazınız.
        </p>
      </div>
      <hr />
      <div className="mb-3">
        <button
          className="btn btn-outline-success"
          disabled={!auth?.user?.address || !cart?.length || !auth?.token}
          onClick={() => navigate("/checkout")}
        >
          Sipariş Oluştur
        </button>
      </div>
    </div>
  );
}
