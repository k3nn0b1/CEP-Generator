import "./style.css";
import { useState } from "react";
import api from "./services/api";
import Modal from "./components/Modal/Modal";
import Header from "./components/Header/Header";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function isInputValid(input) {
    return input !== "" && !isNaN(input);
  }

  async function handleSearch() {
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
    const isValid = isInputValid(input);
    if (!isValid) {
      alert("Preencha com um CEP válido!");
      return;
    }

    handleSearch();
    setIsOpen(true); 
  }

  return (
    <div id="container">
      <Header/>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Digite o CEP"
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
            <div id="closeModal">
            <p id="close" onClick={() => setIsOpen(false)}>X</p>
            </div>
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
