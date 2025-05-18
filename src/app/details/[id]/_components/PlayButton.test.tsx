// src/app/details/[id]/_components/PlayButton.test.tsx
import { mockMovieDetails } from "@/mocks/movieDetailsMock";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PlayButton from "./PlayButton";

describe("PlayButton", () => {
  let button: HTMLElement;

  beforeEach(() => {
    render(<PlayButton movieDetails={mockMovieDetails} />);
    button = screen.getByRole("button", { name: /play button/i });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders the play button with correct accessibility attributes", () => {
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "play button");
  });

  it("opens the dialog when the button is clicked", () => {
    fireEvent.click(button);

    // Check if dialog content is rendered
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMovieDetails.title} Trailer`)
    ).toBeInTheDocument();
  });

  it("displays the YouTube iframe with correct src", () => {
    fireEvent.click(button);

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining(mockMovieDetails.youtubeId)
    );
  });

  it("applies correct styling classes", () => {
    expect(button).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "grow",
      "min-w-[150px]",
      "h-full",
      "aspect-[3/2]",
      "p-2",
      "bg-lime-500",
      "hover:bg-lime-600",
      "rounded-2xl",
      "cursor-pointer"
    );

    const icon = button.querySelector("svg");
    expect(icon).toHaveClass(
      "absolute",
      "top-1/2",
      "left-1/2",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "text-4xl",
      "xl:text-6xl"
    );
  });

  it("matches dialog content structure", () => {
    // Open the dialog
    fireEvent.click(button);

    // Check dialog structure
    const dialog = screen.getByRole("dialog");
    const header = dialog.querySelector("[role='dialog-header']");
    const title = screen.getByText(`${mockMovieDetails.title} Trailer`);
    const iframe = screen.getByTitle("YouTube video player");

    expect(header).toContainElement(title);
    expect(dialog).toContainElement(iframe);
  });
});
