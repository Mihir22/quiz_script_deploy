// Author: Harshit Gajjar
import player from "./player.js";

function Game() {
  let game = {};

  let players = [],
    options = [];

  let playersObj = {};
  let scarr = [];

  game.handle = (socket) => {
    socket.on("new player", () => {
      players.push(player.Player(socket.id, socket.id));
      socket.server.emit("update-game", players);

      if (players.length == 2) {
        socket.server.emit("game_players", players);
      }
    });

    socket.on("option-selected", (data) => {
      options = options.filter((d) => d.id != data.id);
      options.push(data);

      if (options.length == 2) {
        socket.server.emit("update option", options);
      }
    });

    socket.on("clear-options", () => {
      options = [];
      options.slice(0, options.length);
    });

    socket.on("clear-players", () => {
      socket.server.emit("return_players", playersObj);

      players = [];
      players.slice(0, players.length);
    });

    socket.on("add_player", (p) => {
      playersObj[p] = "";
    });

    socket.on("update_result", (scoreArr) => {
      scarr = scoreArr;
    });

    socket.on("get_score", function (data, fn) {
      fn(scarr);
    });
  };

  return game;
}

export default Game();
