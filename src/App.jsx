import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import style from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import logoImg from "./assets/images/logo.png";
import Logo from "./components/Logo/Logo";
import TVShowDetail from "./components/TVShowDetail/TVShowDetail/TVShowDetail";
import TVShowList from "./components/TVShowList/TVShowList";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  const [currentTVShow, setCurrentTVShow] = useState("");
  const [recommendationList, setRecommendationList] = useState([]);

  const fetchPopulars = async () => {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (err) {
      alert("Something went wrong when fetching popular tv shows");
    }
  };

  const fetchRecommendations = async (tvShowId) => {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      );
      if (recommendationListResp.length > 0) {
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
    } catch (err) {
      alert("Something went wrong when fetching recommended tv shows");
    }
  };

  const fetchByTitle = async (title) => {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(title);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (err) {
      alert("Something went wrong when fetching tv shows by query");
    }
  };

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  const updateCurrentTVShow = (tvShow) => {
    setCurrentTVShow(tvShow);
  };

  return (
    <div
      className={style.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={style.header}>
        <div className="row">
          <div className="col-4">
            <div>
              <Logo
                img={logoImg}
                title={"Watowatch"}
                subtitle={"Find a show you may like"}
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={style.tv_show_details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={style.recommended_shows}>
        {currentTVShow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
};

export default App;
