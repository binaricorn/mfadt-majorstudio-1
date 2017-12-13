import processing.serial.*;
import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;

Serial myPort;
Robot robot;
int[] sensor = {0, 0, 0, 0};
boolean wentUP = false;
boolean wentDOWN = false;


void setup() {
  
  println(Serial.list());
  myPort = new Serial(this, Serial.list()[3], 9600);
  myPort.bufferUntil ('\n');
  try {
    robot = new Robot(); 
  }
  catch (AWTException e) {
    e.printStackTrace();
    exit();
  }
}

void draw() {
  if (sensor[0] == 0) {  
    robot.keyPress(KeyEvent.VK_2);
    robot.keyRelease(KeyEvent.VK_2);
  }
  
  
  if (sensor[1] == 0){
     robot.keyPress(KeyEvent.VK_3);
     robot.keyRelease(KeyEvent.VK_3);
  }
  if (sensor[2] == 0){
     robot.keyPress(KeyEvent.VK_4);
     robot.keyRelease(KeyEvent.VK_4);
     
  }
    if (sensor[3] == 0){
     robot.keyPress(KeyEvent.VK_5);
     robot.keyRelease(KeyEvent.VK_5);
  
  }
}

void serialEvent(Serial myPort) {
  String inString = myPort.readStringUntil('\n');
  inString = trim(inString);
  if (inString != null) {
    String[] parsedSerial = split(inString, ',');
    for (int x = 0; x < 4; x++) {
      sensor[x] = parseInt(parsedSerial[x]);
    }
  } 
}