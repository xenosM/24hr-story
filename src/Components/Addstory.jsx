import PlusBtn from "./PlusBtn";
import {
  convertToBase64,
  saveToLocal,
  getFromLocal,
  imageReSizer,
} from "../Utils/utils";

function AddStoryBtn({ setStoryArray }) {
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      //5MB
      if (file.size > 5_000_000) {
        alert("File too large!");
        return;
      }
      let data = await convertToBase64(file);
      data = imageReSizer(data);
      saveToLocal(data, Date.now());
      setStoryArray(getFromLocal());
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="add-story-container">
      <label className="add-story-btn">
        <PlusBtn></PlusBtn>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </label>
      <span style={{ fontSize: "10px", color: "white" }}>Add story</span>
    </div>
  );
}
export default AddStoryBtn;
