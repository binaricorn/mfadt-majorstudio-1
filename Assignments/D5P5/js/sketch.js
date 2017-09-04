var button;
var radius;

function setup() {

    // create canvas
    createCanvas(1024, 768);
    w = 40;
    h = 89;
    //Created by Daniel Natoli Rojo from the Noun Project
    img = loadImage("img/woman.png");

    button1 = createButton('Drink me');
    button2 = createButton('Eat me');

    button1.position(100, 80);
    button2.position(250, 80);

    button1.mousePressed(drinkMe);
    button1.parent("buttons");
    button2.mousePressed(eatMe);
    button2.parent("buttons");
}

function draw() {
    image(img, width / 2 - w / 2, height / 2 - h / 2, w, h);
}

function drinkMe() {
    background(255);
    w *= 0.5;
    h *= 0.5;
}

function eatMe() {
    background(255);
    w *= 2;
    h *= 2;
}