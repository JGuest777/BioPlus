import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardActionArea, Button } from "@mui/material";
import { useTrail, animated as a } from "react-spring";
import axios from "axios";
import loading from "./loading.gif";
import "./App.scss";

function App() {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(false);

  const fetchMemes = async () => {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      // no limit query available on API
      const limitedRes = res?.data?.data?.memes.slice(0, 15);
      setMemes(limitedRes);
    } catch (error) {
      if (error) setError(true);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const trail = useTrail(memes.length, {
    from: { marginLeft: -20, opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { marginLeft: 0, opacity: 1, transform: "translate3d(0,0px,0)" },
  });

  const colorPicker = () => {
    const colors = [
      "#E0BBE4",
      "#957DAD",
      "#D291BC",
      "#FEC8D8",
      "#FFDFD3",
      "#D5D6EA",
      "#F6F6EB",
      "#D7ECD9",
      "#F5D5CB",
      "#F6ECF5",
      "#F3DDF2",
    ];
    const selctedColor = colors[Math.floor(Math.random() * colors.length)];
    return selctedColor;
  };

  return (
    <div className="container">
      {error ? (
        <div className="wrapper">
          <p className="error">
            Error fetching your memes, please try again later
          </p>
          <p>:(</p>
          <Button
            variant="contained"
            onClick={() => window.location.reload(false)}
          >
            Reload
          </Button>
        </div>
      ) : (
        <div className="wrapper">
          <h1>Portfolio Grid 4</h1>
          <p>This grid shows the items pages in a popup</p>

          {!memes ? (
            <img alt="loading" src={loading} />
          ) : (
            <div className="grid__container">
              {trail.map((props, index) => (
                <a.div
                  key={memes[index]?.id}
                  style={props}
                  className="grid__item"
                >
                  <Card
                    style={{ backgroundColor: `${colorPicker()}` }}
                    className="card"
                  >
                    <CardActionArea className="card__action">
                      <CardMedia
                        className="card__img"
                        component="img"
                        image={memes[index]?.url}
                        alt={memes[index]?.name}
                      />
                    </CardActionArea>
                  </Card>
                </a.div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="parallax" />
      <footer>
        <div className="footer-container">
          <div className="footer-inner">
            <p>
              &copy; 2021 <span>BioPlus Theme</span> by James Guest
            </p>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
