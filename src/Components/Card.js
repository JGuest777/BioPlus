import React, { useState } from "react";
import { Card, CardMedia, CardActionArea } from "@mui/material";
import { colorPicker } from "../Utils/Helpers";

function FlipCard({ memes, index }) {
  const [flip, setFlip] = useState(false);
  return (
    <>
      <Card
        onMouseEnter={() => setFlip(true)}
        onMouseLeave={() => setFlip(false)}
        style={{ backgroundColor: `${colorPicker()}` }}
        className="card"
      >
        <CardActionArea className="card__action">
          {flip ? (
            <p>{memes[index]?.name}</p>
          ) : (
            <CardMedia
              className="card__img"
              component="img"
              image={memes[index]?.url}
              alt={memes[index]?.name}
            />
          )}
        </CardActionArea>
      </Card>
    </>
  );
}

export default FlipCard;
