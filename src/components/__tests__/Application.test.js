import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText, debug } = render(<Application />);
  

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));

    debug()
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});