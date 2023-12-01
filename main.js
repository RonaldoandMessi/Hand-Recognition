predict_1 = "";
predict_2 = "";
predict_3 = "";
predict_4 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'jpeg',
    jpeg_quality:90
});
camera=document.getElementById("cam");
Webcam.attach(camera);

function snap(){

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capimg" src="'+data_uri+'">';
    })

}

console.log("ml5 version is",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/VVQ3zrN7z/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function speak(){
var synth = window.speechSynthesis; 
var speakdata1 = "The first prediction is"+predict_1;
var speakdata2 = "The second prediction is"+predict_2;
var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
synth.speak(utterThis);

}

function Predict(){
    var img = document.getElementById("capimg");
    classifier.classify(img,gotResult);
}

function gotResult(error,success){
    if (error) {
        console.error(error);
    } 
    else {
       console.log(success);
       document.getElementById("resultemotionname1").innerHTML = success[0].label;
       document.getElementById("resultemotionname2").innerHTML = success[1].label;
       predict_1 = success[0].label;
       predict_2 = success[1].label;
       predict_3 = success[2].label;
       predict_4 = success[3].label;
       speak();
       if (success[0].label == "Super") {
        document.getElementById("resultemoji1").innerHTML = "&#128076;";
       }

       if (success[0].label == "Victory") {
        document.getElementById("resultemoji1").innerHTML = "&#9996;";
       }

       if (success[0].label == "Now") {
        document.getElementById("resultemoji1").innerHTML = "&#128071;";
       }

       if (success[0].label == "Good") {
        document.getElementById("resultemoji1").innerHTML = "&#128077;";
       }

       if (success[1].label == "Super") {
        document.getElementById("resultemoji2").innerHTML = "&#128076;";
       }

       if (success[1].label == "Victory") {
        document.getElementById("resultemoji2").innerHTML = "&#9996;";
       }
       
       if (success[1].label == "Now") {
        document.getElementById("resultemoji2").innerHTML = "&#128071;";
       }

       if (success[1].label == "Good") {
        document.getElementById("resultemoji2").innerHTML = "&#128077;";
       }
    }
}