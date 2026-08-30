<template>
  <v-app class="custom-background">
    <Header />
    <v-main>
      <RouterView />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<style></style>
