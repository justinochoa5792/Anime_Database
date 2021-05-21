import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");

  const GetTopAnime = async () => {
    const temp = await Axios.get(
      `https://api.jikan.moe/v3/top/anime/1/bypopularity`
    );
    console.log(temp.data);
    SetTopAnime(temp.data.top.slice(0, 5));
  };

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const temp = await Axios.get(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    );
    console.log(temp.data);
    SetAnimeList(temp.data.results);
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
