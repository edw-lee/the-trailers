import { mockFeaturedTrailers } from "@/mocks/featuredTrailersMock";
import {
  mediaElementMocks,
  resetMediaElementMocks,
  setupMediaElementMocks,
} from "@/mocks/htmlMediaElementMock";
import { RootState } from "@/store/store";
import { renderWithRedux } from "@/utils/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import FeaturedTrailerVideoPlayer from "./FeaturedTrailerVideoPlayer";

// Setup media element mocks before tests
beforeAll(() => {
  setupMediaElementMocks();
});

// Reset mocks between tests
afterEach(() => {
  resetMediaElementMocks();
});

// Helper to get initial state with overrides
const getInitialState = (overrides: Partial<RootState["home"]> = {}) => ({
  selectedTrailerIndex: 0,
  isPlaying: false,
  playProgress: 0,
  shouldPlayVideo: false,
  isMuted: false,
  ...overrides,
});

describe("FeaturedTrailerVideoPlayer", () => {
  it("should render the featured trailer video player", () => {
    renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />
    );
    const featuredTrailerVideoPlayer = screen.getByTestId(
      "featured-trailer-video-player"
    );
    expect(featuredTrailerVideoPlayer).toBeInTheDocument();
  });

  it("should render loading state when no trailers provided", () => {
    renderWithRedux(<FeaturedTrailerVideoPlayer featuredTrailers={[]} />, {
      preloadedState: {
        home: getInitialState(),
      },
    });

    expect(
      screen.getByTestId("featured-trailer-video-player-loading")
    ).toBeInTheDocument();
  });

  it("should render the featured trailer video player with first trailer", () => {
    renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />,
      {
        preloadedState: {
          home: getInitialState({ selectedTrailerIndex: 0 }),
        },
      }
    );

    const videoPlayer = screen.getByTestId("featured-trailer-video-player");
    expect(videoPlayer).toBeInTheDocument();
    expect(videoPlayer).toHaveAttribute(
      "src",
      expect.stringContaining(mockFeaturedTrailers[0].bunnyCDNVideoId)
    );
  });

  it("should play video when shouldPlayVideo is true", () => {
    renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />,
      {
        preloadedState: {
          home: getInitialState({ shouldPlayVideo: true }),
        },
      }
    );

    expect(mediaElementMocks.mockPlay).toHaveBeenCalled();
  });

  it("should pause video when shouldPlayVideo is false", () => {
    // Mock HTMLMediaElement.paused to false
    Object.defineProperty(window.HTMLMediaElement.prototype, "paused", {
      get: jest.fn().mockReturnValue(false),
    });

    renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />,
      {
        preloadedState: {
          home: getInitialState({ shouldPlayVideo: false }),
        },
      }
    );

    expect(mediaElementMocks.mockPause).toHaveBeenCalled();
  });

  it("should update play progress on time update", () => {
    // Setup mock duration
    mediaElementMocks.mockDuration.mockReturnValue(100);

    const { store } = renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />,
      {
        preloadedState: {
          home: getInitialState({ shouldPlayVideo: true }),
        },
      }
    );

    // Simulate time update
    const video = screen.getByTestId("featured-trailer-video-player");
    mediaElementMocks.mockCurrentTime.get.mockReturnValue(50);
    fireEvent.timeUpdate(video);

    expect(store.getState().home.playProgress).toBe(0.5);
  });

  it("should handle video end by playing next trailer", () => {
    const { store } = renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />,
      {
        preloadedState: {
          home: getInitialState({
            selectedTrailerIndex: 0,
            shouldPlayVideo: true,
          }),
        },
      }
    );

    // Simulate video end
    const video = screen.getByTestId("featured-trailer-video-player");
    fireEvent.ended(video);

    const { selectedTrailerIndex, isPlaying, shouldPlayVideo } =
      store.getState().home;
    expect(selectedTrailerIndex).toBe(1);
    expect(isPlaying).toBe(false);
    expect(shouldPlayVideo).toBe(false);
  });

  it("should loop back to first trailer when last video ends", () => {
    const { store } = renderWithRedux(
      <FeaturedTrailerVideoPlayer featuredTrailers={mockFeaturedTrailers} />,
      {
        preloadedState: {
          home: getInitialState({
            selectedTrailerIndex: mockFeaturedTrailers.length - 1,
            shouldPlayVideo: true,
          }),
        },
      }
    );

    // Simulate video end on last trailer
    const video = screen.getByTestId("featured-trailer-video-player");
    fireEvent.ended(video);

    expect(store.getState().home.selectedTrailerIndex).toBe(0);
  });
});
