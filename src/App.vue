<script setup lang="ts">
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpense from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import type { Transaction, TransactionData } from './types'
import { ref, computed, onMounted } from 'vue'

onMounted(() => {
  const savedTransactions: string | null = localStorage.getItem('transactions');
  if (savedTransactions) {
    transactions.value = JSON.parse(savedTransactions);
  }
})

const transactions = ref<Transaction[]>([
])
const total = computed(() => {
  return transactions.value.reduce((acc, item) => { return (acc += item.amount) }, 0);
})

const income = computed(() => {
  return transactions.value.filter((item) => item.amount > 0).reduce((acc, item) => { return (acc += item.amount) }, 0);
})

const expense = computed(() => {
  return transactions.value.filter((item) => item.amount < 0).reduce((acc, item) => { return (acc += item.amount) }, 0);
})

const handleTransactionData = (transactionData: TransactionData) => {
  const id = `${Date.now()}`;
  transactions.value.push({ id: id, text: transactionData.text, amount: transactionData.amount })
  saveToLocalStorage()
}

const handleDeleteTrans = (transactionData: Transaction) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionData.id)
  saveToLocalStorage()
}

const saveToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpense :expense="expense" :income="income" />
    <TransactionList :transactions="transactions" @deleteTransaction="handleDeleteTrans" />
    <AddTransaction @transactionSubmitted="handleTransactionData" />
  </div>
</template>
