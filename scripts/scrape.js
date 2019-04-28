const axios = require("axios");
const cheerio = require("cheerio");

let scrape = function() {
  return axios.get("http://www.nytimes.com").then(function(res) {
    let $ = cheerio.load(res.data);
    console.log("scraping");
    let articles = [];

    $("div.css-1100km").each(function(i, element) {
      let head = $(this).find("h2").text().trim();

      let url = $(this).find("a").attr("href");

      let sum = $(this).find("p").text().trim();

      if (head && sum && url) {
        let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        let dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.nytimes.com" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;