const JSZip = require("jszip")

var zip = new JSZip();
let imageInput;
var result

window.onload = () =>{
    imageInput = document.getElementById('imageUpload')
    result = document.getElementById('result')
    imageInput.onchange = () => {processImages()}
}

function getDate() {
    let currentdate = new Date(); 
    let datePath =  "processed-images_" + currentdate.getDate() + "-"
    + (currentdate.getMonth()+1)  + "-" 
    + currentdate.getFullYear() + "_"  
    + currentdate.getHours() + "-"  
    + currentdate.getMinutes() + "-" 
    + currentdate.getSeconds();
    return datePath
}

function downloadbutton (file){
    let fileLink = document.createElement('a');
    fileLink.href = URL.createObjectURL(file);
    fileLink.download = file.name;
    fileLink.click();
}

function generateZIP(compImgs) {
    try {
        compImgs.forEach(webpFile => {
            zip.file(webpFile.name, webpFile);
        });
            zip.generateAsync({type:"blob"})
            .then(function (blob) {
                const myZip = new File([blob], getDate()+'.zip', { type: blob.type });
                downloadbutton(myZip)
            });
            result.innerHTML = "All "+ (imageInput.files.length) +" images were successfully processed" 
    } catch (error) {
        result.innerHTML = "Error making the zip. Error: "+error
    }
}

async function processImages(){
    let compImgs = []
        if (imageInput.files.length == 0){result.innerHTML = "no files selected for processing"; return}
        let processCounter = 0
        result.innerHTML = 'Prossesing images... ' + '<span id="counter">'+processCounter+'/'+ imageInput.files.length +'</span>'
        
        for (let index = 0; index < imageInput.files.length; index++) {
            let imgFile = imageInput.files[index]
            let fileName = imgFile.name.substring(0, imgFile.name.lastIndexOf('.')) || imgFile.name
            let image = new Image()
            image.src=URL.createObjectURL(imgFile)
            await image.decode();
            let canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas.getContext('2d').drawImage(image, 0, 0);
            canvas.toBlob((blob) => {
                const imageFile = new File([blob], fileName+'.webp', { type: blob.type });
                compImgs.push(imageFile) 
                if (compImgs.length == imageInput.files.length) generateZIP(compImgs)
                 else{
                    processCounter += 1;
                    result.innerHTML = 'Prossesing images... ' + '<span id="counter">'+processCounter+'/'+ imageInput.files.length +'</span>'
                }
            }, 'image/webp');
        }
}