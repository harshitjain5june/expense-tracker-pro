<script setup lang="ts">
import type { TransactionData } from '@/types';
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/useTransactionStore';
import { storeToRefs } from 'pinia'

const store = useTransactionStore()
const { transactions } = storeToRefs(store)

const showAlerts = ref({
  showErrLength: false,
  showErrEmpty: false,
  showSucc: false
})

/*** Before pinia
const emit = defineEmits<{
  (event: 'transactionSubmitted', payload: TransactionData): void;
}>();
***/

function alertTimeOut(alertType: keyof typeof showAlerts.value) {
  setTimeout(() => {
    showAlerts.value[alertType] = false
  }, 3000)
}
const handleTransactionData = (transactionData: TransactionData) => {
  const id = `${Date.now()}`;
  transactions.value.push({ id: id, text: transactionData.text, amount: transactionData.amount })
  store.saveToLocalStorage()
}


function onSubmit() {
  if (transaction.value.length < 3) {
    showAlerts.value.showErrLength = true
    alertTimeOut('showErrLength')
  }
  else if (transaction.value.length == 0 || amount.value == 0) {
    showAlerts.value.showErrEmpty = true
    alertTimeOut('showErrEmpty')
  }
  else {
    showAlerts.value.showSucc = true
    alertTimeOut('showSucc')
    const transactionData = { text: transaction.value, amount: amount.value }
    handleTransactionData(transactionData)
  }
}
const transaction = ref('')
const amount = ref(0)

</script>

<template>
  <v-alert type="error" v-if="showAlerts.showErrLength"
    text="Transaction item name is too small. It should have atleast 3 characters."></v-alert>
  <v-alert type="error" v-if="showAlerts.showErrEmpty" text="Please fill both the fields before submitting."></v-alert>
  <v-alert type="success" v-if="showAlerts.showSucc" text="Transaction submitted successfully."></v-alert>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Transaction Item</label>
      <input type="text" v-model="transaction" id="text" placeholder="Enter transaction item..." />
    </div>
    <div class="form-control">
      <label for="amount">Amount <br />
        (negative - expense, positive - income)</label>
      <input type="number" v-model="amount" id="amount" placeholder="Enter amount..." />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>