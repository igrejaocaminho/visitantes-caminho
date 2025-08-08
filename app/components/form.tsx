'use client';

import { useState } from 'react';
import FormHeader from './form_header';

export default function CadastroForm() {
  const [form, setForm] = useState({
    phone: '',
    first_name: '',
    last_name: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const telefoneValido = (tel: string) => {
    // Só números e tamanho entre 8 e 13 dígitos (ajuste conforme necessidade)
    const regex = /^\d{8,13}$/;
    return regex.test(tel);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples: verifica se algum campo está vazio
    if (!form.phone.trim() || !form.first_name.trim() || !form.last_name.trim()) {
      setMensagem('Por favor, preencha todos os campos antes de enviar.');
      return; // bloqueia o envio
    }

    if (!telefoneValido(form.phone)) {
      setMensagem('Telefone inválido. Use apenas números (8 a 13 dígitos).');
      return;
    }

    try {
      const response = await fetch('/api/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar dados');
      }

      setMensagem('Cadastro enviado com sucesso!');
      setForm({ phone: '', first_name: '', last_name: '' });
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div id="main-form" className="w-full max-w-md">
        <FormHeader />
        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="text" name="first_name" placeholder="Nome" value={form.first_name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="last_name" placeholder="Sobrenome" value={form.last_name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" required />

          <button type="submit" className="block mt-[20px] mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition-transform duration-200 ease-in-out">Enviar informações</button>
        </form>

        {mensagem && <p className="mt-4">{mensagem}</p>}
      </div>
    </main>
  );
}
