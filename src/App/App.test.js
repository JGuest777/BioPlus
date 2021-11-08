import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("test", async () => {
  const { getByText } = render(<App />);

  expect(getByText("Test")).toBeInTheDocument();
});
