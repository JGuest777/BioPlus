import React from "react";
import { Button } from "@mui/material";

function Error() {
  return (
    <>
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
    </>
  );
}

export default Error;
