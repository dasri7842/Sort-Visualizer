/*
*  Author @Dasari srinivas
*  Email : dasarisrinivas7842@gmail.com
*/



// DOM things.
const generate_new=document.getElementById("new-array"); // generate button.
const array_size=document.getElementById("size-array"); // desired array size.
const space=document.getElementById("array-space"); // space for the bars.
const run_algo=document.getElementById("run-button"); // run algorithm button.
const skip=document.getElementById("skip-button"); // Abort algorithm button.
const selected_algo=document.getElementById("algo"); // selected option.
const req_speed=document.getElementById("speed"); // speed required for every swap.


// DOM things for run-time details
const Asize=document.getElementById("Asize");
const Aspeed=document.getElementById("Aspeed");

// Global Variables needed for sorting and Visualizer.
const bar_len=[]; // array elements height.
const bar_div=[]; // corresponding div.
const setting=[generate_new, array_size, run_algo, selected_algo, req_speed];
var total_size=array_size.value;  // array size.
var delay=10; // required speed .
var totdelay=0; //total current delay required to animate a div element(bar). 
var cleartimeout; //skip button functionality




// event Listener.
generate_new.addEventListener("click",generate_new_array);
array_size.addEventListener("input",generate_new_array);
req_speed.addEventListener("input",change_speed);
run_algo.addEventListener("click",runalgo);
window.onload=generate_new_array;

$(document).ready(function() {
   // opens the nav list as default.
   if(window.innerWidth<992) $('.navbar-collapse').collapse('show'); 
   if(window.innerWidth<400) $('#logo').hide();
});
function generate_new_array(){
   space.innerHTML="";
   total_size=array_size.value;
   Asize.innerHTML="Size ("+total_size+")";
   change_speed();
   for(let i=0;i<total_size;i++){
      bar_len[i] = Math.floor(Math.random()*560+20);
      bar_div[i] = document.createElement("div");
      space.appendChild(bar_div[i]);
      apply_style(bar_div[i],"skyblue",bar_len[i]);
   }
}

function change_speed(){
   Aspeed.innerHTML="Animation (" + Math.pow(2,parseInt(req_speed.value)) + "X)";
   delay=20000/(total_size*Math.pow(2,parseInt(req_speed.value)));
}
// changes the color or height of the div element with some time out.
function update_bar (element,color,height) {
   cleartimeout=setTimeout(()=>{
      if(total_size<=13)element.innerHTML= "<small >"+ height + "</small>";
   element.style=" margin : 0.8px; " + "background-color:" + color + ";"+ "width: 100%;" + "height: " + height + "px; text-align: center;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;";
   },totdelay+=delay);
}

// style=color: black; text-align: center; text-overflow: ellipsis;
// changes the color or height of the div element.
function apply_style(element,color,height) {
   if(total_size<=13)element.innerHTML= "<small >"+ height + "</small>";
   element.style=" margin : 0.8px; " + "background-color:" + color + ";"+ "width: 100%;" + "height: " + height + "px; text-align: center;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;";
}

skip.addEventListener("click",()=>{
   // clearTimeout(cleartimeout); Not working.
   location.reload();
});
// speed of animation by changing delay inversely

function disable(){
   for(let i=0;i<5;i++){
      setting[i].style="opacity: 0.3;pointer-events: none;";
   }   
   $('.navbar-collapse').collapse('hide'); 
}

function enable(){
   window.setTimeout(function(){
      for(let i=0;i<5;i++){
         setting[i].style="opacity: 1;pointer-events: all;";
      }  
      if(window.innerWidth<992) $('.navbar-collapse').collapse('show'); 
   },totdelay+=delay);  
}

// swap utility function . makes red before swap .
function swap(id1, id2, col1, col2){
   update_bar(bar_div[id1],"red",bar_len[id1]);
   update_bar(bar_div[id2],"red",bar_len[id2]);
   [bar_len[id1], bar_len[id2]] = [bar_len[id2], bar_len[id1]];
   update_bar(bar_div[id1],col1,bar_len[id1]);
   if(id1!=id2) update_bar(bar_div[id2],col2,bar_len[id2]);
}

function runalgo(){
   totdelay=0;
   disable();
   // var canSee = $("#collapsibleNavId").is(":visible");
   // alert(canSee);
   // $('.navbar-toggler').click();
   switch (selected_algo.value) {
      case "bubble" : 
         Bubble();
         break;
      case "merge" :
         Merge();
         break;
      case "quick" :
         Quick();
         break;
      case "selection" :
         SelecTion();
         break;
      case "heap" :
         Heap();
         break;
      case "insertion" :
         Insertion();
         break;
      case "count" :
         Count();
         break;
   }
   enable();
}

