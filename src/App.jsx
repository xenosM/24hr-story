import StoryBar from "./Components/Storybar";
import StoryViewer from "./Components/StoryViewer";
import { useState, createContext } from "react";

export const showViewerContext = createContext(null);
function App() {
  const [showViewer, setShowViewer] = useState(false);
  const [storyId, setStoryId] = useState(null);
  console.log("render app");

  return (
    <showViewerContext.Provider
      value={{ showViewer, setShowViewer, storyId, setStoryId }}
    >
      <StoryBar />
      {showViewer && <StoryViewer id={storyId} />}
    </showViewerContext.Provider>
  );
}

export default App;
