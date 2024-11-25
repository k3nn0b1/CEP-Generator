//EXEMPLO DE COMPONENTE DO MODAL GENERICO
const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
      <div id="modal">
          {/* nessa div você pode colocar estilos pra borrar o fundo o modal e pra ocupar 100% da tala */}
          {children}
      </div>
  );
};

export default Modal;
