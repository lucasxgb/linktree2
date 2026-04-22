import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlLink, setLinkInput] = useState("");
  const [textColor, setColorInput] = useState("#f5f5f5");
  const [bgColorInput, setBgColorInput] = useState("#1c1c1c");
  const [links, setLinks] = useState<LinksProps[]>([]);
  const hasItem = links.length > 0 || links;

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    // callback em tempo real do banco de dados, observa cada atualização no banco
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let list = [] as LinksProps[];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(list);
    });

    // Cancelando a observação ao banco (removendo o observer do banco quando sair desse componente)
    return () => {
      unsub();
    };
  }, []);

  async function handleDelete(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameInput === "" || urlLink === "") {
      alert("Preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlLink,
      bg: bgColorInput,
      color: textColor,
      created: new Date(),
    })
      .then(() => {
        console.log("Cadastrado com sucesso!");
        setNameInput("");
        setLinkInput("");
        setBgColorInput("#1c1c1c");
        setColorInput("#f5f5f5");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h:screen pb-7.5 px-2">
      <Header />

      <form
        onSubmit={(e) => handleRegister(e)}
        className="flex flex-col mt-3 mb-3 w-full max-w-xl"
        action=""
      >
        <label htmlFor="" className="text-neutral-900 font-medium mt-2 mb-2">
          {" "}
          Nome do link:{" "}
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label htmlFor="" className="text-neutral-900 font-medium mt-2 mb-2">
          {" "}
          Url do link:{" "}
        </label>
        <Input
          placeholder="Digite a url..."
          value={urlLink}
          onChange={(e) => setLinkInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2 items-center">
            <label
              htmlFor=""
              className="text-neutral-900 font-medium mt-2 mb-2"
            >
              {" "}
              Fundo do link:{" "}
            </label>
            <input
              type="color"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor=""
              className="text-neutral-900 font-medium mt-2 mb-2"
            >
              {" "}
              Cor do link:{" "}
            </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center flex-col border rounded border-neutral-900/20 w-full max-w-xl text-center mb-7 px-4 py-3 ">
            <label
              htmlFor=""
              className="text-neutral-900 font-medium mt-2 mb-2"
            >
              {" "}
              Está ficando assim:{" "}
            </label>
            <section
              className={`mb-4 w-full py-4 rounded-lg select-none`}
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: bgColorInput,
              }}
            >
              <a href="">
                <p
                  className="text-base md:text-lg"
                  style={{ color: textColor }}
                >
                  {" "}
                  {nameInput}{" "}
                </p>
              </a>
            </section>
          </div>
        )}

        <button
          type="submit"
          className="bg-[#770000] text-neutral-100 h-9 rounded-md font-medium flex gap-4 justify-center items-center mb-4 "
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-neutral-900 mb-4 text-2xl">Meus links:</h2>

      {hasItem &&
        links.map((link) => (
          <article
            key={link.id}
            className="flex items-center justify-between w-11/12 max-w-xl py-3 px-2 mb-2 rounded-lg select-none"
            style={{ backgroundColor: link.bg, color: link.color }}
          >
            <p>{link.name} </p>
            <div>
              <button
                onClick={() => handleDelete(link.id)}
                className="cursor-pointer"
              >
                <FiTrash />
              </button>
            </div>
          </article>
        ))}
    </div>
  );
}
