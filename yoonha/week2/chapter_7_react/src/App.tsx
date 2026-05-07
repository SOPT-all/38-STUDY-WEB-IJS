import { useState } from "react";
import "./App.css";
import Character from "./shared/ui/character/character";
import InputField from "./shared/ui/input-field/input-field";
import Button from "./shared/ui/button/button";

function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = id.trim().length > 0 && password.trim().length > 0;

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center">
      <form className="mx-auto w-full max-w-lg">
        <Character />

        <h1 className="text-2xl font-bold mb-6 text-center">SOPT MEMBERS</h1>

        <InputField
          label="아이디"
          placeHolder="아이디를 입력해주세요"
          value={id}
          onChange={handleIdChange}
        />

        <InputField
          label="비밀번호"
          placeHolder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
          secret
        />

        <Button
          text="로그인"
          type="submit"
          disabled={!isFormValid}
          onClick={() => {}}
        />
      </form>
    </div>
  );
}

export default App;
