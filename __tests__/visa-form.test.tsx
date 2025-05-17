import {render, screen} from "@testing-library/react";
import VisaForm from "../app/visa-form/visa-form";
import "fake-indexeddb/auto";
import {openDB} from "idb";

jest.mock("idb", () => ({
  openDB: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    forward: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe("VisaForm", () => {
  test("renders VisaForm component", () => {
    render(<VisaForm />);

    // Check if form elements are present
    expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("LinkedIn Profile")).toBeTruthy();
    expect(screen.getByPlaceholderText("Additional Information")).toBeTruthy();

    // Check if submit button is present
    expect(screen.getByText("Submit")).toBeTruthy();
  });
});
