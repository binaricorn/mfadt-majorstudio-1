const int twoButton = 2;
const int threeButton = 3;
const int fourButton = 4;
const int fiveButton = 5;

void setup() {
  pinMode(twoButton, INPUT_PULLUP);
  pinMode(threeButton, INPUT_PULLUP);
  pinMode(fourButton, INPUT_PULLUP);
  pinMode(fiveButton, INPUT_PULLUP);
  Serial.begin(9600);
  
}

void loop() {
  Serial.print(digitalRead(twoButton));
  Serial.print(",");
  Serial.print(digitalRead(threeButton));
  Serial.print(",");
  Serial.print(digitalRead(fourButton));
  Serial.print(",");
  Serial.println(digitalRead(fiveButton));
}
