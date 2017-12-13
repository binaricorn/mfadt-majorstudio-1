import time
import picamera
import picamera.array
import cv2

from keras.preprocessing import image as image_utils
from imagenet_utils import decode_predictions
from imagenet_utils import preprocess_input
from keras.applications import ResNet50
from Adafruit_PWM_Servo_Driver import PWM
from Naked.toolshed.shell import execute_js
from Naked.toolshed.shell import muterun_js

import numpy as np

def identify_image_cloud(path):
	url = 'http://52.14.215.195:8080/detect'
	files={'data': open(path,'rb')}
	response = requests.post(url, files=files)
	return response.content

def identify_image(path):
    
    return identify_image_cloud(path)

	# all codes below will not be used
    # load the input image using the Keras helper utility while ensuring
    # that the image is resized to 224x224 pxiels, the required input
    # dimensions for the network -- then convert the PIL image to a
    # NumPy array
    print("[INFO] loading and preprocessing image...")
    image = image_utils.load_img(path, target_size=(224, 224))
    image = image_utils.img_to_array(image)

    # our image is now represented by a NumPy array of shape (3, 224, 224),
    # but we need to expand the dimensions to be (1, 3, 224, 224) so we can
    # pass it through the network -- we'll also preprocess the image by
    # subtracting the mean RGB pixel intensity from the ImageNet dataset
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)

    # classify the image
    print("[INFO] classifying image...")
    preds = ai_model.predict(image)
    # (inID, label) = decode_predictions(preds)[0][0]
    (inID, label, prob) = decode_predictions(preds)[0][0]

    # label = "camera"

    # display the predictions to our screen
    print("ImageNet ID: {}, Label: {}, Probability: {}".format(inID, label, prob))

    return label

import subprocess

def speak(text):

    cmd_beg = 'espeak -g30 -s 30 '
    # cmd_end = ' | aplay /home/pi/Desktop/Text.wav  2>/dev/null'  # To play back the stored .wav file and to dump the std errors to /dev/null
    # cmd_out = '--stdout > /home/pi/Desktop/Text.wav '  # To store the voice file

    # Wrap the label into a sentence to say
    textToSay = "I see " + text

    print("**[Voice]**: " + textToSay)

    # Calls the Espeak TTS Engine to read aloud a Text
    #subprocess.call([cmd_beg + text], shell=True)
    p = subprocess.Popen(cmd_beg + textToSay.replace(' ', '_'), shell=True)
    time.sleep(4)
    p.kill()

    return textToSay

def text2morse(text):

    # success = execute_js('text2morse.js')
    response = muterun_js('text2morse.js', text)

    if response.exitcode == 0:
        return response.stdout


def setServoPulse(channel, pulse):

    pulseLength = 1000000                   # 1,000,000 us per second
    pulseLength /= 60                       # 60 Hz
    print "%d us per period" % pulseLength
    pulseLength /= 4096                     # 12 bits of resolution
    print "%d us per bit" % pulseLength
    pulse *= 1000
    pulse /= pulseLength
    pwm.setPWM(channel, 0, pulse)


import requests

def lookupDictionary(content):
    definition = ""

    if " " in content:
        definition = "I cannot lookup more than one word"
    else:
        try:
            response = requests.get("http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" + content).json()
            definition = response["results"][0]["senses"][0]["definition"][0].encode("utf-8")
        except:
            definition = "I do not understand this"

    cmd_beg = 'espeak -ven+f4 -g10 -s 30 '
    p = subprocess.Popen(cmd_beg + definition.replace(' ', '_'), shell=True)
    time.sleep(4)
    p.kill()

    return definition



pwm = PWM(0x40)
# servoMin = 150  # Min pulse length out of 4096
# servoMax = 300  # Max pulse length out of 4096

#Entry point
loop_index = 0

# load the VGG16 network
print("[INFO] loading AI model...")
ai_model = ResNet50(weights="imagenet")

pwm.setPWMFreq(60) 

while True:

    time.sleep(1)
    loop_index += 1

    with picamera.PiCamera() as camera:
        if loop_index % 2 == 1:

            photoPath = '/home/pi/Desktop/pi' + str(time.time()) + '.jpg'

            camera.capture(photoPath)
            print("File saved: " + photoPath)

            label = identify_image(photoPath)

            content_said = speak("a " + label)

            morsecode = text2morse(content_said)
            print("something branch entered")

            for code in morsecode.split(","):
                if code == "0":
                    pwm.setPWM(0, 0, 300)
                    # pwm.setPWM(3, 0, 150)
                    time.sleep(0.25)
                elif code == "1":
                    pwm.setPWM(0, 0, 300)
                    # pwm.setPWM(3, 0, 150)
                    time.sleep(1)
                elif code == "-1":
                    pwm.setPWM(0, 0, 150)
                    # pwm.setPWM(3, 0, 300)
                    time.sleep(0.25)


            print("Another guy is looking up dictionary")
            #********** Run dictionary on another thread **********
            #thread.start_new_thread( lookupDictionary, (label, "Thread-1") )
            #********** Or not **********
            definition = lookupDictionary(label)

            morsecode_for_definition = text2morse(definition)

            #Another servo
            for code in morsecode_for_definition.split(","):
                if code == "0":
                    # pwm.setPWM(0, 0, 200)
                    pwm.setPWM(3, 0, 150)
                    time.sleep(0.25)
                elif code == "1":
                    # pwm.setPWM(0, 0, 200)
                    pwm.setPWM(3, 0, 150)
                    time.sleep(1)
                elif code == "-1":
                    # pwm.setPWM(0, 0, 150)
                    pwm.setPWM(3, 0, 200)
                    time.sleep(0.25)


        else:
            contentSaid = speak('nothing')      

            morsecode = text2morse(contentSaid)
            
            print("nothing branch entered")
            
            # print(morsecode)
            for code in morsecode.split(","):
                if code == "0":
                    pwm.setPWM(0, 0, 200)
                    time.sleep(0.5)
                elif code == "1":
                    pwm.setPWM(0, 0, 200)
                    time.sleep(1.5)
                elif code == "-1":
                    pwm.setPWM(0, 0, 150)
                    time.sleep(0.5)

