import { useSearchMovies } from "@/hooks/data/trailers/useSearchMovies";
import { mockMovies } from "@/mocks/moviesMock";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

// Mock the useSearchMovies hook
jest.mock("../hooks/data/trailers/useSearchMovies");

describe("SearchBar", () => {
  const mockUseSearchMovies = useSearchMovies as jest.MockedFunction<
    typeof useSearchMovies
  >;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Default mock implementation
    mockUseSearchMovies.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      mutate: jest.fn(),
      isValidating: false,
    });
  });

  it("renders with correct accessibility attributes", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox", { name: /search bar/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search for a movie");
  });

  it("shows search icon by default", () => {
    render(<SearchBar />);
    expect(screen.getByLabelText("search icon")).toHaveClass(
      "lucide-search"
    );
  });

  it("shows loading spinner when searching", () => {
    mockUseSearchMovies.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(<SearchBar />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows clear button when input has text", async () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");

    expect(
      screen.queryByRole("button", { name: "clear button" })
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
    });

    const clearButton = screen.getByRole("button", { name: "clear button" });
    expect(clearButton).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", async () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // Type something
    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
    });

    expect(input.value).toBe("test");

    // Click clear button
    const clearButton = screen.getByRole("button", { name: "clear button" });
    await act(async () => {
      fireEvent.click(clearButton);
    });

    expect(input.value).toBe("");
  });

  it("displays search results when available", async () => {
    mockUseSearchMovies.mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: null,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(<SearchBar />);

    // Type something to trigger search
    const input = screen.getByRole("textbox");
    await act(async () => {
      fireEvent.change(input, { target: { value: "in" } });
    });

    // Check if results are displayed
    const results = screen.getAllByRole("link");
    expect(results).toHaveLength(2);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("hides results when clicking outside", async () => {
    mockUseSearchMovies.mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: null,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(
      <div>
        <div data-testid="outside">Outside Element</div>
        <SearchBar />
      </div>
    );

    // Type to show results
    const input = screen.getByRole("textbox");
    await act(async () => {
      fireEvent.change(input, { target: { value: "in" } });
    });

    // Click outside
    const outside = screen.getByTestId("outside");
    await act(async () => {
      fireEvent.mouseDown(outside);
    });

    expect(mockUseSearchMovies).toHaveBeenCalledWith("");
  });
});
