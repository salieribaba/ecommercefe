import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import moment from "moment";

export default function UserOrders() {
  // context
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // get user orders from backend
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");

      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbotron title={`Hoşgeldin ${auth?.user?.name}`} subTitle="Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Siparişler</div>
            {orders?.map((o, i) => {
              return (
                <div
                  key={o._id}
                  className="border shadow bg-light rounded-4 mb-5"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sipariş No</th>
                        <th scope="col">Durumu</th>
                        <th scope="col">Müşteri</th>
                        <th scope="col">Sipariş Tarihi</th>
                        <th scope="col">Tutar</th>
                        <th scope="col">Miktar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?._id}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.total}</td>
                        <td>{o?.products?.length} ürün</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container">
                    <div className="row m-2">
                      {o?.products?.map((p, i) => (
                        <ProductCardHorizontal key={i} p={p} remove={false} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
