/****************
Tonyz.js is made by Antoine Beaulieu Savard
Tonyz.js is an object full of methods to help creating canvas based applications/games in js

To use Tonyz.js you will have to link it to your main file before any scripts like so:
<script src="tonyz.js"></script>

To access most of Tonyz.js methods you will have to use the canvas method like so:
tz.canvas([Your width],[Your height])

In order to use tz to it's full potential please read the comments down below to understand them

Making a loop:
Create your loop function in your script
Then call tz.loop(name,fps) //name=name of the loop function in a string,fps=frames per second

Using canvas:
tz.canvas(200,100);//Create a 200 by 100 canvas
tz.resize(600,600);//Destroy then create a 600 by 600 canvas
tz.bg("red");//Draw the background color to red

Drawing rectangle that moves:
tz.canvas(100,100);//Creates the canvas
var x=0;//Create a basic variable
function gameLoop(){
    tz.bg("black");//Create a black background
    x++;//Increment the variable
    if(x>tz.w){//If the variable is outside the canvas
        x=-10;//Put the variable to -10
    }
    tz.rect(x,0,10,100,"white")//draw a white rectangle
}
tz.loop("gameLoop",60)//Make the gameLoop function repeatable every 60th of a second

Moving the rectangle with the arrow keys:
Inside the gameLoop function:
function gameLoop(){
    tz.bg("black");//Create a black background
    if(tz.key[37]==1){ //if the left key is down
        x--; //decrement x
        if(x<0){ //if x is smaller than 0
            x=tz.w-10; //x is equal to the width-10
        }
    }
    if(tz.key[39]==1){// if the right key is down
        x++; //increment x
        if(x>tz.w-10){ // if x is bigger than the width-10
            x=0;//x is equal to 0
        }
    }
    tz.rect(x,0,10,100,"white")//draw a white rectangle
}

Drawing an object:
var object={//creating an object
    x:50,
    y:50,
    w:50,
    h:50,
    img:tz.img(src)//creating the image
}
tz.canvas(100,100);//creating canvas
tz.call("draw",10)//calling a function with a 10 milisecond delay (so it can load)
function draw(){//function called after 10 milisecond
    tz.draw(object);//drawing the object
}

Template for html file:
<html>
    <head>
        <meta charset="utf-8">
        <title>Title</title>
        <style>
            canvas{
                border: 1px solid black;
            }
        </style>
    </head>
    <body>
        
        <script src="tonyz.js"></script>
        <script>
        
            
            
        </script>
    
    </body>
</html>


/****************/

//Main object
var tz={
    //The canvas
    can:undefined,
  //Canvas parent id
    canId:undefined,
    //The 2d context of the canvas
    ctx:undefined,
    //The width of the canvas
    w:undefined,
    //The height of the canvas
    h:undefined,
    //keys currently down
    key:new Array(),
    //mouse events
    mouse:false,
    mouseX:0,
    mouseY:0,
    //loop controls
    pause:false,
    stop:false,
    loopObject:null,
    //loop attributes
    frames:0,
    fps:0,
    sec:0,
    //font
    ft:"18px Arial",
    //The main method to create a canvas
    canvas:function(w,h,id){
        this.can = document.createElement("canvas");
        this.can.id = "can";
        this.can.width=w;
        this.can.height=h;
        this.w=w;
        this.h=h;
      
      if(id!=undefined){
        tz.canId=id;
        tz.id(id).appendChild(this.can);
      }else{
         document.body.appendChild(this.can);
      }
        this.ctx=can.getContext("2d");
    },
    //Deleting then recreating a new canvas with a new width/height
    resize:function(w,h){
        this.can.parentNode.removeChild(this.can);
        this.can = document.createElement("canvas");
        this.can.id = "can";
        this.can.width=w;
        this.can.height=h;
        this.w=w;
        this.h=h;
      
       if(tz.canId!=undefined){
        tz.id(tz.canId).appendChild(this.can);
      }else{
         document.body.appendChild(this.can);
      }
        this.ctx=can.getContext("2d");
    },
    //Changing the fill color of the 2d context of the canvas, either as a string or as an array
    color:function(c){
        if(c!=undefined){
            if(Array.isArray(c)){
                
                if(c.length==3){//rgb
                    this.ctx.fillStyle="rgb("+c[0]+","+c[1]+","+c[2]+")";
                    this.ctx.strokeStyle="rgb("+c[0]+","+c[1]+","+c[2]+")";
                }else if(c.length==4){//rgba
                    this.ctx.fillStyle="rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
                    this.ctx.strokeStyle="rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
                }
            }else{
                this.ctx.fillStyle=c;
                this.ctx.strokeStyle=c;
            }
        }
    },
    
    
    //Drawing a color all accross the canvas
    bg:function(c){
        this.color(c)
        this.ctx.fillRect(0,0,this.w,this.h);
    },
    //Drawing a rectangle
    rect:function(x,y,w,h,c,outlineW,outlineColor,outlineOnly,outlineOutside){
        this.color(c)
        this.ctx.fillRect(x,y,w,h);
    },
    //Drawing a line
    line:function(x1,y1,x2,y2,w,c){
        this.color(c);
        this.ctx.lineWidth=w;
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    },
    //Drawing a shape
    shape:function(arr,w,c){
        this.color(c);
        this.ctx.lineWidth=w;
        this.ctx.beginPath();
        this.ctx.moveTo(arr[0].x,arr[0].y)
        for(var i=1;i<arr.length;i++){
            this.ctx.lineTo(arr[i].x,arr[i].y)
        }
        this.ctx.lineTo(arr[0].x,arr[0].y);
        this.ctx.stroke();
    },
    //Drawing text
    text:function(string,x,y,c){
        this.color(c);
        this.ctx.fillText(string,x,y);
    },
    //Setting the font
    font:function(fontName,size,c){
        this.color(c);
        this.ctx.font=size+"px "+fontName;
    },
    //rotate
    rotate:function(x,y,w,h,deg){
        //todo maybe
    },
    //scale
    scale:function(w,h){
        this.ctx.scale(w,h);
    },
    //create a image
    img:function(src){
        var img=new Image();
        img.src=src;
        return img;
    },
    //create a sound
    audio:function(src){
        var audio=new Audio();
        audio.src=src;
        return audio;
    },
    //draw image
    draw:function(img,x,y,w,h){
        if(img.img!=undefined){
            this.ctx.drawImage(img.img,img.x,img.y,img.w,img.h)
        }else{
            this.ctx.drawImage(img,x,y,w,h);
        }
        
    },
    
    
    
    //Start looping a function with a frame per second rate
    loop:function(name,fps,obj){
        if((window[name]!=undefined && typeof window[name] == 'function') || (window[obj][name]!=undefined && typeof window[obj][name] == 'function')){
            //start looping
            this.fps=fps;
            this.frames=0;
            if(obj!=undefined){
              this.loopObject=self.setInterval(function(){tz.mainLoop(name,obj)},1000/fps)
            }else{
              this.loopObject=self.setInterval(function(){tz.mainLoop(name)},1000/fps)
            }
            
        }else{
            //Possible error
            console.log("Tonyz Error: No functions with the name '"+name+"' or '"+name+"' is not a function.");
        }
    },
    //Start looping a function with a frame per second rate
    call:function(name,ms){
        if(window[name]!=undefined && typeof window[name] == 'function'){
            //start looping
            setTimeout(window[name],ms)
        }else{
            //Possible error
            console.log("Tonyz Error: No functions with the name '"+name+"' or '"+name+"' is not a function.");
        }
    },
    mainLoop:function(name,obj){
        //if tz.stop==true, remove the setInterval
        if(this.stop){
            window.clearInterval(this.loopObject);
            this.loopObject=null;
        }
        //main loop
        //if tz.pause==true, pause the function calling
        if(!this.pause){
            if(obj!=undefined){
              window[obj][name]();
            }else{
              window[name]();
            }
            
            //frames++
            if(this.frames<this.fps-1){
                this.frames++;
            }else{
                this.frames=0;
                this.sec++;
            }
        }
    },
    
    
    
    
    
    //Independant functions (can be used outside of canvas)
    //Get the id of an html element
    id:function(i){
        return document.getElementById(i);
    },
    //Get class name
    class:function(c){
        return document.getElementsByClassName(c);
    },
    //Math functions
    //Get a random number
    ran:function(min,max){
        return Math.floor(Math.random()*((max+1)-min))+min
    },
    //if xy is in these numbers
    in:function(num,min,max){
        return num>=min && num<=max;
    },
    //Create an array of arrays
    matrix:function(w,h){
        var mat=new Array(h);
        for(var i=0;i<mat.length;i++){
            mat[i]=new Array(w);
            for(var j=0;j<mat[i].length;j++){
                mat[i][j]=0;
            }
        }
        return mat;
    },
    //Ob=object
    //Xy=coordinates
    //Basic 2d collision test using objects attributes x, y, width and height
    colOb:function(a,b){
        if(a.x+a.w>b.x && a.x<b.x+b.w && a.y+a.h>b.y && a.y<b.y+b.h ){
            return true;
        }
    },
    //Basic 2d collision test using coordinates x, y, width and height
    colXy:function(x1,y1,w1,h1,x2,y2,w2,h2){
        if(x1+w1>x2 && x1<x2+w2 && y1+h1>y2 && y1<y2+h2 ){
            return true;
        }
    },
    //Basic distance calculator using objects attributes x, y
    distOb:function(a,b){
        return Math.sqrt( Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2) );
    },
    //Basic distance calculator using coordinates x, y
    distXy:function(x1,y1,x2,y2){
        return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
    },
    //Angle between objects in degrees 360/0 starts at the left
    degOb:function(a,b){
        var ang=Math.abs(Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI + 180); 
        if(ang<0){ang+=360}
        return ang;
    },
    //Angle between objects in degrees 360/0 starts at the left
    degXy:function(x1,x2,y1,y2){
        var ang=Math.abs(Math.atan2(y2-y1,x2-x1)*180/Math.PI + 180);
        if(ang<0){ang+=360}
        return ang;
    },
    
}

//automatic key recognition

document.onkeydown = function(e){
    tz.key[e.keyCode]=1;
}

document.onkeyup = function(e){
    tz.key[e.keyCode]=0;
}

document.onmousemove=function(e){
  tz.mouseX=e.clientX;
  tz.mouseY=e.clientY;
}

document.onmousedown=function(e){
  tz.mouse=true;
}

document.onmouseup=function(e){
  tz.mouse=false;;
}