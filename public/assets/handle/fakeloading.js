const fakeLoading = (elementBtn, elementHandling, elementText) => {
    elementBtn.disabled = true;
    elementHandling.style.display = "block";
    elementText.style.display = "none";
}