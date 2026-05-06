import { useState } from "react";

interface InputFieldProps {
  label: string;
  placeHolder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  secret?: boolean;
}

const InputField = ({
  label,
  placeHolder,
  value,
  onChange,
  secret = false,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = secret ? (showPassword ? "text" : "password") : "text";

  return (
    <label className="w-full ">
      {label && <p>{label}</p>}

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          className={`w-full py-3 px-3 my-3 border border-gray-400 rounded-lg focus:outline-none focus:border-sky-500 placeholder:text-gray-500 ${
            secret ? "pr-12" : ""
          }`}
        />

        {secret && (
          <button
            type="button"
            onClick={handleToggleShow}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? "🫣" : "😳"}
          </button>
        )}
      </div>
    </label>
  );
};

export default InputField;
