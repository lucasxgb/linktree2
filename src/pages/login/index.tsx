import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { useState } from "react";
import { auth } from "../../services/firebaseConection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === "" || password === "") alert("Preencha todos os campos!");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
        console.log("Logado com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao fazer login");
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Link to="/">
        {" "}
        <h1 className="mt-11 text-neutral-900 mb-7 text-5xl">
          {" "}
          Lucas
          <span className="font-bold bg-linear-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            Link
          </span>{" "}
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2 gap-3"
        action=""
      >
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9  bg-red-800 rounded border-0 text-lg font-medium text-neutral-100"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
