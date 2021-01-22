const fs = require("fs");
const casper = require("casper").create();

var links = [];
function getLinks() {
  const links = document.querySelectorAll("a.theme-card__title");
  return Array.prototype.map.call(links, function (e) {
    return e.getAttribute("href");
  });
}

casper.start("https://themes.getbootstrap.com/");
casper.then(function () {
  this.echo("Root: " + this.getTitle());
});

casper.then(function () {
  links = this.evaluate(getLinks);
  links.map(function (link) {
    casper.thenOpen(link, function () {
      const purchasesSelector = ".theme-purchases__item__inner h5";
      const theme = {};
      if (this.exists(purchasesSelector)) {
        theme.themeId = this.evaluate(function () {
          return document
            .querySelector("a.feature-screenshot__overlay")
            .getAttribute("href")
            .split("?theme_id=")
            .pop();
        });
        theme.title = this.getTitle();
        // theme.updatedAt = casper.getElementInfo(purchasesSelector).text;
        // theme.rank = links.indexOf(link);
        // theme.purchases = casper.getElementInfo(purchasesSelector).text;
        this.emit("theme.loaded", theme);
        console.log(links.indexOf(link), links.length - 1);
        if (links.indexOf(link) === links.length - 1) {
          this.emit("theme.loaded.done", true);
        }
      }
    });
  });
});

const data = [];
casper.on("theme.loaded", function (theme) {
  data.push(theme);
  console.log(
    "Processing: " + ((theme.rank * 100) / (links.length - 1)).toFixed(2) + "%"
  );
});

function writeFile() {
  const currentTime = new Date();
  fs.write(
    "./data/" +
      currentTime.toISOString().split("T").shift().split("-").join("/") +
      ".json",
    JSON.stringify(
      {
        time: currentTime,
        data: data,
      },
      null,
      2
    ),
    "w"
  );
}

casper.on("theme.loaded.done", function () {
  console.log("Done successfully!");
});

casper.then(writeFile);

casper.run();
