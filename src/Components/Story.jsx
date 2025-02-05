import { getTimeSince } from "../Utils/utils";
import { useContext } from "react";
import { showViewerContext } from "../App";


function Story({ dataImage, timeStamp,id }) {
  const {setShowViewer,setStoryId}=useContext(showViewerContext)
  return (
    <div className="story-container">
      <div
        onClick={(_) => {
          setShowViewer(true);
          setStoryId(id)
        }}
        className="story"
        style={{
          backgroundImage: `url(${dataImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <span
        className="story-time"
        style={{ fontSize: "10px", color: "white", whiteSpace: "nowrap" }}
      >
        {getTimeSince(timeStamp)}
      </span>
    </div>
  );
}

export default Story;
