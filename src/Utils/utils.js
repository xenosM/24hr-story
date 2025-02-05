import { v1 } from "uuid";

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
export function saveToLocal(dataImage, timeStamp) {
  let storyArray = getFromLocal() || [];

  storyArray.push({
    id: v1(),
    dataImage,
    timeStamp,
  });
  localStorage.setItem("storyArray", JSON.stringify(storyArray));
}

export function getFromLocal() {
  return JSON.parse(localStorage.getItem("storyArray"));
}
export function getTimeSince(timeStamp) {
  const currentTime = Date.now();
  const timeDiff = currentTime - timeStamp;
  const timeDiffInMinutes = Math.round(timeDiff / 60000);
  if (timeDiffInMinutes < 5) return "Just Now";
  if (timeDiffInMinutes < 60) return `${timeDiffInMinutes} mins ago`;
  else
    return `
      ${Math.floor(timeDiffInMinutes / 60)} hour${
      Math.floor(timeDiffInMinutes / 60) > 1 ? "s" : ""
    } ago`;
}

export function imageReSizer(data) {
  const image = new Image();
  image.src = data;
  if (image.width > 1080 || image.height > 1920) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    //Get the aspect ratio
    const aspectRatio = Math.min(1080 / image.width, 1920 / image.height);

    canvas.width = image.width * aspectRatio;
    canvas.height = image.height * aspectRatio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //compressed to 0.8 to reduce file size without significant loss of quality
    return canvas.toDataURL("image/jpeg", 0.8);
  }
  return data;
}
