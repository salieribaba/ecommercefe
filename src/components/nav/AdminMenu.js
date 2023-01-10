import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">Yönetici İşlemleri</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
            Kategoriler
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/product">
            Ürün Ekle
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/products">
            Ürün Listesi
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/orders">
            Sipariş Yönetimi
          </NavLink>
        </li>
      </ul>
    </>
  );
}
