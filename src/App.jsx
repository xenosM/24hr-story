import ContextProvider from "./Context/ContextProvider";
import MainPage from "./Pages/MainPage";

function App() {
    
  return (
    <ContextProvider>
      <MainPage/>
    </ContextProvider>
  );
}

export default App;
