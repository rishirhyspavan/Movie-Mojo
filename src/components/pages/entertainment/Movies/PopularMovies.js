import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import {
  getPopularMovies,
  getTotal,
  fetchMoreMovies,
  setHasMore,
  setSkip,
} from "../../../../actions/popularMovieActions";

function PopularMovies({
  popularMovies: { popularMovies, total, skip, hasMore },
  getPopularMovies,
  getTotal,
  fetchMoreMovies,
  setHasMore,
  setSkip,
}) {
  const IMG_API = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getPopularMovies(skip);
    getTotal();
  }, []);

  const loader = (
    <div>
      <img
        className="spinner"
        src="https://res.cloudinary.com/drenxtuen/image/upload/v1623273805/HAL/spinners/Spinner-1s-124px_a825qt.svg"
        alt="loading..."
      />
    </div>
  );

  const loadMore = () => {
    if (popularMovies.length >= total) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        fetchMoreMovies(skip);
        setSkip();
      }, 1000);
    }
  };

  const endMessage = (
    <Fragment>
      <div className="end-message">
        <span className="want-more">Want To see </span>
      </div>

      <div className="end-buttons">
        <div>
          <Link to="/videos" className="videos" type="button">
            <span className="btn-1">Videos</span>
          </Link>
        </div>
        <div>
          <Link to="/entertainment" type="button">
            <span className="btn">Entertainment</span>
          </Link>
        </div>
      </div>
    </Fragment>
  );

  return (
    <InfiniteScroll
      dataLength={popularMovies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
      scrollThreshold="100px"
      endMessage={endMessage}
    >
      <div className="container">
        <div className="flex">
          {popularMovies.map((movie, i) => {
            const { title, overview, genre, released, vote_average } = movie;
            return (
              <div className="card" key={i}>
                <div className="imgBx">
                  <img
                    src={IMG_API + movie.poster_path}
                    alt={title}
                    width="300px"
                    height="450px"
                  />
                </div>
                <div className="contentBx">
                  <div className="flex1">
                    <h4 className="glow">{title}</h4>
                    <span className="glow rel">{released}</span>
                  </div>
                  <div className="size">
                    <span className="glow rel">{genre}</span>
                  </div>
                  <hr className="content-styling" />
                  <div className="color">
                    <div className="glow">
                      <span>{overview && overview.substr(0, 130)}</span>
                    </div>
                    <div className="glow rel">
                      <span>
                        <strong>Rating: </strong>
                      </span>
                      {vote_average === 0 ? "no rating" : vote_average}
                      <AiIcons.AiFillStar
                        style={{
                          color: "yellow",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                    <div className="container2">
                      <div type="button" className="button2">
                        Show More
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}

const mapStateToProps = (state) => ({
  popularMovies: state.popularMovies,
});

export default connect(mapStateToProps, {
  getPopularMovies,
  getTotal,
  fetchMoreMovies,
  setHasMore,
  setSkip,
})(PopularMovies);
