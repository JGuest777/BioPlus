import React, { useState, useEffect } from "react";
import { Button, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTrail, animated as a } from "react-spring";
import axios from "axios";
import FlipCard from "../Components/Card";
import ScrollTop from "../Components/ScrollTop";
import loading from "./loading.gif";
import "./App.scss";

function App(props) {
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
                  <FlipCard memes={memes} index={index} />
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

      <ScrollTop {...props}>
        <Fab
          style={{
            borderRadius: "3px",
            backgroundColor: "black",
            opacity: "0.3",
          }}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default App;
