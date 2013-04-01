function roundNumber(rnum, rlength) { // Arguments: number to round, number of decimal places
  var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return parseFloat(newnumber); // Output the result to the form field (change for your purposes)
}


function calcDh(PEB, HITB, TOHITB)
{
var k = parseFloat(document.getElementById("k").value);
var x = parseFloat(document.getElementById("x").value);
var angle = parseFloat(document.getElementById("angle").value);
var h = parseFloat(document.getElementById("height").value);
var m = parseFloat(document.getElementById("m").value);
var th = parseFloat(document.getElementById("th").value);
var td = parseFloat(document.getElementById("td").value);
var l = parseFloat(document.getElementById("l").value);


var dexp = parseFloat(document.getElementById("dexp").value);

var rad = Math.PI *angle/180;


var v =0, vh=0, vv=0, t1=0, t2=0, t=0, d=0;
var a = -9.81;

v = Math.sqrt( (k*x*x)/m);

vh = v* Math.cos(rad);
vv = v* Math.sin(rad);

t1 = (-vv + Math.sqrt(vv*vv -4*.5*a*h))/a;
t2 = (-vv - Math.sqrt(vv*vv -4*.5*a*h))/a;

if (t2> t1)
t = t2;
else
t= t1;

d = vh*t;
//d = roundNumber(d, 4);
var dv = vv*t + .5*a*t*t;

window.top.output.document.getElementById("d").innerHTML= "The arrow will travel " + roundNumber(d, 4) +" m."


window.top.output.document.getElementById("vari").innerHTML="Initial velocity: " + roundNumber(v, 4) + " m/s"  
+"<br> Initial vertical velocity: " + roundNumber(vv, 4) + " m/s"
+"<br> Initial horizontal velocity: " + roundNumber(vh, 4) +" m/s"
+ "<br> Total time in air: " + roundNumber(t, 4)  + " s"
+"<br> Total Horizontal Displacement: " +roundNumber(d, 4) +" m"
+ "<br> Total Vertical Displacement: " + roundNumber(dv, 4) +" m"; 

if (HITB==true)
hit(th, td,vh,vv,l,a);
if (PEB==true)
calcPE(d, dexp);
if (TOHITB ==true)
toHit(th, td, rad, k, m, a, angle);
}


function calcPE(accp, test){
var PE = ((accp -test)/ accp)*100;
if (PE <0)
PE = PE *-1;

PE = roundNumber(PE, 4);
window.top.output.document.getElementById("percerr").innerHTML="Percent Error: " + PE + " %";
}

function hit(th, td, vh, vv, l, a)
{
var time, height; 
time = td/vh;
time = roundNumber(time, 5);
height = -1*(time*vv + .5*a*time*time);
l = roundNumber(l, 4);
height = roundNumber(height, 4);
window.top.output.document.getElementById("targ").innerHTML="time "+  time + "<br> height " + height + "<br> length " +l +"<br> " ;

if( th >= height && th -height <l )
window.top.output.document.getElementById("targ").innerHTML= "The arrow hit the target.";
else if (  height>th && height - th <l)
window.top.output.document.getElementById("targ").innerHTML= "The arrow hit the target.";
else
window.top.output.document.getElementById("targ").innerHTML= "The arrow did not hit the target.";


}

function toHit(th, td, rad, k, m, a, angle)
{
var v=0, x =0;
v = (td*td *a)/ (2* Math.cos(rad) * (th-td));
x = Math.sqrt((v*v*m)/k);

x = roundNumber(x, 4);

window.top.output.document.getElementById("tohit").innerHTML= "To hit a target " + td + " meters away and " + th + " meters high shoot an arrow" 
+ "at an angle of " + angle  + " and pull the bow back " + x + " meters." 
}