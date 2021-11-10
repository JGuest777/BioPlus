import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTrail, animated as a } from "react-spring";
import axios from "axios";
import Header from "../Components/Header";
import Error from "../Components/Error";
import FlipCard from "../Components/Card";
import Footer from "../Components/Footer";
import ScrollTop from "../Components/ScrollTop";
import loading from "../Images/loading.gif";

function App(props) {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(false);

  const fetchMemes = async () => {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      console.log(res);
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
        <Error />
      ) : (
        <div className="wrapper">
          <Header />

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
      <Footer />

      <ScrollTop {...props}>
        <Fab
          style={{
            borderRadius: "3px",
            backgroundColor: "black",
            opacity: "0.7",
            color: "#fff",
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
