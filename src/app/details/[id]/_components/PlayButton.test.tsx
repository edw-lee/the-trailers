// src/app/details/[id]/_components/PlayButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "./PlayButton";
import { MovieDetailsDto } from "@/dtos/movieDetails/MovieDetailsDto";

const mockMovieDetails: MovieDetailsDto = {
  id: "1",
  title: "Inception",
  backdropLargeUrl: "https://example.com/backdrop-large.jpg",
  backdropSmallUrl: "https://example.com/backdrop-small.jpg",
  backdropLowResUrl: "https://example.com/backdrop-low-res.jpg",
  casts: [
    {
      id: "1",
      name: "Leonardo DiCaprio",
      imageUrl: "https://example.com/leonardo.jpg",
    },
  ],
  description:
    "A thief who steals corporate secrets through the use of dream-sharing technology.",
  genres: ["Action", "Sci-Fi"],
  pg: "PG-13",
  rating: 8.8,
  releaseDate: "2010-07-16",
  budget: 160000000,
  duration: 148,
  youtubeId: "testYoutubeId123",
};

describe("PlayButton", () => {
  it("renders the play button with correct accessibility attributes", () => {
    render(<PlayButton movieDetails={mockMovieDetails} />);

    const button = screen.getByRole("button", { name: /play-button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "play button");
  });

  it("opens the dialog when the button is clicked", () => {
    render(<PlayButton movieDetails={mockMovieDetails} />);

    const button = screen.getByRole("button", { name: /play-button/i });
    fireEvent.click(button);

    // Check if dialog content is rendered
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMovieDetails.title} Trailer`)
    ).toBeInTheDocument();
  });

  it("displays the YouTube iframe with correct src", () => {
    render(<PlayButton movieDetails={mockMovieDetails} />);

    // Open the dialog
    const button = screen.getByRole("button", { name: /play-button/i });
    fireEvent.click(button);

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining(mockMovieDetails.youtubeId)
    );
  });

  it("applies correct styling classes", () => {
    render(<PlayButton movieDetails={mockMovieDetails} />);

    const button = screen.getByRole("button", { name: /play-button/i });
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
    render(<PlayButton movieDetails={mockMovieDetails} />);

    // Open the dialog
    const button = screen.getByRole("button", { name: /play-button/i });
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
