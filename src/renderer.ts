import { evaluateExpression, solveLinear, solveQuadratic, solveCubic, ruleOfThree } from "./math";

window.addEventListener("DOMContentLoaded",()=>{
  const display = document.getElementById("display") as HTMLInputElement;
  const buttons = document.querySelectorAll("button[data-value]");
  const linearBtn = document.getElementById("linear-btn")!;
  const quadBtn = document.getElementById("quadratic-btn")!;
  const cubicBtn = document.getElementById("cubic-btn")!;
  const rule3Btn = document.getElementById("rule3-btn")!;
  const themeToggle = document.getElementById("theme-toggle")!;
  const body = document.body;

  buttons.forEach(btn=>btn.addEventListener("click",()=>{
    const val = (btn as HTMLButtonElement).dataset.value!;
    if(val==="C") display.value="";
    else if(val==="=") display.value=evaluateExpression(display.value);
    else display.value+=val;
  }));

  window.addEventListener("keydown",(e)=>{
    if(/[\d+\-*/.=]/.test(e.key)){
      if(e.key==="="||e.key==="Enter") display.value=evaluateExpression(display.value);
      else display.value+=e.key;
    } else if(e.key.toLowerCase()==="c") display.value="";
  });

  linearBtn.addEventListener("click",()=>{
    const a=parseFloat(prompt("Enter a:")!);
    const b=parseFloat(prompt("Enter b:")!);
    display.value=solveLinear(a,b);
  });

  quadBtn.addEventListener("click",()=>{
    const a=parseFloat(prompt("Enter a:")!);
    const b=parseFloat(prompt("Enter b:")!);
    const c=parseFloat(prompt("Enter c:")!);
    display.value=solveQuadratic(a,b,c);
  });

  cubicBtn.addEventListener("click",()=>{
    const a=parseFloat(prompt("Enter a:")!);
    const b=parseFloat(prompt("Enter b:")!);
    const c=parseFloat(prompt("Enter c:")!);
    const d=parseFloat(prompt("Enter d:")!);
    display.value=solveCubic(a,b,c,d);
  });

  rule3Btn.addEventListener("click",()=>{
    const a=parseFloat(prompt("Enter a:")!);
    const b=parseFloat(prompt("Enter b:")!);
    const c=parseFloat(prompt("Enter c:")!);
    display.value=ruleOfThree(a,b,c).toString();
  });

  themeToggle.addEventListener("click",()=>{
    body.setAttribute("data-theme", body.getAttribute("data-theme")==="light"?"dark":"light");
  });
});
