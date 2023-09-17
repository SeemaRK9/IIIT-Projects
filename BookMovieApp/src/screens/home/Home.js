import React, { Fragment, useState, useEffect } from "react";
import Header from "../../common/header/Header";
import TextField from "@material-ui/core/TextField";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "./Home.css";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.primary.light,
  },
  releasedMoviesGrid: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  upcomingMoviesGrid: {
    flexWrap: "nowrap",
    width: "100%",
    transform: "translateZ(0)",
  },
});

const Home = (props) => {
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [Genre, setGenres] = useState([]);
  const [movieNames, setMovieNames] = useState("");
  const [selectedGenresList, setSelectedGenresList] = useState([]);
  const [artists, setArtists] = useState([]);
  const { classes } = props;
  const [startReleasedDate, setStartReleasedDate] = useState("");
  const [endReleasedDate, setEndReleasedDate] = useState("");
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);
  const [selectedArtistsList, setSelectedArtistsList] = useState([]);

  const filterMoviesHandler = () => {
    let filterQuery = "?status=RELEASED";

    if (movieNames !== "") {
      filterQuery += "&title=" + movieNames;
    }
    if (selectedGenresList.length > 0) {
      filterQuery += "&genres=" + selectedGenresList.toString();
    }
    if (selectedArtistsList.length > 0) {
      filterQuery += "&artists=" + selectedArtistsList.toString();
    }
    if (startReleasedDate !== "") {
      filterQuery += "&start_date=" + startReleasedDate;
    }
    if (endReleasedDate !== "") {
      filterQuery += "&end_date=" + endReleasedDate;
    }

    fetch(props.baseUrl + "movies" + encodeURI(filterQuery), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setReleasedMoviesList(response.movies);
      });
  };

  useEffect(() => {
    fetch(props.baseUrl + "movies?status=PUBLISHED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setUpComingMovies(response.movies));

    fetch(props.baseUrl + "artists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setArtists(response.artists));

    fetch(props.baseUrl + "genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setGenres(response.genres));

    fetch(props.baseUrl + "movies?status=RELEASED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setReleasedMoviesList(response.movies));
  }, []);

  return (
    <Fragment>
      <Header baseUrl={props.baseUrl} />
      <div className="upcoming-movies">
        <span>Upcoming Movies</span>
      </div>
      <ImageList
        className={classes.upcomingMoviesGrid}
        rowHeight={250}
        cols={6}
      >
        {upComingMovies.map((movie) => (
          <ImageListItem key={"um" + movie.id}>
            <img src={movie.poster_url} className="poster" alt={movie.title} />
            <ImageListItemBar title={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="flex-container">
        <div className="left-section">
          <ImageList
            className={classes.releasedMoviesGrid}
            rowHeight={350}
            cols={4}
          >
            {releasedMoviesList.map((movie) => (
              <ImageListItem
                onClick={() => props.history.push("/movie/" + movie.id)}
                className="released-movie-grid-item"
                key={"grid" + movie.id}
              >
                <img
                  src={movie.poster_url}
                  className="poster"
                  alt={movie.title}
                />
                <ImageListItemBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        <div className="right-section">
          <Card>
            <CardContent>
              <FormControl className={classes.formControl}>
                <Typography className={classes.title} color="textSecondary">
                  FIND MOVIES BY:
                </Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input
                  id="movieName"
                  onChange={(e) => setMovieNames(e.target.value)}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Genres
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox-genre" />}
                  renderValue={(selected) => selected.join(",")}
                  value={selectedGenresList}
                  onChange={(e) => setSelectedGenresList(e.target.value)}
                >
                  {Genre.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox
                        checked={selectedGenresList.indexOf(genre.genre) > -1}
                      />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Artists
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(",")}
                  value={selectedArtistsList}
                  onChange={(e) => setSelectedArtistsList(e.target.value)}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          selectedArtistsList.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateStart"
                  label="Release Date Start"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setStartReleasedDate(e.target.value)}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateEnd"
                  label="Release Date End"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setEndReleasedDate(e.target.value)}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <Button
                  onClick={() => filterMoviesHandler()}
                  variant="contained"
                  color="primary"
                >
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(Home);
