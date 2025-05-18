import { mockFeaturedTrailers } from "@/mocks/featuredTrailersMock";
import { setSelectedTrailerIndex } from "@/store/slices/homeSlice";
import { renderWithRedux } from "@/utils/testUtils";
import {
  act,
  fireEvent,
  screen,
  waitFor
} from "@testing-library/react";
import FeaturedTrailersSelector from "./FeaturedTrailersSelector";

describe("FeaturedTrailersSelector", () => {
  it("should render the featured trailers selector", () => {
    renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );
    const featuredTrailersSelector = screen.getByTestId(
      "featured-trailers-selector"
    );
    expect(featuredTrailersSelector).toBeInTheDocument();
  });

  it("should display the selected trailer's casts", () => {
    const { store } = renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );

    // Verify first trailer's casts are displayed
    screen.getByText("John Doe");
    screen.getByText("Jane Doe");
    screen.getByText("Bob Smith");

    // Select second trailer
    act(() => store.dispatch(setSelectedTrailerIndex(1)));

    // Verify second trailer's casts are displayed
    screen.getByText("Alice Johnson");
    screen.getByText("Mike Brown");
    screen.getByText("Sarah Wilson");
  });

  it("should display the selected trailer's title", () => {
    const { store } = renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );

    // Verify first trailer's title is displayed
    screen.getByText(mockFeaturedTrailers[0].title);

    // Select second trailer
    act(() => store.dispatch(setSelectedTrailerIndex(1)));

    // Verify second trailer's title is displayed
    screen.getByText(mockFeaturedTrailers[1].title);
  });

  it("should handle thumbnail selection", async () => {
    const { store } = renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );

    // Click on second thumbnail
    fireEvent.click(screen.getAllByRole("img")[1]);

    // Verify selected trailer index is updated
    await waitFor(() => {
      expect(store.getState().home.selectedTrailerIndex).toBe(1);
    });
  });

  it("should handle next/previous navigation", async () => {
    const { store } = renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );

    // Click next button
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    await waitFor(() => {
      expect(store.getState().home.selectedTrailerIndex).toBe(1);
    });

    // Click previous button
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    await waitFor(() => {
      expect(store.getState().home.selectedTrailerIndex).toBe(0);
    });
  });

  it("should disable navigation buttons at boundaries", () => {
    const { store } = renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );

    // Initial state - previous button should be disabled
    expect(screen.getByTestId("previous-button")).toBeDisabled();

    // Move to last trailer
    act(() => store.dispatch(setSelectedTrailerIndex(1)));

    // Next button should be disabled
    expect(screen.getByTestId("next-button")).toBeDisabled();
  });

  it("should render the mute button", () => {
    renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );
    expect(screen.getByTestId("mute-button")).toBeInTheDocument();
  });

  it("should render the details link", () => {
    renderWithRedux(
      <FeaturedTrailersSelector featuredTrailers={mockFeaturedTrailers} />
    );
    expect(screen.getByTestId("details-link")).toBeInTheDocument();
    expect(screen.getByTestId("details-link")).toHaveAttribute(
      "href",
      "/details/1"
    );
  });
});
