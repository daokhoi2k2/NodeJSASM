const addLessonElement = $("#addLesson")[0];
const urlVideoElement = $("#urlVideo")[0];
const urlImageElement = $("#urlImage")[0];

const posterFileElement = $("#posterFile")[0];
const videoFileElement = $("#videoFile")[0];

const handleSubmitUpdateForm = (e) => {
	e.preventDefault();
	const btnElement = $("#updateBtn")[0];
	const btnTextElement = $("#updateBtn-text")[0];
	const btnHandlingElement = $("#updateBtn-Handling")[0];
	fakeLoading(btnElement, btnHandlingElement, btnTextElement);
	e.target.submit();
};

const handleChangePoster = (e) => {
	urlImageElement.value = e.target.files[0].name;
};

const handleChangeVideo = (e) => {
	urlVideoElement.value = e.target.files[0].name;
};

addLessonElement.addEventListener("submit", handleSubmitUpdateForm);
posterFileElement.addEventListener("change", handleChangePoster);
videoFileElement.addEventListener("change", handleChangeVideo);
