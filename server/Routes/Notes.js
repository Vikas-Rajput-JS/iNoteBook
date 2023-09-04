const express = require("express");
const FetchUser = require("../middleware/Login");
const Notes = require("../Models/Notes");
const Router = express.Router();
const { body, validationResult } = require("express-validator");

Router.get("/fetchnotes", FetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    // Final Error
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

Router.post(
  "/addnote",
  FetchUser,
  [
    body("title").isLength({ min: 4 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(400).send({ error: error.array() });
      }
      const { title, description, tags } = req.body;
      const notes = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const savednote = await notes.save();
      res.send(savednote);
    } catch (error) {
      // Final Error
      console.log(error);
      res.status(500).json({ error: "Something Went Wrong" });
    }
  }
);

Router.put("/updatenote/:id", FetchUser, async(req, res) => {
  const { title, description, tags } = req.body;
  try {
    
 
  let UpdatedNote = {};
  if (title) {
    UpdatedNote.title = title;
  }
  if (description) {
    UpdatedNote.description = description;
  }
  if (tags) {
    UpdatedNote.tags = tags;
  }
  let note  = await Notes.findById(req.params.id)
  if(!note){
   return res.status(404).send('Not Found')
  }
if(note.user.toString()!== req.user.id){
    return res.status(404).send('Not Allowed')
}
note = await Notes.findByIdAndUpdate(req.params.id,{$set:UpdatedNote},{new:true})
res.json(note)
} catch (error) {
    // Final Error
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});




Router.delete('/deletenote/:id',FetchUser,async(req,res)=>{
    try {
        
  
    let note  = await Notes.findById(req.params.id)
    if(!note){
     return res.status(404).send('Not Found')
    }
  if(note.user.toString()!== req.user.id){
      return res.status(404).send('Not Allowed')
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.send({Result:"Note removed successfully",note:note})
} catch (error) {
    // Final Error
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
})

module.exports = Router;
