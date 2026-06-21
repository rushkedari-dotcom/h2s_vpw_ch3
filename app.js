
let carbon=1250,budget=100000,esg=50;
const done={anna:0,lukas:0,sophie:0};

const data={
anna:[
['Cold Room Failure','Cold Room #3 reached 8°C. €45,000 seafood inventory at risk.',['Battery Backup',-80,-5000,10],['Diesel Generator',120,-2000,-5]],
['Energy Spike','Energy consumption increased 35% overnight.',['Install Smart Sensors',-100,-6000,12],['Ignore For A Week',80,0,-5]],
['Cooling Upgrade','Quarterly sustainability investment available.',['Solar Cooling Upgrade',-120,-10000,15],['Delay Upgrade',50,0,-5]]
],
lukas:[
['Festival Demand Surge','Orders increased 38% before a city festival.',['Route Optimization Program',-110,-3000,12],['Rent Extra Diesel Trucks',140,-6000,-5]],
['Fuel Price Shock','Diesel costs increased 25%.',['Hybrid Fleet Pilot',-80,-5000,10],['Continue Diesel Operations',90,0,-5]],
['Road Closure','Major delivery route blocked.',['Smart Route Replanning',-50,-1000,8],['Emergency Dispatch Fleet',70,-3000,-4]]
],
sophie:[
['Packaging Waste Audit','Plastic packaging waste increased by 23%.',['Reusable Crate Program',-130,-5000,15],['Maintain Current Process',80,1000,-10]],
['Food Waste Handling','500kg dairy products nearing expiry.',['Donate Food To Community',-70,-1000,15],['Send To Landfill',90,0,-12]],
['Supplier Evaluation','Choose next packaging supplier.',['Low Carbon Supplier',-80,-3000,12],['Lowest Cost Supplier',60,1000,-8]]
]
};

let current='';

function startSim(){
const goals=[...document.querySelectorAll('.goal:checked')].map(x=>x.value);
localStorage.setItem('goals',JSON.stringify(goals));
localStorage.setItem('learning',document.getElementById('learning').value);
document.getElementById('sim').style.display='block';
render();
}

function render(){
cards.innerHTML='';
[['anna','❄ Anna'],['lukas','🚚 Lukas'],['sophie','📦 Sophie']].forEach(m=>{
let d=document.createElement('button');
d.innerHTML=m[1]+' ('+(3-done[m[0]])+' left)';
d.onclick=()=>openManager(m[0]);
cards.appendChild(d);
});
if(done.anna==3&&done.lukas==3&&done.sophie==3){
localStorage.setItem('carbon',carbon);
localStorage.setItem('budget',budget);
localStorage.setItem('esg',esg);
dashBtn.style.display='block';
}
}

function openManager(m){
current=m;
let s=data[m][done[m]];
if(!s){title.innerText='Completed';story.innerText='All scenarios completed.';options.innerHTML='';return;}
title.innerText=s[0];
story.innerText=s[1];
options.innerHTML='';
[s[2],s[3]].forEach(o=>{
let b=document.createElement('button');
b.innerText=o[0];
b.onclick=()=>choose(o);
options.appendChild(b);
});
}

function choose(o){
carbon+=o[1]; budget+=o[2]; esg+=o[3];
document.getElementById('carbon').innerText=carbon;
document.getElementById('budget').innerText=budget;
document.getElementById('esg').innerText=esg;
coach.innerText=o[0]+' selected. This decision impacts emissions, cost and sustainability performance.';
done[current]++;
render();
openManager(current);
}
