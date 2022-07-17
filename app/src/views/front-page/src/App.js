import { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";

import Home from "./components/home/Home";
import Votes from "./components/Votes/Votes";

function App() {
  const [render, reRender] = useState();
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch("/read")
      .then((res) => res.json())
      .then((json) => {
        setVotes(json);
      });
  }, [render]);

  return (
    <ThemeProvider>
      <Home reRender={reRender} />
      <Votes votes={votes} reRender={reRender}></Votes>
    </ThemeProvider>
  );
}

export default App;
