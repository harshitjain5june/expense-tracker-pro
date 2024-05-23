<script setup lang="ts">
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpense from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/useTransactionStore';
import { storeToRefs } from 'pinia'

const store = useTransactionStore()

onMounted(() => {
  const savedTransactions: string | null = localStorage.getItem('transactions');
  if (savedTransactions) {
    transactions.value = JSON.parse(savedTransactions);
  }
})

const { transactions } = storeToRefs(store)

</script>

<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpense />
    <TransactionList />
    <AddTransaction />
  </div>
</template>
