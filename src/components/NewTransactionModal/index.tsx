import { useState, FormEvent } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../contexts/TransactionsContext";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

   await createTransaction({title,type , category, amount: value});

   setTitle("");
   setValue(0);
   setCategory("");
   setType("deposit");
   onRequestClose();
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button type="button" onClick={onRequestClose} className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>

          <h2>Cadastrasr transação</h2>

          <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="number" placeholder="Valor" value={value} onChange={(e) => setValue(Number(e.target.value))} />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              className="income"
              onClick={() => setType("deposit")}
              isActive={type === "deposit"}
              isActiveColor="greenLight"
              isActiveBorderColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            {/* background: ${(props) => props.isActive ? transparentize(0.9., background[props.isActiveColor])
    : "transparent"}; */ }
            <RadioBox
              type="button"
              className="outcome"
              onClick={() => setType("withdraw")}
              isActive={type === "withdraw"}
              isActiveColor="redLight"
              isActiveBorderColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>

          </TransactionTypeContainer>

          <input placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />

          <button
            type="submit">
            Cadastrar
          </button>

        </Container>
      </Modal>
    </>

  )
}