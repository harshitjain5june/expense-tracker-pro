import { defineStore } from "pinia";
import type { Transaction } from "../types/index";
import { ref, computed } from "vue";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<Transaction[]>([]);
  const total = computed(() => {
    return transactions.value.reduce((acc, item) => { return (acc += item.amount) }, 0);
  })

  const income = computed(() => {
    return transactions.value.filter((item) => item.amount > 0).reduce((acc, item) => { return (acc += item.amount) }, 0);
  })

  const expense = computed(() => {
    return transactions.value.filter((item) => item.amount < 0).reduce((acc, item) => { return (acc += item.amount) }, 0);
  })

  const saveToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }

  return {
    transactions,
    total,
    income,
    expense,
    saveToLocalStorage
  }
})
