import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">Kullanıcı İşlemleri</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/user/profile">
            Profil
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/user/orders">
            Siparişler
          </NavLink>
        </li>
      </ul>
    </>
  );
}
