let score = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const car_img = document.getElementById("car");
const wall_img = document.getElementById("wall");
const background_img = document.getElementById("background");






function Car(x, y){
    this.x = x;
    this.y = y;
    this.changeX = 0;
    this.image = car_img;
    this.width = 63;
    this.height = 128;
    this.angle = 0;
    this.draw = function(){
        this.x += this.changeX;
        if(this.x <= 0){
            this.x = 0;
        }
        if(this.x + this.width >= canvas.width){
            this.x = canvas.width - this.width;
        }
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

let car = new Car(canvas.width / 2, 340);

let wall = {
    x: canvas.width / 2,
    y: 0,
    width: 140,
    height: 26,
    image: wall_img,
    changeY: 2,
    draw() {
        this.y += this.changeY;
        if(this.y >= canvas.height){
            this.y = 0;
            this.x = Math.random() * (canvas.width - this.width - 60) + 30;
            score += 1;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


function collision(car, wall){
    if(car.x + car.width > wall.x && wall.x + wall.width > car.x && wall.y + wall.height > car.y){
        return true;
    }
    return false;
}

let raf;

function update(){
    if(collision(car, wall)){
        window.cancelAnimationFrame(raf);
        return false;
    }
    ctx.drawImage(background_img, 0, 0, canvas.width, canvas.height);
    ctx.font = "40px sans-serif";
    ctx.fillText(score, 100, 40);
    car.draw();
    wall.draw();
    raf = window.requestAnimationFrame(update);
}

update();

window.addEventListener("keydown", keypress);
window.addEventListener("keyup", keyrelease);


function keyrelease(e){
    if(e.keyCode == 37 || e.keyCode == 39){
        car.changeX = 0;
        car.angle = 0;
    }
}

function keypress(e){
    if(e.keyCode == 39){
        car.changeX = 3;
        car.angle = 0.4;
    }
    if(e.keyCode == 37){
        car.changeX = -3;
        car.angle = -0.4;
    }
}

