<script setup lang="ts">
import { defineProps } from 'vue'
import type { Transaction } from '../types/index'
defineProps<{ transactions: Transaction[] }>();



</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li v-for="transaction in transactions" :class="transaction.amount <  0 ? 'minus' : 'plus'">
      {{ transaction.text }} <span>Rs{{ transaction.amount }}</span><button class="delete-btn">x</button>
    </li>
  </ul>
</template>
