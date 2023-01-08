import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import ProductCard from "../components/cards/ProductCard";
import {
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaDollarSign,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";

export default function ProductView() {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (error) {}
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.sold} satılan`} color="red">
              <Badge.Ribbon
                text={`${
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} stok miktarı.`
                    : "Stokta yok."
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "650px", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>
              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign />
                  Fiyat :
                  {product?.price?.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
                <p>
                  <FaProjectDiagram />
                  Kategori : {product?.category?.name}
                </p>

                <p>
                  <FaCheck />
                  Ürünün Durumu :{" "}
                  {product?.quantity >= 1 ? "Stokta Var" : "Stokta Yok"}
                </p>
                <p>
                  <FaWarehouse />
                  Stok Miktarı : {product?.quantity - product?.sold}
                </p>
                <p>
                  <FaRegClock />
                  Eklendiği Tarih :{" "}
                  {new Date(product?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <h2>Benzer Ürünler</h2>
          <hr />
          {related.length < 1 && <p>Benzer ürün bulunamadı</p>}
          {related.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
