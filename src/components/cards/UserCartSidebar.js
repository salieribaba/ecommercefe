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
  // hooks
  const navigate = useNavigate();

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

  const handleBuy = async (e) => {
    //cart içeriğini order tablosuna kaydet, cart içeriğini temizle
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/order`,
        {
          cart,
          total: parseFloat(cartTotal().replace("₺", "")),
        },
        {
          headers: {
            authtoken: auth.token,
          },
        }
      );
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Siparişiniz alındı. Teşekkürler!");
      navigate("/dashboard/user/orders");
    } catch (err) {
      toast.error("Siparişiniz alınamadı. Lütfen tekrar deneyiniz.");
    }
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
          onClick={handleBuy}
        >
          Sipariş Oluştur
        </button>
      </div>
    </div>
  );
}
