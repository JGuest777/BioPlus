import React from "react";
import { render } from "@testing-library/react";
import axiosMock from "axios";
import App from "./Index";

jest.mock("axios");

test("test", async () => {
  const { getByText } = render(<App />);
  axiosMock.get.mockResolvedValueOnce({
    data: {
      data: {
        memes: [
          {
            box_count: 1,
            height: 1200,
            id: "181913649",
            name: "test meme",
            url: "https://testmeme.jpg",
            width: 1200,
          },
        ],
      },
    },
  });

  expect(getByText("Portfolio Grid 4")).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});
