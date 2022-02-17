const videoFileElement = $("#videoFile")[0];
const posterFileElement = $("#posterFile")[0];

const urlVideoElement = $("#urlVideo")[0];
const urlImageElement = $("#urlImage")[0];

const handleChangeFileVideo = (e) => {
    const fileName = e.target.files[0].name;
    urlVideoElement.value = fileName;
}

const handleChangeFilePoster = (e) => {
    const fileName = e.target.files[0].name;
    urlImageElement.value = fileName;
}

videoFileElement.addEventListener("change", handleChangeFileVideo);
posterFileElement.addEventListener("change", handleChangeFilePoster);
