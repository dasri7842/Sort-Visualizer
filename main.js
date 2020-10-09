// DOM things.
const generate_new=document.getElementById("new-array"); // generate button.
const array_size=document.getElementById("size-array"); // desired array size.
const space=document.getElementById("array-space"); // space for the bars.
const run_algo=document.getElementById("run-button"); // run algorithm button.
const selected_algo=document.getElementById("algo"); // selected option.
const req_speed=document.getElementById("speed"); // speed required for every swap.


// Variables needed for sorting and Visualizer.
const bar_len=[]; // array elements height.
const bar_div=[]; // corresponding div.
var total_size=array_size.value;  // array size.
var delay=10; // required speed .
var totdelay=0; //total current delay required to animate a div element(bar). 


// event Listener.
generate_new.addEventListener("click",generate_new_array);
array_size.addEventListener("input",generate_new_array);
req_speed.addEventListener("input",change_speed);
run_algo.addEventListener("click",runalgo);
window.onload=generate_new_array;



// changes the color or height of the div element with some time out.
update_bar = (element,color,height) => window.setTimeout(()=>{
   element.style=" margin : 0.8px; " + "background-color:" + color + ";"+ "width: 100%;" + "height: " + height + "px;"
},totdelay+=delay);


// changes the color or height of the div element.
apply_style = (element,color,height) => element.style=" margin : 0.8px; " + "background-color:" + color + ";"+ "width: 100%;" + "height: " + height + "px;"


// speed of animation by changing delay inversely
function change_speed(){
   delay=20000/(total_size*Math.pow(2,parseInt(req_speed.value)));
}

function disable(){
   
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
   // enable;
}

function generate_new_array(){
   space.innerHTML="";
   total_size=array_size.value;
   change_speed();
   for(let i=0;i<total_size;i++){
      bar_len[i] = Math.floor(Math.random()*600+5);
      bar_div[i] = document.createElement("div");
      space.appendChild(bar_div[i]);
      apply_style(bar_div[i],"skyblue",bar_len[i]);
   }
}