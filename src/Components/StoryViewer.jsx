import ProgressBar from "./ProgressBar";
import { useContext, useEffect, useState } from "react";
import { showViewerContext } from "../App";
import { getFromLocal } from "../Utils/utils";

function StoryViewer({ id }) {
  const { setShowViewer } = useContext(showViewerContext);
  const storyArray = getFromLocal();
  const [storyIndex, setStoryIndex] = useState(
    storyArray.findIndex(story=> story.id == id)
  );
  if (storyIndex > storyArray.length - 1) {
    setShowViewer(false);
  }
  console.log("storyViewer render")
  useEffect(() => {
    const interval = setInterval(() => {
      setStoryIndex((i) => ++i);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <section className="story-viewer-background">
        <input
          type="button"
          className="close-viewer-btn"
          value="X"
          onClick={(_) => {
            setShowViewer(false);
          }}
        />
        <div className="story-viewer-container">
          <div className="progress-bar-container">
            {storyArray.map((story,index) => (
              <ProgressBar key={story.id} index={index} requiredIndex={storyIndex} story={story} />
            ))}
          </div>
          <img
            src={storyArray[storyIndex]?.dataImage}
            className="story-viewer"
          ></img>
        </div>
      </section>
    </>
  );
}
export default StoryViewer;
