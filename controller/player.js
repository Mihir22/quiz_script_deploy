// Author: Harshit Gajjar
function PlayerObj() {
  let player = {};
  player.Player = (id, name) => {
    return {
      id: id,
      name: name ? name : id,
      score: 0,
      active: false,
    };
  };

  return player;
}

export default PlayerObj();
