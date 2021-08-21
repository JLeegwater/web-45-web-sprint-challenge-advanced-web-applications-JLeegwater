import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from "./Color";

const testColor = {
  color: "aqua",
  code: {
    hex: "#00ffff",
  },
};

test("Renders without errors with blank color passed into component", () => {
  render(<Color color={{ color: "", code: { hex: "" } }} />);
});

test("Renders the color passed into component", () => {
  render(<Color color={testColor} />);
  expect(screen.getByText(testColor.color)).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
  const deleteColorTest = jest.fn();
  const toggleEditTest = jest.fn();
  render(
    <Color
      color={testColor}
      deleteColor={deleteColorTest}
      toggleEdit={toggleEditTest}
    />
  );
  userEvent.click(screen.getByTestId("delete"));
  expect(deleteColorTest.mock.calls.length).toBe(1);
  expect(toggleEditTest.mock.calls.length).toBe(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
  const editColorTest = jest.fn();
  const toggleEditTest = jest.fn();
  render(
    <Color
      color={testColor}
      setEditColor={editColorTest}
      toggleEdit={toggleEditTest}
    />
  );
  userEvent.click(screen.getByTestId("color"));

  expect(editColorTest.mock.calls.length).toBe(1);
  expect(toggleEditTest.mock.calls.length).toBe(1);
});
