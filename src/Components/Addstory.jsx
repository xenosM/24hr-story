import PlusBtn from "./PlusBtn";
import { convertToBase64,saveToLocal } from "../Utils/utils";



function AddStoryBtn() {
  const handleImageUpload = async (e) => {
    const data = await convertToBase64(e.target.files[0]);
    saveToLocal(data,Date.now())
  };
  return (
    <div
      className="add-story-container"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.1rem",
        flexDirection: "column",
      }}
    >
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
