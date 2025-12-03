const canvas = document.getElementById('canvas_amelie');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cos = Math.cos;
let sin = Math.sin;
class Root {
    constructor(x,y){
        this.x           = x ;
        this.y           = y;
        this.speedX      = Math.random()*2 - 1;
        this.speedY      = Math.random()*2 - 1;
        this.maxSize     = Math.random()*2.2 + 0;
        this.size        = Math.random() + 0.2;
        this.sizeSpeed   = Math.random()*0.1 + 0.05;
        this.angleX      = Math.random()*6.2;
        this.angleXSpeed = Math.random()*0.6 - 0.3;
        this.angleY      = Math.random()*6.2;
        this.angleYSpeed = Math.random()*0.6 - 0.3;
        this.lightness   = 25; 
        
    }
    update(){
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.sizeSpeed;
        this.angleX += this.angleXSpeed;
        this.angleY += this.angleYSpeed;
        if (this.angle > 6.28) { this.angle = 0;}
        if (this.lightness < 70) {this.lightness += 5;}
        if (this.size < this.maxSize){
            ctx.beginPath();
            ctx.arc(this.x , this.y, 3/this.size,0,Math.PI*2)
            ctx.fillStyle = `hsl(140,70%,${this.lightness}%)`;
            ctx.fill();
            ctx.strokeStyle = `hsl(140,70%,${1000/this.lightness}%)`;
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this))
        }
         else{
             const flower = new Flower(this.x , this.y , this.size);
             flower.grow();
         }
    }
}
let flowerImg = new Image();
flowerImg.src = "assets/flowers.png";
let flowerImg2 = new Image();
flowerImg2.src = "assets/flower.png";
let flowers=[flowerImg,flowerImg2]
let scale = Math.min(canvas.width/1016,canvas.height/980)
class Flower {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size*3;
        this.sizeSpeed = Math.random()*0.4+0.2;
        this.maxFlowerSize = this.size + Math.random()*25;
       // this.image = flowerImg;
        this.image = flowers[Math.floor(Math.random()*2)];
        this.willFlower = null;

        if (this.size > 6 ){ this.willFlower = true } else {this.willFlower = false};
    }
    grow(){
        if (this.willFlower && this.size < this.maxFlowerSize){
            this.size += this.sizeSpeed;
            ctx.drawImage(this.image,this.x-this.size*0.5, this.y-this.size*0.5,this.size*scale, this.size*scale);
            requestAnimationFrame(this.grow.bind(this));
        }

    }
}

function X(t){
    return canvas.width/2+(-81*cos(1*t)-6*cos(2*t)-19*cos(3*t)+16*cos(4*t)-3*cos(5*t)-12*cos(6*t)-10*cos(7*t)-11*cos(8*t)-15*cos(9*t)+12*cos(10*t)-13*cos(11*t)+8*cos(12*t)
    -cos(13*t)+5*cos(14*t)-7*cos(15*t)-cos(16*t)-cos(17*t)-3*cos(18*t)-4*cos(19*t)+cos(20*t)-2*cos(21*t)-cos(22*t)-3*cos(23*t)+cos(24*t)-3*cos(25*t)-cos(29*t)+ cos(30*t)
)*scale*3
}

function Y(t){
    return  canvas.height/2+(-2*cos(1*t)+23*cos(2*t)-11*cos(3*t)-24*cos(4*t)-6*cos(5*t)+11*cos(6*t)+4*cos(7*t)+6*cos(8*t)-6*cos(9*t)+4*cos(10*t)+12*cos(11*t)+3*cos(12*t)+
    4*cos(13*t)+2*cos(14*t)+5*cos(15*t)+2*cos(17*t)+3*cos(19*t)+cos(20*t)+cos(21*t)+cos(22*t)+cos(23*t)-cos(24*t)-cos(26*t)-cos(30*t))*scale*3
}
let lastTime = 0;
let dt = 0;
function draw(timestamp){
    
    if (timestamp < 31400 )   
    {
        let t = timestamp/10000;
        for (let i = 0; i < 2; i++){
            ctx.beginPath(); // Start a new path
            ctx.moveTo(X(t) , Y(t)); // Move the pen to (30, 50)
            ctx.lineTo(X(t+1/10000) , Y(t+1/10000)); // Draw a line to (150, 100)
            ctx.stroke();
            
            if (Math.random()<0.15){
                const root = new Root(X(t) , Y(t));
                root.update();
            } 
        }
        requestAnimationFrame(draw); 
    }
    
}


draw(0)
