import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function AdminProductUpdate() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  // hook
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category._id);
      setShipping(data.shipping);
      setQuantity(data.quantity);
      setId(data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      const { data } = await axios.put(`/product/${id}`, productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" ürün güncellendi`);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Ürün güncelenirken bir hata oluştu.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Ürünü silmek istediğinize emin misiniz?");
      if (!answer) return;

      const { data } = await axios.delete(`/product/${id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" ürünü silindi`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ürün silinirken bir hata oluştu.");
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hoşgeldin ${auth?.user?.name}`}
        subTitle="Yönetici Paneli"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Ürün Güncelle</div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Ürün Adını giriniz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Ürün Açıklaması"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Ürün Fiyatını giriniz"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Ürün Stok Miktarını giriniz"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Kargo durumunu seçiniz"
              onChange={(value) => setShipping(value)}
              value={shipping ? "Var" : "Yok"}
            >
              <Option value="0">Yok</Option>
              <Option value="1">Var</Option>
            </Select>
            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Kategori seçiniz"
              onChange={(value) => setCategory(value)}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={photo.name}
                  className="img img-responsive"
                  style={{ maxHeight: "125px", maxWidth: "200px" }}
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${
                    process.env.REACT_APP_API
                  }/product/photo/${id}?${new Date().getTime()}`}
                  alt={photo?.name}
                  className="img img-responsive"
                  style={{ maxHeight: "125px", maxWidth: "300px" }}
                />
              </div>
            )}
            <div className="pt-2">
              <label className="btn btn-outline-secondary p-2 col-12 mb-3">
                {photo ? photo.name : "Fotoğraf Seçiniz"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>

              <div className="d-flex justify-content-between">
                <button onClick={handleSubmit} className="btn btn-primary mb-5">
                  Güncelle
                </button>
                <button onClick={handleDelete} className="btn btn-danger mb-5">
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
