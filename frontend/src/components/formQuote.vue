<template>
  <v-container>
    <v-row class="justify-space-between align-center mb-4">
      <h2>List Quotes</h2>
      <v-btn color="shades" variant="outlined" @click="openDialog()"
        >New Quote</v-btn
      >
    </v-row>
    <!-- data table -->

    <v-data-table
      :headers="headers"
      :items="quotes"
      class="rounded"
      density="comfortable"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="me-2"
          color="black"
          icon="mdi-pencil"
          @click="openDialog(item)"
        ></v-icon>
        <v-icon
          small
          color="black"
          icon="mdi-delete"
          @click="openconfirmDeleteDialog(item.id)"
        ></v-icon>
      </template>
    </v-data-table>

    <!-- edit dialog -->
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>
          <span class="mb-2">{{ editedQuote.id ? "Edit" : "Add" }} Quote</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="editedQuote.quote"
                label="Quote *"
                density="comfortable"
                hide-details
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="editedQuote.author"
                label="Author *"
                density="comfortable"
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" color="grey" @click="closeDialog">Cancel</v-btn>
          <v-btn variant="flat" color="primary" @click="saveQuote">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->
    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>Are you sure want to delete this quote?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="confirmDeleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn variant="flat" color="red" @click="confirmDelete"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="3000" color="error">
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

//kolom tabel
const headers = [
  { title: "Id", key: "id" },
  { title: "Quotes", key: "quote" },
  { title: "Authors", key: "author" },
  { title: "Actions", key: "actions", sortable: false },
];

const quotes = ref([]);
const dialog = ref(false);
const editedQuote = ref({ id: null, quote: "", author: "" });
const snackbar = ref(false);
const errorMessage = ref("");
const confirmDeleteDialog = ref(false);
const quoteToDeleteId = ref(null);

//ambil data
const fetchQuotes = async () => {
  try {
    const res = await api.get("/quotes");
    quotes.value = res.data;
  } catch (error) {
    quotes.value = "failed to get quote";
    console.log(error);
  }
};

//buka dialog form tambah/edit
const openDialog = (item = { id: null, quote: "", author: "" }) => {
  editedQuote.value = { ...item };
  dialog.value = true;
};

//tutup dialog
const closeDialog = () => {
  dialog.value = false;
  editedQuote.value = { id: null, quote: "", author: "", author: "" };
};

//simpan quote (POST atau PUT)
const saveQuote = async () => {
  const quoteText = editedQuote.value.quote?.trim();
  const authorText = editedQuote.value.author?.trim();

  errorMessage.value = "";

  if (!quoteText) {
    errorMessage.value = "Quote cannot be empty!";
    snackbar.value = true;
    return;
  }

  if (!authorText) {
    errorMessage.value = "Author cannot be empty!";
    snackbar.value = true;
    return;
  }

  const payload = { quote: quoteText, author: authorText };

  try {
    if (editedQuote.value.id) {
      await api.put(`/quotes/${editedQuote.value.id}`, payload);
    } else {
      await api.post("/quotes", payload);
    }
    await fetchQuotes();
    closeDialog();
  } catch (error) {
    errorMessage.value = editedQuote.value.id
      ? "failed to update quote"
      : "failed to create quote";
    snackbar.value = true;
    console.error("error saving quote:", error);
  }
};

//hapus quote
const openconfirmDeleteDialog = (id) => {
  quoteToDeleteId.value = id;
  confirmDeleteDialog.value = true;
};

const confirmDelete = async () => {
  try {
    await api.delete(`/quotes/${quoteToDeleteId.value}`);
    await fetchQuotes();
  } catch (error) {
    errorMessage.value = "failed to delete quote";
    snackbar.value = true;
    console.log(error);
  } finally {
    confirmDeleteDialog.value = false;
    quoteToDeleteId.value = null;
  }
};

onMounted(() => {
  fetchQuotes();
});
</script>
