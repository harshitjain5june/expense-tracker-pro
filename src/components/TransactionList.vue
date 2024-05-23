<script setup lang="ts">
import type { Transaction } from '../types/index'
import { useTransactionStore } from '@/stores/useTransactionStore';
import { storeToRefs } from 'pinia';

const store = useTransactionStore()
const { transactions } = storeToRefs(store)

/****  Before Pinia 
defineProps<{ transactions: Transaction[] }>();
const emit = defineEmits<{
  (event: 'deleteTransaction', payload: Transaction): void;
}>();

function onDelete(transactionData: Transaction) {
  emit("deleteTransaction", transactionData)
}

****/
function onDelete(transactionData: Transaction) {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionData.id)
  store.saveToLocalStorage()
}


</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li v-for="transaction in transactions" :class="transaction.amount < 0 ? 'minus' : 'plus'">
      {{ transaction.text }} <span>{{ transaction.amount > 0 ? 'Rs' + transaction.amount : '-Rs' +
        Math.abs(transaction.amount) }}</span>
      <button @click="onDelete({ id: transaction.id, text: transaction.text, amount: transaction.amount })"
        class="delete-btn">x</button>
    </li>
  </ul>
</template>
