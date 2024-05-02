const mongoose = require("mongoose");

async function handleToDB(url) {
    return mongoose.connect(url);
}
//Export
module.exports = {
    handleToDB,
}