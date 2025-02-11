import ProgressBar from "./ProgressBar";
import { useContext, useEffect, useState } from "react";
import { showViewerContext } from "../Context/ContextProvider";
import { getFromLocal } from "../Utils/utils";
import { useSwipeable } from "react-swipeable";

function StoryViewer({ id }) {
  //*CONTEXT
  const { setShowViewer } = useContext(showViewerContext);
  //*VARIABLE
  const storyArray = getFromLocal();
  let interval;
  //*STATE
  const [storyIndex, setStoryIndex] = useState(
    storyArray.findIndex((story) => story.id == id)
  );
  //*Condition to close the story viewer on end of story
  if (storyIndex > storyArray.length - 1) {
    setShowViewer(false);
  }
  //*EFFECT
  useEffect(() => {
    interval = setInterval(() => {
      setStoryIndex((i) => ++i);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [storyIndex]);
  //*FUNCTION
  function nextStory() {
    setStoryIndex((i) => ++i);
  }
  function previousStory() {
    storyIndex > 0 && setStoryIndex((i) => --i);
  }
  //*SWIPE HANDLER
  const swipeHandler = useSwipeable({
    onSwipedRight: nextStory,
    onSwipedLeft: previousStory,
    onSwipedDown: () => {
      setShowViewer(false);
    },
    trackMouse: true,
  });

  // console.log(swipeHandler)

  return (
    <section {...swipeHandler} className="story-viewer-background">
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
          {storyArray.map((story, index) => (
            <ProgressBar
              key={story.id}
              index={index}
              requiredIndex={storyIndex}
            />
          ))}
        </div>
        <img
          draggable="false"
          src={storyArray[storyIndex]?.dataImage}
          className="story-viewer"
        ></img>
      </div>
    </section>
  );
}
export default StoryViewer;
