import { mockFeaturedTrailers } from "@/mocks/featuredTrailersMock";
import { RootState } from "@/store/store";
import { renderWithRedux } from "@/utils/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import FeaturedTrailerThumbnail from "./FeaturedTrailerThumbnail";

// Helper to get initial state with overrides
const getInitialState = (overrides: Partial<RootState["home"]> = {}) => ({
  selectedTrailerIndex: 0,
  isPlaying: false,
  playProgress: 0,
  shouldPlayVideo: false,
  isMuted: false,
  ...overrides,
});

const mockTrailer = mockFeaturedTrailers[0];

describe("FeaturedTrailerThumbnail", () => {
  it("should render the featured trailer thumbnail", () => {
    renderWithRedux(<FeaturedTrailerThumbnail trailer={mockTrailer} />);
    const featuredTrailerThumbnail = screen.getByTestId(
      "featured-trailer-thumbnail"
    );
    expect(featuredTrailerThumbnail).toBeInTheDocument();
  });

  it("should show loading skeleton when isLoading is true", () => {
    renderWithRedux(<FeaturedTrailerThumbnail isLoading />);
    const skeleton = document.querySelector(".aspect-video.rounded-2xl");
    expect(skeleton).toBeInTheDocument();
  });

  it("should show error state when hasError is true", () => {
    renderWithRedux(<FeaturedTrailerThumbnail hasError />);
    const errorThumbnail = screen.getByTestId(
      "featured-trailer-thumbnail-error"
    );
    const errorIcon = errorThumbnail.getElementsByClassName(
      "lucide-circle-alert"
    )[0];
    expect(errorIcon).toBeInTheDocument();
  });

  it("should show selected state when isSelected is true", () => {
    renderWithRedux(
      <FeaturedTrailerThumbnail trailer={mockTrailer} isSelected />
    );
    const thumbnail = screen.getByTestId("featured-trailer-thumbnail");
    expect(thumbnail).toHaveClass("border-white");
  });

  it("should show play icon when not playing", () => {
    renderWithRedux(
      <FeaturedTrailerThumbnail trailer={mockTrailer} isSelected />,
      {
        preloadedState: {
          home: getInitialState({ isPlaying: false }),
        },
      }
    );

    const playPauseIndicator = screen.getByTestId("play-pause-indicator");
    const playIcon = playPauseIndicator.querySelector("[data-icon='play']");
    expect(playIcon).toBeInTheDocument();
  });

  it("should show pause icon when playing", () => {
    renderWithRedux(
      <FeaturedTrailerThumbnail trailer={mockTrailer} isSelected />,
      {
        preloadedState: {
          home: getInitialState({ isPlaying: true }),
        },
      }
    );

    const playPauseIndicator = screen.getByTestId("play-pause-indicator");
    const pauseIcon = playPauseIndicator.querySelector("[data-icon='pause']");
    expect(pauseIcon).toBeInTheDocument();
  });

  it("should show progress bar when selected", () => {
    renderWithRedux(
      <FeaturedTrailerThumbnail trailer={mockTrailer} isSelected />,
      {
        preloadedState: {
          home: getInitialState({
            isPlaying: true,
            playProgress: 0.35,
          }),
        },
      }
    );

    const progressBar = screen.getByRole("progressbar");
    const progressBarIndicator = progressBar.querySelector(
      "[data-slot='progress-indicator']"
    );
    expect(progressBarIndicator).toBeInTheDocument();
    expect(progressBarIndicator).toHaveStyle("transform: translateX(-65%)");
  });

  it("should call onClick handler when clicked", () => {
    const handleClick = jest.fn();
    renderWithRedux(
      <FeaturedTrailerThumbnail trailer={mockTrailer} onClick={handleClick} />
    );

    const thumbnail = screen.getByTestId("featured-trailer-thumbnail");
    fireEvent.click(thumbnail);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should show hover effects on mouse enter/leave", () => {
    renderWithRedux(<FeaturedTrailerThumbnail trailer={mockTrailer} />);
    const thumbnail = screen.getByTestId("featured-trailer-thumbnail");

    // Initial state
    expect(thumbnail).toHaveClass("border-transparent");

    // Hover state
    fireEvent.mouseEnter(thumbnail);
    expect(thumbnail).toHaveClass("hover:border-white");

    // Leave hover state
    fireEvent.mouseLeave(thumbnail);
    expect(thumbnail).toHaveClass("border-transparent");
  });
});
