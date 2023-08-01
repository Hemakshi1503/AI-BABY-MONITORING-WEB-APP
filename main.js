 //in c133
img = "";
objects = [];  //array to hold result
status = "";

function preload(){
}
/*   CocoSsd (Coco Single Shot MultiBox Detection)
This model detects objects defined in the COCO dataset, which has a large-set of objects
for object detection.
After CocoSsd model has detected a image, it returns -
- label for the image
- objects accuracy/confidence
- width and height of the object
- x and y coordinates of the object - meaning where is the object located on the
image
*/

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  }

  function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  }

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  //detect images from picture and store into object using gotresult()
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;  //variable objects contains all result
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "")  
      {
        
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {  //object.length contains number of objects finds in picture
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "Baby Found :"+ objects.length;
    
          fill(r,g,b);  //red color backgound
          percent = floor(objects[i].confidence * 100);  //converts confidence from decimal value to percentage
          //below text() shows object-name, confidence %, x,y
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);  //text() add text on image with width and height
          noFill();  //unset fill() means will keep only red border , not whole red background for rectangle
          stroke(r,g,b);  //give red border color
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
