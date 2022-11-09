
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
const param = urlParams.get("categories");
let score = 0;

//updating for next question
function update(data) {
  let iSelected = false;

  const question = document.getElementById("q");
  const op1_p = document.getElementById("1");
  const op2_p = document.getElementById("2");
  const op3_p = document.getElementById("3");
  const op4_p = document.getElementById("4");
  const opA = document.getElementById("optA");
  const opB = document.getElementById("optB");
  const opC = document.getElementById("optC");
  const opD = document.getElementById("optD");

  //remove user selection
  if (opA.classList.contains("active")) {
    opA.classList.toggle("active");
  } else if (opB.classList.contains("active")) {
    opB.classList.toggle("active");
  } else if (opC.classList.contains("active")) {
    opC.classList.toggle("active");
  } else if (opD.classList.contains("active")) {
    opD.classList.toggle("active");
  }
  //remove correct answer selection
  if (opA.classList.contains("correct_ans")) {
    opA.classList.toggle("correct_ans");
  } else if (opB.classList.contains("correct_ans")) {
    opB.classList.toggle("correct_ans");
  } else if (opC.classList.contains("correct_ans")) {
    opC.classList.toggle("correct_ans");
  } else if (opD.classList.contains("correct_ans")) {
    opD.classList.toggle("correct_ans");
  }

  question.innerHTML = data.ques;
  op1_p.innerHTML = data.options[0];
  op2_p.innerHTML = data.options[1];
  op3_p.innerHTML = data.options[2];
  op4_p.innerHTML = data.options[3];

  opA.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans == 1) {
        score += 1;
      }
      optA.classList.toggle("active");
      showAns(data.ans);
    }
  });

  opB.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans == 2) {
        score += 1;
      }
      optB.classList.toggle("active");
      showAns(data.ans);
    }
  });

  opC.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans == 3) {
        score += 1;
      }
      optC.classList.toggle("active");
      showAns(data.ans);
    }
  });

  opD.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans == 4) {
        score += 1;
      }
      optD.classList.toggle("active");
      showAns(data.ans);
    }
  });
}

function changeSelection(option) {
  const op_clicked = document.getElementById(option);
  op_clicked.classList.remove("active");
}

//sending result to database
async function sendScore(score, userID) {
  let date = new Date();
  let data = {
    username: userID,
    results: [
      {
        score: score,
        date: date,
        category: param,
      },
    ],
  };

  const headers = new Headers({ "Content-Type": "application/json" });

  const opts = {
    method: "post",
    headers: headers,
    body: JSON.stringify(data),
  };

  let resp = await fetch("/quizResult/sendSingleScore", opts);
  resp = await resp.json();
}

//show correct ans
function showAns(ans) {
  const optA = document.getElementById("optA");
  const optB = document.getElementById("optB");
  const optC = document.getElementById("optC");
  const optD = document.getElementById("optD");
  switch (ans) {
    case 1:
      optA.classList.add("correct_ans");
      break;
    case 2:
      optB.classList.add("correct_ans");
      break;
    case 3:
      optC.classList.add("correct_ans");
      break;
    case 4:
      optD.classList.add("correct_ans");
      break;
    default:
      clearActiveSelection();
  }
}

//display when page loaded
document.addEventListener("DOMContentLoaded", async () => {
  const userID = await validateUser();

  const resp = await fetch("/questions/" + param);
  data = await resp.json();
  let index = 0;
  let iSelected = false;
  let clicked_id = null;

  first_ques = data.data[index];

  const container = document.querySelector(".container");
  const card = document.createElement("div");
  const ques = document.createElement("div");
  const ques_p = document.createElement("p");
  const options = document.createElement("options");
  const optA = document.createElement("button");
  const optB = document.createElement("button");
  const optC = document.createElement("button");
  const optD = document.createElement("button");
  const next = document.createElement("div");
  const next_button = document.createElement("button");
  next_button.innerHTML = "Next";
  next_button.className = "next_button";

  next_button.addEventListener("click", async () => {
    index += 1;
    if (index >= data.data.length) {
      await sendScore(score, userID);
      window.location.replace("/singleResult.html?total=" + data.data.length);
    } else {
      update(data.data[index]);
    }
  });

  next.className = "next";
  next.appendChild(next_button);
  ques_p.id = "q";

  const optA_p = document.createElement("p");
  const optB_p = document.createElement("p");
  const optC_p = document.createElement("p");
  const optD_p = document.createElement("p");
  optA_p.id = "1";
  optB_p.id = "2";
  optC_p.id = "3";
  optD_p.id = "4";

  card.className = "card";
  ques.className = "ques";
  options.className = "options";
  optA.className = "option";
  optB.className = "option";
  optC.className = "option";
  optD.className = "option";

  optA.id = "optA";
  optB.id = "optB";
  optC.id = "optC";
  optD.id = "optD";

  ques_p.innerHTML = first_ques.ques;
  ques.appendChild(ques_p);

  optA_p.innerHTML = first_ques.options[0];
  optB_p.innerHTML = first_ques.options[1];
  optC_p.innerHTML = first_ques.options[2];
  optD_p.innerHTML = first_ques.options[3];

  optA.appendChild(optA_p);
  optB.appendChild(optB_p);
  optC.appendChild(optC_p);
  optD.appendChild(optD_p);

  options.appendChild(optA);
  options.appendChild(optB);
  options.appendChild(optC);
  options.appendChild(optD);

  optA.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans == 1) {
        score += 1;
      }
      optA.classList.toggle("active");
      showAns(first_ques.ans);
    }
  });

  optB.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans == 2) {
        score += 1;
      }
      optB.classList.toggle("active");
      showAns(first_ques.ans);
    }
  });

  optC.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans == 3) {
        score += 1;
      }
      optC.classList.toggle("active");
      showAns(first_ques.ans);
    }
  });

  optD.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans == 4) {
        score += 1;
      }
      optD.classList.toggle("active");
      showAns(first_ques.ans);
    }
  });
  card.appendChild(ques);
  card.appendChild(options);
  card.appendChild(next);
  container.appendChild(card);
});
