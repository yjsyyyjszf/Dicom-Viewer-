import { Component, OnInit } from '@angular/core';
import * as  $ from 'jquery';

@Component({
  selector: 'app-task8',
  templateUrl: './task8.component.html',
  styleUrls: ['./task8.component.css']
})
export class Task8Component implements OnInit {

  angle=0;
  constructor() { }

  ngOnInit(): void {
    
    var c =<HTMLCanvasElement> document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#87FF2A";
    ctx.rect(0, 0, 160, 50);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.font = "14px Arial";
    ctx.fillText("Native iliac Rotation:", 20, 20);
    ctx.fillStyle = "black";
    ctx.fillText("19°", 70, 40);
    this.angle=135;
    var self=this;

var radiusCanvas=30;
var canvas4= <HTMLCanvasElement>document.getElementById("canvas4");
var ctx=canvas4.getContext("2d");
var cw=canvas4.width;
var ch=canvas4.height;
document.body.appendChild(canvas4);

function reOffset(){
    var BB=canvas4.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;        
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }
canvas4.onresize=function(e){ reOffset(); }

var shapes=[];
shapes.push( {x:54.162164589012974, y:53.41795618147773, radius:31, color:'black'} );
shapes.push( {x:95.83783541098703, y:96.58204381852227, radius:31, color:'yellow'} );

shapes.push( {x:54.162164589012974, y:53.41795618147773, radius:30, color:'white'} );
shapes.push( {x:95.83783541098703, y:96.58204381852227, radius:30, color:'white'} );

var isDragging=false;
var startX,startY;
var selectedShapeIndex;

drawAll();

canvas4.onmousedown=handleMouseDown;
canvas4.onmousemove=handleMouseMove;
canvas4.onmouseup=handleMouseUp;
canvas4.onmouseout=handleMouseOut;

function isMouseInShape(mx,my,shape){
    if(shape.radius){
        var dx=mx-shape.x;
        var dy=my-shape.y;
        if(dx*dx+dy*dy<shape.radius*shape.radius){
            return(true);
        }
    }else if(shape.width){
        var rLeft=shape.x;
        var rRight=shape.x+shape.width;
        var rTop=shape.y;
        var rBott=shape.y+shape.height;
        if( mx>rLeft && mx<rRight && my>rTop && my<rBott){
            return(true);
        }
    }
    return(false);
}
function handleMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
    startX=parseInt(e.clientX-offsetX);
    startY=parseInt(e.clientY-offsetY);
    for(var i=0;i<shapes.length;i++){
        if(isMouseInShape(startX,startY,shapes[i])){
            selectedShapeIndex=i;
            isDragging=true;
            return;
        }
    }
}

function handleMouseUp(e){
    if(!isDragging){return;}
    e.preventDefault();
    e.stopPropagation();
    isDragging=false;
}
function handleMouseOut(e){
    if(!isDragging){return;}
    e.preventDefault();
    e.stopPropagation();
    isDragging=false;
}
function handleMouseMove(e){
    if(!isDragging){return;}
    e.preventDefault();
    e.stopPropagation();

    var mouseX=parseInt(e.clientX-offsetX);
    var mouseY=parseInt(e.clientY-offsetY);

    var selectedShape=shapes[selectedShapeIndex];
    var unselectedShape1 = shapes[0];
    var unselectedShape2 = shapes[1];
    var unselectedShape3 = shapes[2];
    var unselectedShape4 = shapes[3];

    var cen1= (canvas4.width / 2) ;
    var cen2= (canvas4.height / 2) ;

    var x = mouseX -cen1;
    var y = mouseY - cen2;
    var radians = Math.atan2(y, x)
    x= Math.cos(radians) * radiusCanvas +cen1;
    y= Math.sin(radians) * radiusCanvas + cen2;
     
    var x2= Math.cos(radians) * -radiusCanvas +cen1;
    var y2= Math.sin(radians) * -radiusCanvas + cen2;
  
    selectedShape.x= x;
    selectedShape.y= y;
    

    if (selectedShapeIndex==0)
    {
      unselectedShape2.x= x2;
      unselectedShape2.y= y2;

      unselectedShape3.x= x;
      unselectedShape3.y= y;

      unselectedShape4.x= x2;
      unselectedShape4.y= y2;
    }
    else if (selectedShapeIndex==1){
      unselectedShape1.x= x2;
      unselectedShape1.y= y2;

      unselectedShape3.x= x2;
      unselectedShape3.y= y2;

      unselectedShape4.x= x;
      unselectedShape4.y= y;
    }
    x = mouseX -cen1;
    y = mouseY - cen2;
    var angle = Math.atan2(y, x) * 180 / Math.PI;
    if (angle<0)
    {
    self.angle=-angle;
    }
    else{
      self.angle=360-angle;
      if (self.angle ==360)
      {
        self.angle=0;
      }
    }
    drawAll();
    startX=mouseX;
    startY=mouseY;
}

function drawAll(){
    ctx.clearRect(0,0,cw,ch);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(cw, ch);
    ctx.strokeStyle= "#87FF2A";
    ctx.stroke();
    
    var x=0;
    var y=0;
    var x2=0;
    var y2=0;
    for(var i=0;i<shapes.length;i++){
        var shape=shapes[i];
        if(shape.radius){
          
         ctx.beginPath();
         ctx.arc(shape.x,shape.y,shape.radius,0,Math.PI*2);
         ctx.fillStyle=shape.color;
         ctx.fill();
            if (i==0)
            {
                x= shape.x ;
                y= shape.y;
            }
            if (i==1)
            {
              x2= shape.x ;
              y2= shape.y;
            }
          }
        }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(cw, ch);
    ctx.strokeStyle= "#87FF2A";
    ctx.stroke(); 
    
    ctx.fillStyle = "black";
    ctx.font = "13px Arial";
    ctx.fillText("lpci", x, y); 

    ctx.fillStyle = "yellow";
    ctx.font = "13px Arial";
    ctx.fillText("Cont", x2, y2); 
}

}
first() {
  console.log("First region is clicked");
}
middle() {
  console.log("Second region is clicked");
}
last() {
  console.log("Third region is clicked");
}

}
