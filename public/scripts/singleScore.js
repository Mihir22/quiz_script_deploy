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

const query = window.location.search;
const urlParams = new URLSearchParams(query);
const total = urlParams.get("total");

async function fetchScore(param) {
  const resp = await fetch("/quizResult/fetchSingleScore/" + param);
  data = await resp.json();
  data = data[data.length - 1];
  return data.score;
}

document.addEventListener("DOMContentLoaded", async () => {
  const userID = await validateUser();

  const score = await fetchScore(userID);
  const show_score = document.querySelector(".score");
  show_score.innerHTML = score.toString() + "/" + total.toString();

  const message = document.querySelector(".text");
  if (score == 5) {
    message.innerHTML = "Awesome!";
  } else if (score >= 3 && score <= 4) {
    message.innerHTML = "Good Job!";
  } else {
    message.innerHTML = "Better Luck Next Time!";
  }

  const dashboard = document.getElementById("dashboard");
  dashboard.onclick = function (e) {
    window.location.href = "/dashboard.html";
  };
  const signout = document.getElementById("sign_out");
  signout.onclick = async function (e) {
    logout = await fetch("/logout");
    window.location.replace("/");
  };
});
