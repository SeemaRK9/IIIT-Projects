import React, { useState, useEffect } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Header from "../../common/header/Header";
import "./Details.css";
import YouTube from "react-youtube";
import Typography from "@material-ui/core/Typography";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";
import { Link } from "react-router-dom";

const Details = (props) => {
  const [ratingIcons, setRatingIcons] = useState([
    {
      id: 1,
      color: "black",
    },
    {
      id: 2,
      color: "black",
    },
    {
      id: 3,
      color: "black",
    },
    {
      id: 4,
      color: "black",
    },
    {
      id: 5,
      color: "black",
    },
  ]);
  const [fetchMovie, setFetchedMovie] = useState({});
  useEffect(() => {
    fetch(props.baseUrl + "movies/" + props.match.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setFetchedMovie(response));
  }, []);

  const ratingsHandler = (starId) => {
    let starsList = [];
    for (let i of ratingIcons) {
      let temp = i;
      if (i.id <= starId) {
        temp.color = "yellow";
      } else {
        temp.color = "black";
      }
      starsList.push(temp);
    }

    setRatingIcons(starsList);
  };

  const ytVideo = {
    height: "300",
    width: "700",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Header
        id={props.match.params.id}
        baseUrl={props.baseUrl}
        displayBookShowBtn={true}
      />
      <div className="back-btn">
        <Typography>
          <Link style={{ textDecoration: "none" }} to="/">
            &#60; Back to Home
          </Link>
        </Typography>
      </div>
      {fetchMovie !== {} && (
        <div className="details-container-flex-view">
          <div className="details-container-flex-view-left">
            <img src={fetchMovie.poster_url} alt={fetchMovie.title} />
          </div>
          <div className="details-container-flex-view-middle">
            <div>
              <Typography variant="h2">{fetchMovie.title}</Typography>
            </div>
            <br />
            <div>
              <Typography>
                <span className="bold-text">Genres: </span>{" "}
                {fetchMovie.genres && fetchMovie.genres.join(", ")}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text">Duration:</span>{" "}
                {fetchMovie.duration}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text">Release Date:</span>{" "}
                {new Date(fetchMovie.release_date).toDateString()}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text"> Rating:</span>{" "}
                {fetchMovie.critics_rating}{" "}
              </Typography>
            </div>
            <div className="margin-top-16">
              <Typography>
                <span className="bold-text">Plot:</span>{" "}
                <a href={fetchMovie.wiki_url}>Wiki Link</a>{" "}
                {fetchMovie.storyline}{" "}
              </Typography>
            </div>
            <div className="margin-top-16">
              <Typography>
                <span className="bold-text">Trailer:</span>
              </Typography>
              <YouTube
                videoId={
                  fetchMovie.trailer_url &&
                  fetchMovie.trailer_url.split("?v=")[1]
                }
                opts={ytVideo}
              />
            </div>
          </div>
          <div className="details-container-flex-view-right">
            <Typography>
              <span className="bold">Rate this movie: </span>
            </Typography>
            {ratingIcons.map((star) => (
              <StarBorderIcon
                style={{ color: star.color }}
                key={"star" + star.id}
                onClick={() => ratingsHandler(star.id)}
              />
            ))}

            <div className="bold margin-bottom-16 margin-top-16">
              <Typography>
                <span className="bold">Artists:</span>
              </Typography>
            </div>
            <div>
              <ImageList rowHeight={160} cols={2}>
                {fetchMovie.artists &&
                  fetchMovie.artists.map((artist) => (
                    <ImageListItem key={artist.id}>
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <ImageListItemBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
