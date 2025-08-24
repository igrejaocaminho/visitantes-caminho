'use client';

import { useState } from 'react';
import FormHeader from './form_header';

export default function CadastroForm() {
  const [form, setForm] = useState({
    phone: '',
    first_name: '',
    last_name: '',
    sexo: '',
    idade: '',
    culto_visita: '',
    qtd_visita: ''
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const telefoneValido = (tel: string) => /^\d{8,13}$/.test(tel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.phone.trim() ||
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.sexo ||
      !form.idade ||
      !form.culto_visita ||
      !form.qtd_visita
    ) {
      setMensagem('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    if (!telefoneValido(form.phone)) {
      setMensagem('Telefone inválido. Use apenas números (8 a 13 dígitos).');
      return;
    }

    try {
      const response = await fetch('/api/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar dados');
      }

      setMensagem(`Usuário cadastrado com sucesso!`);

      setForm({
        phone: '',
        first_name: '',
        last_name: '',
        sexo: '',
        idade: '',
        culto_visita: '',
        qtd_visita: '',
      });
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div id="main-form" className="w-full max-w-md">
        <FormHeader />
        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="text" name="first_name" placeholder="Nome" value={form.first_name} onChange={handleChange} className="w-full p-2 border rounded" required/>

          <input type="text" name="last_name" placeholder="Sobrenome" value={form.last_name} onChange={handleChange} className="w-full p-2 border rounded" required/>

          <input type="text" name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" required/>

          {/* Sexo - dropdown */}
          <select
            className={`w-full p-2 border rounded ${form.sexo === '' ? 'color-gray-general' : 'text-white'}`} name="sexo" value={form.sexo} onChange={handleChange} required>
            <option value="" disabled hidden>Selecione o gênero</option>
            <option value="2094452">Homem</option>
            <option value="2094453">Mulher</option>
          </select>

          {/* Idade - dropdown */}
          <select className={`w-full p-2 border rounded ${form.idade === '' ? 'color-gray-general' : 'text-white'}`} name="idade" value={form.idade} onChange={handleChange}required>
            <option value="" disabled hidden>Selecione a idade</option>
            <option value="15283994">0 a 10 anos</option>
            <option value="15283997">11 a 14 anos</option>
            <option value="15283998">15 a 18 anos</option>
            <option value="15283999">18 a 35 anos</option>
            <option value="15285696">36 a 60 anos</option>
            <option value="15285697">61+ anos</option>

          </select>

          {/* Culto visita - dropdown */}
          <select className={`w-full p-2 border rounded ${form.culto_visita === '' ? 'color-gray-general' : 'text-white'}`} name="culto_visita" value={form.culto_visita} onChange={handleChange} required>
            <option value="" disabled hidden>Selecione o culto/visita</option>
            <option value="15283985">Culto de Domingo</option>
            <option value="15283984">Culto de Quinta-Feira</option>
            <option value="1213350">Culto de Sábado</option>
            <option value="15283988">Célula Hefzibá</option>
            <option value="15283990">Célula Peniel</option>
            <option value="15283991">Célula Renovação</option>
            <option value="15283987">Célula Ágape</option>
          </select>

           {/* Culto visita - dropdown */}
          <select className={`w-full p-2 border rounded ${form.qtd_visita === '' ? 'color-gray-general' : 'text-white'}`} name="qtd_visita" value={form.qtd_visita} onChange={handleChange} required>
            <option value="" disabled hidden>Selecione a visita</option>
            <option value="15285745">1 visita</option>
            <option value="15285746">2 visita</option>
            <option value="15285747">3 visita</option>
          </select>

          <button type="submit" className="block mt-[20px] mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition-transform duration-200 ease-in-out">Enviar informações</button>
        </form>

        {mensagem && <p className="mt-4">{mensagem}</p>}
      </div>
    </main>
  );
}
