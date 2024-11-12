import "./style.css";
import { useState } from "react";
import api from "./services/api";
import Modal from "./components/Modal";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function handleSearch() {
    if (input === "") {
      alert("Preencha com um CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      setInput("");
      alert("Erro ao buscar CEP!");
    }
  }

  function clickBuscar() {
    if (input !== "") {
      handleSearch();
      setIsOpen(true);
      return;
    }
    if (input === "") {
      alert("Preencha com um CEP!");
      setInput("");
      return;
    } else {
      setIsOpen(false);
    }
  }

  return (
    <div id="container">
      <h1 id="title">Buscador de CEP</h1>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <label>Insira o CEP</label>
      </div>

      <button type="button" className="btn btn-dark" onClick={clickBuscar}>
        Buscar
      </button>

      <Modal isOpen={isOpen}>
        <div id="modalContainer">
          <div id="modalContent">
          <button onClick={() => setIsOpen(false)}>Fechar modal</button>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              {cep.localidade} - {cep.uf}
            </span>
            
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
