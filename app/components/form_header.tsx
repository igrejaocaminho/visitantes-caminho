'use client';

import Image from "next/image";

export default function FormHeader() {

  return (
    <>
      <Image src="/images/o_caminho_logo.png" alt="Logo" width={100} height={100} className="mx-auto w-24 h-auto" />
      <h1 className="o_caminho_titulo">O CAMINHO</h1>
      <h1 className="text-2xl font-bold mb-4 titulo">Cadastro de visitantes</h1>
      <p>Insira os dados abaixo para concluir o cadastro do visitante.</p>
    </>
  );
}
