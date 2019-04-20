var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    headline: {
        type: String,
        trim: true
    },
    summary: {
        type: String
    },
    url: {
        type: String
    },
    photo: {
        type: String
    }
});

var article = mongoose.model("Article", articleSchema);

module.exports = Article;