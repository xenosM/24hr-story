import StoryBar from "../Components/Storybar"
import StoryViewer from "../Components/StoryViewer"
import { useContext } from "react";
import { showViewerContext } from "../Context/ContextProvider";


function MainPage() {
    const {showViewer,storyId}= useContext(showViewerContext)
  return (
    <>
      <StoryBar />
      {showViewer && <StoryViewer id={storyId} />}
    </>
  );
}

export default MainPage;
