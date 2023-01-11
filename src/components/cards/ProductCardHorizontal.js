import React, { useState } from "react";
import { useCart } from "../../context/cart";

export default function ProductCardHorizontal({ p, remove = true }) {
  // context
  const [cart, setCart] = useCart();

  const [orderQuantity, setOrderQuantity] = useState(1);

  const removeFromCart = (p) => {
    let answer = window.confirm(`${p.name} Sepetten çıkarılsın mı?`);
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === p._id);
    if (answer) {
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
  };

  return (
    <div
      className="card mb-3"
      // style={{ maxWidth: 540 }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{
              height: "150px",
              width: "150px",
              objectFit: "cover",
              marginLeft: "-12px",
              borderTopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{`${p?.description?.substring(
              0,
              50
            )}..`}</p>
            <h4 className="card-title fw-bold">
              {p?.price?.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </h4>
            {/* <h4>Sipariş Miktarı : {orderQuantity} </h4> */}
          </div>
        </div>
        {remove && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-outline-danger mb-2"
              onClick={() => removeFromCart(p)}
            >
              Sepetten Çıkar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
