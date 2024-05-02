require('dotenv').config()
const express = require("express");

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;


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

const corsOptions = {
    origin: FRONTEND_URL
};




// Cors
app.use(cors(corsOptions));


// Routes
app.get('/', (req, res) => {
    return res.json("The Dakshet Ghole");
});

app.use("/user", userRoute);

app.use('/notes', noteRoute)


// Listen
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});