import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" kategorisi oluşturuldu.`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Kategori oluşturulamadı.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setVisible(false);
        toast.success(`"${data.name}" kategorisi güncellendi.`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Kategori güncellenemedi.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" kategorisi silindi.`);
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Kategori silinemedi.");
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hoşgeldin ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Kategori Yönetimi</div>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />
            <div className="col">
              {categories?.map((c) => (
                <button
                  key={c.id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <Modal
              title="Kategori Güncelle"
              visible={visible}
              onOk={() => {
                setVisible(false);
              }}
              onCancel={() => {
                setVisible(false);
              }}
              footer={null}
            >
              <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                buttonText="Güncelle"
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
