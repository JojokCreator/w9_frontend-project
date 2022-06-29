// import { getAllByTestId, render, screen, fireEvent } from "@testing-library/react";
import { test, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login/";

test("Checking if the app logo is rendered", () =>{

render(<Login/>);
screen.debug(); 
const actual = screen.getByRole("img")
const expected = ("img");
expect(actual).toBe(expected);
})



