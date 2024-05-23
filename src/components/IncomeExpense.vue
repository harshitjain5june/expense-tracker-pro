<script setup lang="ts">
import { useTransactionStore } from '@/stores/useTransactionStore';
const store = useTransactionStore()
</script>

Script
<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p id="money-plus" class="money plus">+Rs{{ store.income }}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p id="money-minus" class="money minus">-Rs{{ -(store.expense) }}</p>
        </div>
    </div>
</template>