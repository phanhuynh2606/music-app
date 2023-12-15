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
