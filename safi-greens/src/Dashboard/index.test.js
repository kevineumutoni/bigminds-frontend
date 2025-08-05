import React from "react";
import { render, screen, act } from "@testing-library/react";
import Dashboard from ".";
import * as useDashboardDataHook from "../hooks/useDashboardData";
import * as useFetchUsersDataHook from "../hooks/useFetchUsersData";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: () => ({
    palette: { mode: "dark" }
  }),
}));
jest.mock("../theme", () => ({
  tokens: () => ({
    primary: { 900: "#181A2F", 800: "#222A44", 700: "#23254A" },
    greenAccent: { 300: "#00E396", 400: "#43E97B" },
    blueAccent: { 300: "#775DD0", 700: "#1976D2" },
    grey: { 100: "#fff" }
  })
}));

jest.mock("./components/SalesQuantity", () => () => <div>SalesQuantityChart</div>);
jest.mock("./components/TopCategoriesCharts", () => () => <div>TopCategoriesChart</div>);
jest.mock("./components/UserGrowthChart", () => () => <div>UserGrowthChart</div>);
jest.mock("./components/TopVendors", () => () => <div>TopVendorsChart</div>);
jest.mock("./components/StatsCards", () => () => <div>StatsCards</div>);
jest.mock("./components/SalesGraph", () => () => <div>SalesGraph</div>);
jest.mock("./components/RecentTransations", () => () => <div>RecentTransactions</div>);
jest.mock("./components/DateToggle", () => ({ period, setPeriod }) => (
  <button onClick={() => setPeriod("weekly")}>Toggle</button>
));

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.spyOn(useDashboardDataHook, "default").mockReturnValue({
      stats: {
        newCustomers: 5,
        totalVendors: 3,
        totalOrdersPlaced: 10,
        totalProducts: 8,
        monthlySales: 20000,
        weeklySales: 5000,
      },
      salesHistory: [{ label: "Day 1", value: 1000, quantity: 5 }],
      transactions: [
        {
          transaction_id: "tx123",
          amount: 1000,
          transaction_date: "2025-07-24T10:00:00Z",
          user: { name: "Kevine" }
        }
      ],
      categoriesData: [{ category: "Fruit", count: 5 }],
      loading: false,
    });
    jest.spyOn(useFetchUsersDataHook, "useFetchUsersData").mockReturnValue({
      users: [{ user_id: 1, name: "Kevine", type: "vendor", created_at: "2025-07-01T10:00:00Z" }],
      loading: false,
      error: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders dashboard title and stats", () => {
    render(<Dashboard />);
    expect(screen.getAllByText(/DASHBOARD/i)).not.toHaveLength(0);
    expect(screen.getByText(/Welcome to your dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/StatsCards/i)).toBeInTheDocument();
  });

  test("renders all chart component placeholders", () => {
    render(<Dashboard />);
    expect(screen.getByText("Revenue Trend")).toBeInTheDocument();
    expect(screen.getByText("Sales Quantity")).toBeInTheDocument();
    expect(screen.getByText("User Growth")).toBeInTheDocument();
    expect(screen.getByText("Top Vendors")).toBeInTheDocument();
    expect(screen.getByText("Top Categories")).toBeInTheDocument();
    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();
    // Chart placeholders
    expect(screen.getByText("SalesGraph")).toBeInTheDocument();
    expect(screen.getByText("SalesQuantityChart")).toBeInTheDocument();
    expect(screen.getByText("UserGrowthChart")).toBeInTheDocument();
    expect(screen.getByText("TopVendorsChart")).toBeInTheDocument();
    expect(screen.getByText("TopCategoriesChart")).toBeInTheDocument();
    expect(screen.getByText("RecentTransactions")).toBeInTheDocument();
  });

  test("shows loading spinner when loading", () => {
    jest.spyOn(useDashboardDataHook, "default").mockReturnValue({
      stats: {}, salesHistory: [], transactions: [], categoriesData: [], loading: true
    });
    jest.spyOn(useFetchUsersDataHook, "useFetchUsersData").mockReturnValue({
      users: [], loading: true, error: "",
    });
    render(<Dashboard />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("toggles period via DateToggle", async () => {
    render(<Dashboard />);
    const toggleBtn = screen.getByText("Toggle");
    expect(toggleBtn).toBeInTheDocument();
    await act(async () => {
      toggleBtn.click();
    });
  });
});

