const canvas = document.getElementById('canvas_amelie');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cos= Math.cos;
let sin = Math.sin;
class Root {
    constructor(x,y){
        this.x           = x ;
        this.y           = y;
        this.speedX      = Math.random()*2 - 1;
        this.speedY      = Math.random()*2 - 1;
        this.maxSize     = Math.random()*2 + 1;
        this.size        = Math.random() + 1;
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
            ctx.fillStyle = 'hsl(140,100%,'+this.lightness+'%)';
            ctx.fill();
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
flowerImg.src = "./assets/flowers.png";
class Flower {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size*3;
        this.sizeSpeed = Math.random()*0.2+0.2;
        this.maxFlowerSize = this.size + Math.random()*20;
        this.image = flowerImg;
        this.willFlower = null;

        if (this.size > 8 ){ this.willFlower = true } else {this.willFlower = false};
    }
    grow(){
        if (this.willFlower && this.size < this.maxFlowerSize){
            this.size += this.sizeSpeed;
            ctx.drawImage(this.image,this.x-this.size*0.5, this.y-this.size*0.5,this.size, this.size);
            requestAnimationFrame(this.grow.bind(this));
        }

    }
}

function X(t){
    return canvas.width/2+(-115*cos(1*t)+2*cos(2*t)-12*cos(3*t)+7*cos(4*t)-6*cos(5*t)+6*cos(6*t)-3*cos(7*t)+3*cos(8*t)
    -cos(9*t)-2*cos(10*t)+4*cos(11*t)+cos(12*t)-2*cos(13*t)+8*cos(14*t)+2*cos(15*t)-cos(16*t)+5*cos(17*t)+2*cos(18*t)
    -cos(19*t)+3*cos(20*t)-cos(21*t)+cos(22*t)-2*cos(23*t)+4*cos(24*t)-2*cos(25*t)+2*cos(26*t)-3*cos(27*t)
    +2*cos(28*t)-cos(29*t)+cos(30*t)-cos(31*t)+cos(32*t)-cos(33*t)+cos(34*t)-cos(35*t)+cos(40*t))*3
}

function Y(t){
    return  canvas.height/2+(11*cos(1*t)+2*cos(2*t)-8*cos(3*t)+7*cos(4*t)-5*cos(5*t)-6*cos(6*t)+6*cos(7*t)-7*cos(8*t)-cos(9*t)+2*cos(10*t)-9*cos(11*t)+cos(12*t)-4*cos(13*t)- 
9*cos(14*t)+5*cos(15*t)-2*cos(17*t)+11*cos(18*t)-2*cos(19*t)-cos(20*t)-2*cos(21*t)+3*cos(22*t)+cos(23*t)+cos(24*t)-cos(25*t)-2*cos(26*t)+3*cos(27*t)-cos(28*t)+ 
cos(29*t)-cos(30*t)+cos(32*t)-cos(34*t)-cos(38*t)+cos(39*t)+cos(41*t)+cos(51*t))*3
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
            
            if (Math.random()<0.1){
                const root = new Root(X(t) , Y(t));
                root.update();
            } 
        }
        requestAnimationFrame(draw); 
    }
    
}


draw(0)
