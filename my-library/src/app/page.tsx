"use client";

import { useState, useEffect } from "react";
import { api } from "./services/api";

interface Livraria {
  id: number;
  titulo: string;
  autor: string;
}

export default function Home() {
  const [ livros, setLivros ] = useState<Livraria[]>([]);
  const [ novosLivros, setNovosLivros ] = useState<Livraria>({ id: 0, titulo: "", autor: "" });

  useEffect(() => {
     loadLivros();
  }, []);

  async function loadLivros() {
    console.log("Carregando livros...");
    try {
      const response = await api.get("/livros");
      console.log(response.data);
      setLivros(response.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddLivros() {
    try {
      const response = await api.post("/livros", novosLivros);
      const responseData = response.data;
      setLivros((prevLivros) => [...prevLivros, responseData]);
      setNovosLivros({ id: 0, titulo: "", autor: "" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center p-6  bg-gradient-to-r from-white to-yellow-100">
      <h1 className=" text-6xl pb-6 font-bold font-mono">Minha Biblioteca</h1>
      <div className="flex gap-4 pt-6 pb-6">
        <button className="border bg-gradient-to-r from-green-400  to-blue-500 hover:from-pink-500 hover:to-yellow-500  transition-colors rounded-2xl px-4 py-2 text-white font-medium font-mono" onClick={loadLivros}>
          Carregar Livros
        </button>
        <button
          className="border bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  transition-colors rounded-2xl text-white font-medium font-mono px-4 py-2"
          onClick={handleAddLivros}
        >
          Adicionar Livros
        </button>
      </div>

      <div>
        <input
          className="border border-black rounded-s-2xl p-2 font-mono"
          type="text"
          value={novosLivros.titulo}
          onChange={(e) => setNovosLivros({ ...novosLivros, titulo: e.target.value })}
          placeholder="Título do livro"
        />
        <input
          className="border border-black rounded-e-2xl p-2 font-mono"
          type="text"
          value={novosLivros.autor}
          onChange={(e) => setNovosLivros({ ...novosLivros, autor: e.target.value })}
          placeholder="Autor do livro"
        />
      </div>
      <ul className="pt-4 text-xl">
        {livros && livros.map((item) => (
          <li className="font-mono" key={item.id}><strong>{item.titulo}</strong> - {item.autor}</li>
        ))}
      </ul>
    </main>
  );
}
