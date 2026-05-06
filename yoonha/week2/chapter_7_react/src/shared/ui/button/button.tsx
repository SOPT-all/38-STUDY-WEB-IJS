interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({
  text,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="w-full mt-5 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 active:bg-sky-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
