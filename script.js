let Video=document.getElementById("video1");
let model;
let canvas=document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let w=600;
let h=400;
//canvas.width = w;
 //  canvas.height =h;
const setupCamera = () => {
    navigator.mediaDevices.getUserMedia ({
        video:{width:w, height:h},
        audio : false
    }).then(stream =>{
        Video.srcObject=stream;
     //     let stream_settings = stream.getVideoTracks()[0].getSettings();

    });
};
const detectFaces = async () => {
    const prediction = await model.estimateFaces(Video,false);
    console.log(prediction)
    ctx.drawImage(Video,0,0,w,h);
    prediction.forEach( pred => {
    const start = pred.topLeft;
    const end = pred.bottomRight;
    const size = [end[0] - start[0], end[1] - start[1]];
    // Render a rectangle over each detected face.
    ctx.strokeStyle="red"
    ctx.strokeRect(start[0], start[1], size[0], size[1]);
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(pred.landmarks[2][0], pred.landmarks[2][1]);//nose
    ctx.lineTo(pred.landmarks[0][0], pred.landmarks[0][1]);//reye
    ctx.moveTo(pred.landmarks[2][0], pred.landmarks[2][1]);//nose
    ctx.lineTo(pred.landmarks[1][0], pred.landmarks[1][1]);//leye
    ctx.moveTo(pred.landmarks[2][0], pred.landmarks[2][1]);//nose
    ctx.lineTo(pred.landmarks[5][0], pred.landmarks[5][1]);//lear
    ctx.moveTo(pred.landmarks[2][0], pred.landmarks[2][1]);//nose
    ctx.lineTo(pred.landmarks[3][0], pred.landmarks[3][1]);//mouth
    ctx.moveTo(pred.landmarks[2][0], pred.landmarks[2][1]);//nose
    ctx.lineTo(pred.landmarks[4][0], pred.landmarks[4][1]);//rear
    
    ctx.closePath();
    ctx.stroke();
     ctx.fillStyle = "magenta";
      ctx.beginPath();

    ctx.moveTo(pred.landmarks[0][0], pred.landmarks[0][1]);//reye

    ctx.lineTo(pred.landmarks[1][0], pred.landmarks[1][1]);//leye

    ctx.lineTo(pred.landmarks[5][0], pred.landmarks[5][1]);//lear

    ctx.lineTo(pred.landmarks[3][0], pred.landmarks[3][1]);//mouth

    ctx.lineTo(pred.landmarks[4][0], pred.landmarks[4][1]);//rear
    
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "green";
    pred.landmarks.forEach(e => {
        ctx.fillRect(e[0],e[1],5,5)
    })
    })
   // delete(prediction)
    //console.log(prediction)
}
setupCamera();
Video.addEventListener("loadeddata" , async ()=> {
    model= await blazeface.load();
    setInterval(detectFaces,200);
})

