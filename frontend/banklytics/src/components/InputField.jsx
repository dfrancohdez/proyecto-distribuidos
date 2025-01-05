function InputField({ label, type, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block border-gray-500 text-gray-500 text-sm mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value} // Acepta el valor
        onChange={onChange} // Maneja el cambio
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-500"
      />
    </div>
  );
}

export default InputField;
