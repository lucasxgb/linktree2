import { Link } from "react-router-dom";
import { Input } from "../../components/input";

export function Login() {
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

      <form className="w-full max-w-xl flex flex-col px-2 gap-3" action="">
        <Input />

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
