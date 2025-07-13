const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://ranjeetsahai3579:Thor1234@cluster0.6nuymqn.mongodb.net/registration?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// Define schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const User = mongoose.model("User", UserSchema);

// POST route
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/", (req, res) => {
  res.send("Registration API is running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

