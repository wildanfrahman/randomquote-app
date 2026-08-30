<template>
  <v-card class="text-center" elevation="3">
    <v-card-text>
      <div v-if="quoteData.quote?.trim()">
        <p class="text-h6">
          {{ quoteData.quote }}
        </p>
        <p v-if="quoteData.author?.trim()" class="text-subtitle-1">
          - {{ quoteData.author }}
        </p>
      </div>
      <p v-else class="text-grey">Click "Get Quote" to load random quote.</p>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn variant="outlined" @click="$emit('refresh')">Get Quote!</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  quote: {
    type: Object,
    required: false,
    default: () => ({ quote: "", author: "" }),
  },
});

const quoteData = computed(() => props.quote);

defineEmits(["refresh"]);
</script>
