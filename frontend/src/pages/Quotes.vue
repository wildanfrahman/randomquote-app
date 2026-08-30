<template>
  <v-container fluid class="fill-height">
    <v-row class="d-flex flex-column align-center">
      <v-col cols="12" sm="6">
        <QuoteCard :quote="quote" @refresh="getQuote" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import QuoteCard from "../components/quoteCard.vue";
import { ref } from "vue";
import api from "../services/api";

const quote = ref({
  quote: "",
  author: "",
});

const getQuote = async () => {
  try {
    const res = await api.get("/quotes/random");
    console.log("API Response:", res.data);
    quote.value = {
      quote: res.data.quote,
      author: res.data.author,
    };
  } catch (error) {
    console.error("error fetching random quote:", error);
  }
};
</script>
