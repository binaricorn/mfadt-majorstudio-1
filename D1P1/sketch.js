var button;

function setup() {

    // create canvas
    createCanvas(1680, 862);

    button = createButton('Click me');
    button.position(width / 2 - 50, height / 2);
    button.mousePressed(surprise);
    button.parent("buttons");
}

function surprise() {
    button.addClass("hidden");
}