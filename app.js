require('dotenv').config()
const express = require("express");

const app = express();
const PORT = process.env.PORT;



// Import

const { handleToDB } = require("./connection");
const userRoute = require("./routes/user")
const noteRoute = require("./routes/note")
const cors = require("cors")


// MongoDB connection
handleToDB(process.env.MONGODB_URL).then(() => {
    console.log("Db connected")
}).catch((error) => {
    console.log(error);
})


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// Engine


// Cors
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ["POST"],
    credentials: true,
}))


// Routes
app.get('/', (req, res) => {
    return res.json("The Dakshet Ghole");
});

app.use("/user", userRoute);

app.use('/notes', noteRoute)


// Listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});