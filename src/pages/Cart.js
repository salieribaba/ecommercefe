import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";
import UserCartSidebar from "../components/cards/UserCartSidebar";

export default function Cart() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={
          auth.user
            ? `${auth.user.name}' in sepeti`
            : "Hoşgeldiniz! Lütfen oturum açınız!"
        }
        subTitle={
          cart.length > 1
            ? `Sepetinizde ${cart.length} ürün var`
            : "Sepetiniz henüz boş!"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light">
              <div className="text-center">
                {cart?.length ? (
                  "Sepetim"
                ) : (
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/")}
                    >
                      Alışverişe Başla
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {cart?.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart.map((p, index) => (
                  <ProductCardHorizontal key={index} p={p} />
                ))}
              </div>
            </div>

            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
}
