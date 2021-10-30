import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";
import { useTransactions } from "../../contexts/TransactionsContext";


export function TransactionTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>

        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{transaction.type === "withdraw" ? "-" : ""}{new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(transaction.amount)}</td>
              <td>{transaction.category}</td>
              <td>{new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.createdAt))}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </Container>
  )
}