import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders snapshot correctly", function () {
  const {asFragment} = render(<Carousel/>)
  expect(asFragment()).toMatchSnapshot()
})

it("renders Carousel", function () {
  render(<Carousel/>)
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("left arrow show's hidden class when no more pictures", function () {
  const {queryByTestId} = render(<Carousel />)

  const leftArrow = queryByTestId("left-arrow")

  expect(leftArrow).toHaveClass('hidden')

  const rightArrow = queryByTestId("right-arrow");

  fireEvent.click(rightArrow)

  expect(leftArrow).toBeInTheDocument()


})