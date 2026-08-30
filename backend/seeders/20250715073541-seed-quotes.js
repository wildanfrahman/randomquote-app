"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const quotes = [
      { quote: "Hidup adalah perjuangan", author: "Anonim" },
      { quote: "Belajar sepanjang hayat", author: "Socrates" },
      { quote: "Waktu adalah uang", author: "Benjamin Franklin" },
      { quote: "Jangan menunda pekerjaan", author: "Thomas Jefferson" },
      { quote: "Bangun lebih pagi untuk sukses", author: "Joko Widodo" },
      { quote: "Cintai pekerjaanmu", author: "Steve Jobs" },
      { quote: "Sukses adalah kebiasaan", author: "Aristoteles" },
      { quote: "Jangan takut gagal", author: "Michael Jordan" },
      { quote: "Berani mencoba itu penting", author: "Elon Musk" },
      { quote: "Inovasi tanpa henti", author: "Jeff Bezos" },
      { quote: "Jadilah versi terbaik dirimu", author: "Oprah Winfrey" },
      { quote: "Pendidikan kunci masa depan", author: "Nelson Mandela" },
      {
        quote: "Berpikir positif membawa hasil baik",
        author: "Norman Vincent Peale",
      },
      { quote: "Kesuksesan datang dari kerja keras", author: "Dwayne Johnson" },
      { quote: "Fokuslah pada solusi, bukan masalah", author: "Tony Robbins" },
      { quote: "Keberanian adalah kunci perubahan", author: "Barack Obama" },
      { quote: "Impian dimulai dari langkah kecil", author: "Walt Disney" },
      {
        quote: "Waktu terbaik menanam pohon adalah sekarang",
        author: "Pepatah China",
      },
      {
        quote: "Kreativitas adalah kecerdasan bersenang-senang",
        author: "Albert Einstein",
      },
      {
        quote: "Jangan hidup untuk bekerja, bekerjalah untuk hidup",
        author: "Simon Sinek",
      },
    ];

    return queryInterface.bulkInsert("quotes", quotes, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("quotes", null, {});
  },
};
