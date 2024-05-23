<script setup lang="ts">
// defineProps<{ total: number }>();
import { useTransactionStore } from '@/stores/useTransactionStore';
const store = useTransactionStore()
</script>
<template>
    <h4>Your Balance</h4>
    <h1 id="balance">Rs{{ store.total }}</h1>
</template>
