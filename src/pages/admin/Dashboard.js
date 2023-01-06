import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminDashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Jumbotron
        title={`Hoşgeldin ${auth.user.name}`}
        subTitle="Yönetici Kontrol Sayfası"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Yönetici Bilgisi</div>

            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
              <li className="list-group-item">Yönetici</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
