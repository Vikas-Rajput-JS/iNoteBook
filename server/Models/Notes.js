const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{type:String,require:true},
  description: { type: String, require: true },
  tags: { type: String, default: "#Welcome" },
  Date: { type: Date, default: Date.now },
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
