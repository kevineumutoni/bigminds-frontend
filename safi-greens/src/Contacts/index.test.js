import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import Contacts from ".";
import * as useFetchUsersDataHook from "../hooks/useFetchUsersData";
import { ThemeProvider, createTheme } from "@mui/material/styles";

jest.mock("../theme", () => ({
  tokens: () => ({
    blueAccent: { 700: "#1976d2" },
    primary: { 400: "#fff" },
    greenAccent: { 200: "#4caf50" },
    grey: { 100: "#fff" },
  }),
}));

const mockUsers = [
  {
    user_id: 1,
    name: "Kevine Umutoni",
    phone_number: "034567890",
    location: "nairobi",
    shop_name: "Welcome to mama Kevine",
    till_number: "12345",
    type: "customer",
    serial: 1,
  },
  {
    user_id: 2,
    name: "jane vendor",
    phone_number: "0987654321",
    location: "kisumu",
    shop_name: "Jane's Shop",
    till_number: "",
    type: "vendor",
    serial: 2,
  },
];

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);
}

describe("Contacts Page", () => {
  beforeEach(() => {
    jest.spyOn(useFetchUsersDataHook, "useFetchUsersData").mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main headings", () => {
    renderWithTheme(<Contacts />);
    expect(screen.getByRole("heading", { level: 4, name: /contacts/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 6, name: /list of contacts/i })).toBeInTheDocument();
  });

  it("renders the DataGrid with user rows and columns", () => {
    renderWithTheme(<Contacts />);
    expect(screen.getAllByText("No.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Name")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Phone Number")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Address")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Shop Name")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Till Number")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Type")[0]).toBeInTheDocument();

    expect(screen.getByText("Kevine Umutoni")).toBeInTheDocument();
    expect(screen.getByText("Nairobi")).toBeInTheDocument();
    expect(screen.getByText("034567890")).toBeInTheDocument();
    expect(screen.getByText("Welcome to mama Kevine")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Customer")).toBeInTheDocument();

    expect(screen.getByText("Jane Vendor")).toBeInTheDocument();
    expect(screen.getByText("Kisumu")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
    expect(screen.getByText("Jane's Shop")).toBeInTheDocument();
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Vendor")).toBeInTheDocument();
  });

  it("filters users by search input", async () => {
    renderWithTheme(<Contacts />);
    const searchInput = screen.getByLabelText(/search by name, address, till number, or phone number/i);
    fireEvent.change(searchInput, { target: { value: "kisumu" } });

    await waitFor(() => {
      expect(screen.queryByText("Kevine Umutoni")).not.toBeInTheDocument();
      expect(screen.getByText("Jane Vendor")).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: "Kevine" } });
    await waitFor(() => {
      expect(screen.getByText("Kevine Umutoni")).toBeInTheDocument();
      expect(screen.queryByText("Jane Vendor")).not.toBeInTheDocument();
    });
  });

  it("filters users by type using dropdown", async () => {
    renderWithTheme(<Contacts />);
    const select = screen.getByRole("combobox", { name: /filter by user type/i });

    fireEvent.mouseDown(select);

    const listbox = await screen.findByRole("listbox");
    const vendorOption = within(listbox).getByText("Vendor");
    fireEvent.click(vendorOption);

    await waitFor(() => {
      expect(screen.getByText("Jane Vendor")).toBeInTheDocument();
      expect(screen.queryByText("Kevine Umutoni")).not.toBeInTheDocument();
    });

    fireEvent.mouseDown(select);
    const customerOption = within(await screen.findByRole("listbox")).getByText("Customer");
    fireEvent.click(customerOption);

    await waitFor(() => {
      expect(screen.getByText("Kevine Umutoni")).toBeInTheDocument();
      expect(screen.queryByText("Jane Vendor")).not.toBeInTheDocument();
    });

    // Open dropdown again for All
    fireEvent.mouseDown(select);
    const allOption = within(await screen.findByRole("listbox")).getByText("All");
    fireEvent.click(allOption);

    await waitFor(() => {
      expect(screen.getByText("Kevine Umutoni")).toBeInTheDocument();
      expect(screen.getByText("Jane Vendor")).toBeInTheDocument();
    });
  });

  it("shows loading state", () => {
    jest.spyOn(useFetchUsersDataHook, "useFetchUsersData").mockReturnValue({
      users: [],
      loading: true,
      error: null,
    });
    renderWithTheme(<Contacts />);
    const loading = screen.queryByTestId("loading-indicator") || screen.queryByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("shows error state", () => {
    jest.spyOn(useFetchUsersDataHook, "useFetchUsersData").mockReturnValue({
      users: [],
      loading: false,
      error: "Test error",
    });
    renderWithTheme(<Contacts />);
    expect(screen.getByText(/sorry, page not found or could not load users/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });
});