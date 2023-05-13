const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.basketball-reference.com/teams/PHO/2022_start.html";

axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const seasonData = [];
    const rows = $("tbody tr").toArray();
    const games = rows.map((row) => {
      const $row = $(row);
      const date = $row.find('[data-stat="date_game"] a').text();
      console.log("date: ", date);

      const opponent = $row.find('[data-stat="opp_name"] a').text();
      console.log("opponent: ", opponent);
      const winStatus = $row.find('[data-stat="game_result"]').text();
      console.log("winStatus: ", winStatus);
      const teamPoints = $row.find('[data-stat="pts"]').text();
      const opponentPoints = $row.find('[data-stat="opp_pts"]').text();
      const win = $row.find('[data-stat="wins"]').text();
      const loss = $row.find('[data-stat="losses"]').text();

      const startingLineupElement = $row.find('[data-stat="game_starters"]');
      const startingLineup = startingLineupElement
        .find("a")
        .toArray()
        .map((a) => {
          const player = $(a).text();
          const playerUrl = $(a).attr("href");
          return { player, playerUrl };
        });

      return {
        date,
        opponent,
        wonLoss: winStatus === "W" ? "Won" : "Lost",
        teamPoints,
        opponentPoints,
        win,
        loss,
        startingLineup: {
          players: startingLineup,
        },
      };
    });
    const data = {
      games,
    };
    const json = JSON.stringify(data);

    fs.writeFileSync("data.json", json);
    console.log(json);
    console.log("Scraping completed!");
  })
  .catch((error) => {
    console.error(error);
  });
