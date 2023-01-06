export default function CategoryForm({ value, setValue, handleSubmit }) {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control p-3"
          placeholder="Kategori adı giriniz"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary mt-3">Kaydet</button>
      </form>
    </div>
  );
}
