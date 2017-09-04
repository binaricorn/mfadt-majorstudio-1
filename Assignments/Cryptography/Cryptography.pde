import java.util.Collections;

PImage input;
int cellWidth = 1;
int imgWidth = 600;
int imgHeight = 490;

ArrayList<PGraphics> cells = new ArrayList();
ArrayList<PGraphics> encrypted = new ArrayList();

void setup() {
	size(620, 620);
	input = loadImage("in.jpeg");
	// draw src
	// image(input, 10, 10, imgWidth, imgHeight);
	// create key array that determines shuffling later
	ArrayList<Integer> keys = new ArrayList();
	for (int i = 0; i < imgWidth/cellWidth; ++i) {
		keys.add(i);
	}
	// reorder cells list randomly and save order as a key
	// (this will become the secret decryption key)
	Collections.shuffle(keys);
	// join indexes to create one key string
	String key = "$";
	for (int i = 0; i < keys.size(); ++i) {
		String t = keys.get(i).toString();
		key = key + ":" + t;
	}
	// print private key to be shared between sender/receiver
	println(key);
	// load source into array
	for (int i = 0; i < imgWidth/cellWidth; ++i) {
		// load cell into buffer object
		PGraphics cell = createGraphics(cellWidth,imgHeight);
		cell.beginDraw();
			cell.background(255);
			cell.image(input,-i*cellWidth,0);
		cell.endDraw();
		cells.add(cell);
	}

	// build output image
	PGraphics output = createGraphics(imgWidth,imgHeight);
	output.beginDraw();
	output.background(255);
	for (int i = 0; i < keys.size(); ++i) {
		int pos = keys.get(i);
		output.image(cells.get(pos), i*cellWidth, 0);
	}
	output.endDraw();
	image(output, 10,10);
}