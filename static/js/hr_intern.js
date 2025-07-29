function startExam(){
    if(!document.getElementById('term1').checked || !document.getElementById('term2').checked){
        alert("Please accept the terms and conditions.");
        return;
    }

    const dName = document.getElementById('detailName').value.trim();
    const dEmail = document.getElementById('detailEmail').value.trim();
    const dNum = document.getElementById('detailNum').value.trim();

    if(!dName || !dEmail || !dNum){
      alert("Please fill in all required details.");
      return;
    }

    document.getElementById('examTitle').innerText = "HR INTERN EXAM";
    document.getElementById('main-page').style.display="none";
    document.getElementById('intern-exam-page').style.display = "flex";
    document.getElementById('header').style.display = "flex";
    renderQuestion();
    countdown();
}

const questions  = [];

for (let i =0;i<30;i++){
  const question ={
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    options:["option A","option B","option C","option D"],
    selected:null,
    visited:false,
    status:null
  };
  questions.push(question);
}

// console.log(questions);

let current = 0;
let timer = 30*60;
let previous = null;

function renderQuestion(){

  if (previous !== null && previous !== current) {
        const prevQ = questions[previous];

        if (prevQ.visited && prevQ.selected === null) {
            prevQ.status = "unanswered";
        } else if (prevQ.visited && prevQ.selected !== null) {
            prevQ.status = "answered";
        }
    }

  const q = questions[current];
  q.visited = true;

  document.getElementById("question-number").textContent=`Question ${current + 1}:`;
  document.getElementById("question-text").textContent= q.text;

  document.querySelectorAll(".option-box input").forEach((input,index) => {
    input.checked = q.selected === index;
    input.onclick = () => {
      questions[current].selected = index;
      updatePalette();
    };
  });

  updatePalette();
  previous = current;
}

function updatePalette(){
  const  palette = document.getElementById("question-palette");
  palette.innerHTML = "";

  questions.forEach((q,index) =>{
    const btn = document.createElement("button");
    btn.textContent = index + 1;

    if (q.status === "answered"){
      btn.className = "answered";
    }else if (q.status === "unanswered"){
      btn.className = "unanswered";
    }else if(q.visited){
      btn.className = "visited";
    }else{
      btn.className ="not-visited"
    }
    

    btn.onclick= () =>{
      current = index;
      renderQuestion();
      
    };
    palette.appendChild(btn);
  });
}

function prevQuestion(){
  if(current > 0){
    current--;
    renderQuestion();
  }
}

function nextQuestion(){
  if(current <questions.length - 1){
    current++;
    renderQuestion();
  }
}

function saveAndNext(){
  const q = questions[current];

  if(q.selected != null){
    q.status = "answered";
  }else{
    q.status = "unanswered";
  }
 nextQuestion();
}

function confirmSubmit(){
  document.getElementById("submitModal").style.display= "flex";
  document.body.classList.add("modal-active");
}

function closeWindow(){
  document.getElementById("submitModal").style.display = "none";
  document.body.classList.remove("modal-active");
}

function submitTest(){
  alert("Test Submitted!");
  window.location.reload();
}

function countdown(){
  const t = document.getElementById("time");
  const min = String(Math.floor(timer/60)).padStart(2,"0");
  const sec = String(timer %60).padStart(2,"0");
  t.innerHTML = `Time Left: <b> ${min}:${sec}</b>`;

  if(timer > 0){
    timer--;
    setTimeout(countdown,1000);
  }else{
    alert("Time is up! Submitting the quiz.....")
    confirmSubmit();
  }
}

