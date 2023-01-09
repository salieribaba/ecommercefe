import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function AdminProduct() {
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
  // hook
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      const { data } = await axios.post("/product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" ürünü oluşturuldu.`);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Ürün oluşturulamadı.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Ürün Kaydet</div>

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

            <select
              className="form-select mb-3"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="">Ürün Kargo Durumunu Seçiniz</option>
              <option value="1">Var</option>
              <option value="0">Yok</option>
            </select>

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Kategori seçiniz"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={photo.name}
                  className="img img-responsive"
                  style={{ maxHeight: "125px", maxWidth: "200px" }}
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

              <button onClick={handleSubmit} className="btn btn-primary col-12">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
