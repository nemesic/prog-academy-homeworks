import { useState } from "react";
import "./styles/style.css";
import Header from "./components/Header";
import Feature from "./components/Feature";
import Popular from "./components/Popular";
import RatingBox from "./components/RatingBox";

function App() {
    const [search, setSearch] = useState("");

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Feature title="Stranger Things" description="Stranger Things is an American science fiction horror drama streaming television series created by The Duffer Brothers for Apple TV+. The series premiered on June 16, 2019, and is based on the 2016 novel of the same name by the Duffer Brothers." />
      <Popular  search={search} />
      <RatingBox />
    </>
  );
}

export default App;