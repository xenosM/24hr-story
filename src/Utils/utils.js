import { v1 } from "uuid";

let storyArray = [];
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
export function saveToLocal(dataImage,timeStamp) {
  storyArray.push({
    id: v1(),
    dataImage,
    timeStamp
  });
  localStorage.setItem("storyArray",JSON.stringify(storyArray) )
}
