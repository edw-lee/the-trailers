import { act, fireEvent, screen } from "@testing-library/react";
import MuteButton from "./MuteButton";
import { renderWithRedux } from "@/utils/testUtils";
import { setIsMuted } from "@/store/slices/homeSlice";

describe("MuteButton", () => {
  it("should render the mute button", () => {
    renderWithRedux(<MuteButton />);
    const muteButton = screen.getByTestId("mute-button");
    expect(muteButton).toBeInTheDocument();
  });

  // Test 2: Renders with correct initial state (unmuted)
  it("should render with unmuted icon by default", () => {
    renderWithRedux(<MuteButton />);
    const volumeIcon = screen.getByTestId("volume-icon");
    expect(volumeIcon).toHaveClass("lucide-volume-2");
  });

  // Test 3: Toggles between muted and unmuted states
  it("should toggle between muted and unmuted states when clicked", () => {
    const { store } = renderWithRedux(<MuteButton />);
    const button = screen.getByTestId("mute-button");

    // Initial state should be unmuted
    expect(store.getState().home.isMuted).toBeFalsy();

    // Click to mute
    fireEvent.click(button);
    expect(store.getState().home.isMuted).toBeTruthy();

    // Click again to unmute
    fireEvent.click(button);
    expect(store.getState().home.isMuted).toBeFalsy();
  });

  // Test 4: Renders correct icon based on mute state
  it("should render correct icon based on mute state", () => {
    // Test with initial unmuted state
    const { store } = renderWithRedux(<MuteButton />);
    expect(screen.getByTestId("volume-icon")).toHaveClass("lucide-volume-2");

    // Update the store to muted state and rerender
    act(() => store.dispatch(setIsMuted(true)));

    expect(screen.getByTestId("volume-icon")).toHaveClass("lucide-volume-x");
  });

  // Test 5: Button has correct accessibility attributes
  it("should have correct accessibility attributes", () => {
    renderWithRedux(<MuteButton />);
    const button = screen.getByTestId("mute-button");
    expect(button).toHaveAttribute(
      "aria-label",
      expect.stringMatching(/(mute|unmute)/i)
    );
    expect(button).toHaveAttribute("type", "button");
  });

  // Test 6: Renders with preloaded muted state
  it("should respect preloaded state", () => {
    renderWithRedux(<MuteButton />, {
      preloadedState: {
        home: {
          isMuted: true,
          selectedTrailerIndex: 0,
          isPlaying: false,
          playProgress: 0,
        },
      },
    });

    expect(screen.getByTestId("volume-icon")).toHaveClass("lucide-volume-x");
  });
});
