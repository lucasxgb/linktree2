import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConection";
import { doc, setDoc, getDoc } from "firebase/firestore";

export function Networks() {
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");

  function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (github === "" || linkedin === "" || instagram === "") {
      alert("Preencha todos os campos!");
      return;
    }

    // Cadastro ou update único, se houver ele atualiza o que mudou, se não houver ele apenas cadastra um novo
    setDoc(doc(db, "social", "linkSocial"), {
      linkedin: linkedin,
      instagram: instagram,
      github: github,
    })
      .then(() => {
        console.log("Cadastrado com sucesso!");
        setLinkedin("");
        setInstagram("");
        setGithub("");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
  }

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "linkSocial");
      getDoc(docRef)
        .then((doc) => {
          if (doc.data() !== undefined) {
            setLinkedin(doc.data()?.linkedin);
            setInstagram(doc.data()?.instagram);
            setGithub(doc.data()?.github);
          }
        })
        .catch(() => {
          console.log("Ocorreu um erro ao carregar os dados do banco");
        });
    }

    loadLinks();
  }, []);

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-neutral-900 text-2xl font-medium mt-9 mb-4">
        {" "}
        Minhas redes sociais:{" "}
      </h1>

      <form
        onSubmit={handleRegister}
        className="flex flex-col max-w-xl w-full"
        action=""
      >
        <label className="text-neutral-900 font-medium mt-2 mb-2 " htmlFor="">
          {" "}
          Link do linkedin{" "}
        </label>
        <Input
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          type="url"
          placeholder="Digite a url do linkedin"
        />

        <label className="text-neutral-900 font-medium mt-2 mb-2 " htmlFor="">
          {" "}
          Link do Instagram{" "}
        </label>
        <Input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          type="url"
          placeholder="Digite a url do instagram"
        />

        <label className="text-neutral-900 font-medium mt-2 mb-2 " htmlFor="">
          {" "}
          Link do Github{" "}
        </label>
        <Input
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          type="url"
          placeholder="Digite a url do github"
        />

        <button
          type="submit"
          className="bg-[#770000] text-neutral-100 h-9 rounded-md font-medium flex gap-4 justify-center items-center mb-7 mt-2 "
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
