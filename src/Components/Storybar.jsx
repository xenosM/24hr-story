import React, { useEffect,useContext, useRef, useState } from "react";
import AddStoryBtn from "./Addstory";
import Story from "./Story";
import { getFromLocal, saveToLocal } from "../Utils/utils";


function StoryBar() {
  //*References
  const storyBarRef = useRef(null);
  //*VARIABLES
  const [storyArray, setStoryArray] = useState(getFromLocal() || []);
  //*CONTEXT
  //* FUNCTION
  function expireStory(){
    setStoryArray((prevStory) =>
       prevStory.filter((story) => Date.now() - story.timeStamp < 86400000)
    );
  }
  //*Use Effects
  useEffect(() => {
    const storyBar = storyBarRef.current;
    if (!storyBar) return;
    expireStory()
    const interval = setInterval(() => {
      expireStory()
      console.log("expired");
    }, 60000);
    const handleScroll = (e) => {
      if (storyBar.scrollWidth > storyBar.clientWidth) {
        // Math.sign(x) returns 1 if x is +ve else -1
        const scrollDirection = Math.sign(e.deltaY);
        const scrollDistance = 240;
        storyBar.scrollLeft += scrollDirection * scrollDistance;
        e.preventDefault();
      }
    };
    storyBar.addEventListener("wheel", handleScroll);
    return () => {
      clearInterval(interval);
      storyBar.removeEventListener("wheel", handleScroll);
    };
  }, []);
  //to store the non expired story
  localStorage.setItem("storyArray", JSON.stringify(storyArray));

  return (
    <div ref={storyBarRef} id="story-bar-container">
      <AddStoryBtn setStoryArray={setStoryArray} />
      {storyArray.map((story) => (
        <Story
          key={story.id}
          dataImage={story.dataImage}
          timeStamp={story.timeStamp}
          id= {story.id}
        />
      ))}
    </div>
  );
}
export default StoryBar;
