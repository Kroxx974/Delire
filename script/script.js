const canvas = document.getElementById('canvas');
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
        this.maxSize     = Math.random()*2.5 + 0.5;
        this.size        = Math.random()*1 + 0.2;
        this.sizeSpeed   = Math.random()+0.15;
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
flowerImg.src = "assets/rose.png";
let flowerImg2 = new Image();
flowerImg2.src = "assets/rose.png";
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
    return canvas.width/2+(-79.7*cos(t)+6.6*cos(2*t)-6.1*cos(3*t)+5*cos(4*t)+6.4*cos(5*t)+14.4*cos(6*t)+5.9*cos(7*t)-8.3*cos(9*t)+9.4*cos(10*t)
                           -2.9*cos(11*t)-9*cos(12*t)-4*cos(13*t)-1.3*cos(17*t)-2.8*cos(19*t)+2.6*cos(20*t)-3.9*cos(21*t)+2.8*cos(22*t)+1.4*cos(24*t)-1.1*cos(25*t))*scale*3
}

function Y(t){
    return  canvas.height/2+(-20.8*cos(t)-7.3*cos(2*t)+11.7*cos(3*t)+22.1*cos(4*t)+4.4*cos(5*t)-6.5*cos(6*t)-14.3*cos(7*t)-5.3*cos(8*t)-6*cos(9*t)
-15.7*cos(10*t)-3.7*cos(11*t)-2.9*cos(12*t)-6.7*cos(13*t)+8.1*cos(14*t)-5.4*cos(15*t)-3.2*cos(17*t)+2.6*cos(18*t)-2.3*cos(19*t)
+1.7*cos(20*t)-cos(23*t)-1.5*cos(24*t)-1.7*cos(26*t)+1.3*cos(27*t)-1.4*cos(28*t)-1.3*cos(30*t)-cos(32*t)-1.1*cos(36*t)-cos(38*t))*scale*3
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
