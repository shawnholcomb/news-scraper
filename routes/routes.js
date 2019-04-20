module.exports = function (app) {

    const axios = require('axios');
    const cheerio = require("cheerio");

    app.get("/", function (req, res) {
        res.render("home", { title: "Das News - A New Scraper" })
    });

    app.get("/scrape", function (req, res) {
        axios.get("https://www.reuters.com/news/world").then(function (response) {
            const $ = cheerio.load(response.data);
            let results = [];

            $("div.story_with_image_featured").each(function (i, element) {
                
                let headline = $(element).find("a").text();
                let headlineLink = $(element).find("a").attr("href");
                let summary = $(element).find("p.FeedItemLede_lede").text().substring(0, 100);
                let image = $(element).find("img").attr("src");
                
                results.push({
                  headline: headline,
                  link: headlineLink,
                  summary: summary,
                  image: image
                });
            });
        });

        res.redirect("/")
    });

    app.get("/saved", function (req, res) {
        res.render("saved", { title: "Das News - Saved Articles" })
    });

};