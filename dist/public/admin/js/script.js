// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  console.log(showAlert);
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const closeImagePreview = uploadImage.querySelector("[close-image-preview]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);

      if (image) {
        uploadImagePreview.src = image;
        closeImagePreview.innerHTML = "x";
        closeImagePreview.classList.add("close-preview");

        closeImagePreview.addEventListener("click", () => {
          closeImagePreview.classList.remove("close-preview");
          closeImagePreview.innerHTML = "";
          uploadImagePreview.src = "";
          uploadImageInput.value = "";
        });
      }
    }
  });
}
// End Upload Image

// Upload Audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");

  uploadAudioInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const audio = URL.createObjectURL(e.target.files[0]);

      const source = uploadAudioPlay.querySelector("source");
      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}
// End Upload Audio