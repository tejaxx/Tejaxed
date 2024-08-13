const blogTittleFiled = document.querySelector('.title');
const contentField = document.querySelector('.article');

const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', ()=>{
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})


const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = contentField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    contentField.value = contentField.value.slice(0, curPos)+ textToInsert + contentField.value.slice(curPos);
}

let months = ["Jan", "feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', ()=> {
    console.log(1);
    if(contentField.value.length && blogTittleFiled.value.length){
        let letters = "abcdefghijklmnopqrstwuvxyz";
        let blogTitle = blogTittleFiled.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)]
        }
        let docName = `${blogTitle}-${id}`;
        let date = new Date();

        db.collection("blogs").doc(docName).set({
            title: blogTittleFiled.value,
            article: contentField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` 
        })
        .then(()=>{
            location.href = `/${docName}`;
        })
        .catch((err)=>{
            console.error(err);
        })
    }
})

