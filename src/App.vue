<script setup lang="ts">
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpense from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import type { Transaction } from './types'
import { ref, computed } from 'vue'
const transactions: Transaction[] = [{ id: '1', text: 'petrol', amount: -3800 }
  , { id: '2', text: 'salary', amount: 50000 }
]
const total = computed(() => {
  return transactions.reduce((acc, item) => {return (acc += item.amount)}, 0);
})

const income = computed(() => {
  return transactions.filter((item) => item.amount > 0).reduce((acc, item) => {return (acc += item.amount)}, 0);
})

const expense = computed(() => {
  return transactions.filter((item) => item.amount < 0).reduce((acc, item) => {return (acc += item.amount)}, 0);
})

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total"/>
    <IncomeExpense :expense="expense" :income="income" />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>
