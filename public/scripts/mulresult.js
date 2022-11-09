// Author: Harshit Gajjar
async function validateUser() {
  const fetchdata = await fetch("/getUser");
  const user_data = await fetchdata.json();

  if (!user_data.user) {
    window.location.replace("/");
  } else {
    return user_data.user;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const socket = io("http://localhost:3000", {});

  const usId = await validateUser();

  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const category = urlParams.get("category");

  const p1 = document.getElementById("player_one");
  const p2 = document.getElementById("player_two");
  const p1Score = document.getElementById("player_one_score");
  const p2Score = document.getElementById("player_two_score");
  const verdict = document.getElementById("verdict");
  const dashboard = document.getElementById("dashboard");
  const signout = document.getElementById("signout");

  dashboard.addEventListener("click", () => {
    window.location.replace("./dashboard.html");
  });

  signout.onclick = async function (e) {
    logout = await fetch("/logout");
    window.location.replace("/");
  };

  function getScore() {
    socket.emit("get_score", "", function (resp) {
      let player1 = resp.find((p) => p.id === usId);
      let arr = resp.filter((p) => p.id != usId);
      let player2 = arr[0];
      p1.innerText = usId;
      p2.innerText = player2.id;
      p1Score.innerText = `${player1.score}`;
      p2Score.innerText = `${player2.score}`;

      verdict.innerText =
        player1.score === player2.score
          ? "Game Tied"
          : player1.score > player2.score
          ? player1.id + " Won"
          : player2.id + " Won";

      sendResultToDb(player1, player2);
    });
  }

  async function sendResultToDb(player1, player2) {
    const headers = new Headers({ "Content-Type": "application/json" });

    let userId = player1.id;
    let opponent = player2.id;
    let myScore = player1.score;
    let opponentScore = player2.score;

    if (usId != opponent) {
      let data = {
        username: usId,
        result: [
          {
            opponent,
            winner:
              myScore == opponentScore
                ? "Game Tie"
                : myScore > opponentScore
                ? userId
                : opponent,
            category,
            date: new Date(),
          },
        ],
      };

      const opts = {
        method: "post",
        headers: headers,
        body: JSON.stringify(data),
      };

      try {
        const resp = await fetch("/quizResult/sendMulQuizResults", opts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  getScore();
});
