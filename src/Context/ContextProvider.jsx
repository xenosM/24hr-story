import { createContext, useState } from "react";
export const showViewerContext = createContext(null);

function ContextProvider({children}) {
  const [showViewer, setShowViewer] = useState(false);
  const [storyId, setStoryId] = useState(null);

  return (
    <showViewerContext.Provider
      value={{ showViewer, setShowViewer, storyId, setStoryId }}
    >
        {children}
    </showViewerContext.Provider>
  );
}

export default ContextProvider;
