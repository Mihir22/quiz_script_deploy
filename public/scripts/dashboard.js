//AUTHOR MIHIR MESIA
async function validateUser() {
  const fetchdata = await fetch("/getUser");
  const user_data = await fetchdata.json();

  if (!user_data.user) {
    window.location.replace("/");
  } else {
    return user_data.user;
  }
}

const cat_re = document.getElementById("cat_re");
cat_re.onclick = function (e) {
  window.location.href = "/categories.html";
};

const signout = document.getElementById("sign_out");
signout.onclick = async function (e) {
  logout = await fetch("/logout");
  window.location.replace("/");
};

async function fetchScore(userID) {
  const resp = await fetch("/quizResult/fetchSingleScore/" + userID);
  const data = await resp.json();
  return data;
}

async function fetchMulScore(userID) {
  const resp = await fetch("/quizResult/fetchMulScore/" + userID);
  const data = await resp.json();
  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  const userID = await validateUser();

  const data = await fetchScore(userID);

  const mulData = await fetchMulScore(userID);
  const table = document.querySelector(".records");
  const multable = document.querySelector(".mulRecords");
  const deleteBtn = document.getElementById("delete_user");
  const deleteRecords = document.getElementById("delete_record")
  const username = document.querySelector(".username");
  username.innerHTML = userID;
  if (data.length > 0) {
    data.forEach((val) => {
      let score = val.score;
      let date = val.date;
      let topic = val.category;

      date = new Date(date);
      date = date.toDateString().split(" ");
      date = date[1] + " " + date[2] + " " + date[3];

      const row = document.createElement("tr");
      const score_d = document.createElement("td");
      const topic_d = document.createElement("td");
      const date_d = document.createElement("td");

      score_d.innerHTML = score;
      date_d.innerHTML = date;
      topic_d.innerHTML = topic;

      row.appendChild(topic_d);
      row.appendChild(score_d);
      row.appendChild(date_d);

      table.appendChild(row);
    });
  }

  if (mulData.length > 0) {
    mulData.forEach((val) => {
      let opponent = val.opponent;
      let date = val.date;
      let winner = val.winner;
      let cat = val.category;

      cat = cat.replace("%20", " ");

      date = new Date(date);
      date = date.toDateString().split(" ");
      date = date[1] + " " + date[2] + " " + date[3];

      const row = document.createElement("tr");
      const topic_d = document.createElement("td");
      const opponent_d = document.createElement("td");
      const winner_d = document.createElement("td");
      const date_d = document.createElement("td");

      topic_d.innerHTML = cat;
      date_d.innerHTML = date;
      opponent_d.innerHTML = opponent;

      if (winner == "Game Tie") {
        winner_d.innerHTML = "Tie";
      } else if (winner == userID) {
        winner_d.innerHTML = "You Won";
      } else {
        winner_d.innerHTML = "You Lost";
      }

      row.appendChild(topic_d);
      row.appendChild(opponent_d);
      row.appendChild(winner_d);
      row.appendChild(date_d);

      multable.appendChild(row);
    });
  }

  // Author: Harshit Gajjar
  deleteBtn.addEventListener("click", async () => {
    const headers = new Headers({ "Content-Type": "application/json" });

    const opts = {
      method: "delete",
      headers: headers,
    };

    const resp = await fetch("/newuser/deleteUser/" + userID, opts);
    if (resp.status == 200) window.location.replace("/");
  });

  // Author: Mihir Mesia

  deleteRecords.addEventListener("click", async() => {
    const headers = new Headers({ "Content-Type": "application/json" });

    const opts = {
      method: "delete",
      headers: headers,
    };

    const resp = await fetch("/newuser/deleteRecords/" + userID, opts);
    if (resp.status == 200) window.location.replace("/dashboard.html");
  });


  })

