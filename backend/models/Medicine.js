const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  symptom: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  dosage: {
    type: String,
    required: true
  },

  purchaseLink: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Medicine", medicineSchema);
