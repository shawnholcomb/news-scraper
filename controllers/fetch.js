const db = require("../models");
const scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    return scrape()
      .then(function(articles) {
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "There are no new articles."
          });
        }
        else {
          res.json({
            message: `Added ${dbHeadline.length} new articles.`
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};