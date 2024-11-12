import './style.css';
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] =useState('');

  async function handleSearch() {
   if (input === ''){
    alert("Preencha com um CEP!")
    return
   }

   try {
    const response = await api.get(`${input}/json`) 
    setCep(response.data)
    console.log(response.data)
    setInput("")

   } catch{

    alert("Erro ao buscar CEP!")
    setInput("")
   }

  }

  return (
    <div id="container">
    <h1 id="title">Buscador de CEP</h1>

    <div className="form-floating mb-3">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={input} onChange={(event)=>setInput(event.target.value)}></input>
      <label>Insira o CEP</label>
    </div>

    <button type="button" className="btn btn-dark" onClick={handleSearch}>Buscar</button>
    
    <main id="modal">
      <h2>CEP: {cep.cep}</h2>
      <span>{cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
    </main>
    </div>
  );
}

export default App;
