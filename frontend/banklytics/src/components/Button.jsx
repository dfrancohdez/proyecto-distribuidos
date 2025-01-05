import "../styles/Colors.css";

function Button({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-24 bgPurpple text-white py-2 rounded-full border-2 borderPurpple hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
