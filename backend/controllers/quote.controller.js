const db = require("../models");
const Quotes = db.quotes;
const redisClient = require("../config/redis.config");

//menambah data quote baru
exports.createQuotes = async (req, res) => {
  try {
    const { quote, author } = req.body;
    const newQuote = await Quotes.create({ quote, author });

    await redisClient.del("allQuotes");
    await redisClient.del("randomQuotesPool");

    res.status(201).json({
      message: "berhasil menambah data quote",
      data: newQuote,
    });
  } catch (error) {
    res.status(500).json({ message: "gagal menambah data quote" });
  }
};

//mengambil quote secara acak
exports.randomQuotes = async (req, res) => {
  try {
    const cacheKey = "randomQuotesPool";
    let quotesPool = await redisClient.get(cacheKey);

    if (!quotesPool) {
      const allQuotes = await Quotes.findAll();
      if (allQuotes.length === 0) {
        return res.status(404).json({ message: "quotes tidak tersedia" });
      }
      quotesPool = JSON.stringify(allQuotes);
      await redisClient.setEx(cacheKey, 300, quotesPool);
    }

    const quotesArray = JSON.parse(quotesPool);
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const randomQuotes = quotesArray[randomIndex];

    res.status(200).json(randomQuotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "gagal mendapat data quotes" });
  }
};

//dapatkan semua data quote
exports.allQuotes = async (req, res) => {
  try {
    const cacheKey = "allQuotes";
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const allQuotes = await Quotes.findAll({
      order: [["id", "ASC"]],
    });
    await redisClient.setEx(cacheKey, 300, JSON.stringify(allQuotes));
    res.status(200).json(allQuotes);
  } catch (error) {
    res.status(500).json({ message: "gagal mendapatkan data quotes" });
  }
};

//update data quote
exports.updateQuotes = async (req, res) => {
  try {
    const updateQuotes = await Quotes.findByPk(req.params.id);
    if (!updateQuotes) {
      return res.status(404).json({ message: "Quote tidak ditemukan" });
    }

    const { quote, author } = req.body;
    await updateQuotes.update({ quote, author });

    await redisClient.del("allQuotes");
    await redisClient.del("randomQuotesPool");
    res.status(200).json({
      message: "berhasil mengedit quote",
      data: updateQuotes,
    });
  } catch (error) {
    res.status(500).json({ message: "gagal mengedit quote" });
  }
};

exports.deleteQuotes = async (req, res) => {
  try {
    const deleteQuotes = await Quotes.findByPk(req.params.id);
    if (!deleteQuotes) {
      return res.status(404).json({ message: "quote tidak ditemukan" });
    }

    await deleteQuotes.destroy();

    await redisClient.del("allQuotes");
    await redisClient.del("randomQuotesPool");
    res.status(200).json({ message: "berhasil menghapus data quote" });
  } catch (error) {
    res.status(500).json({ message: "gagal menghapus quote" });
  }
};
