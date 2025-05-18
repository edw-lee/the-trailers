import { mockMovieDetails } from "@/mocks/movieDetailsMock";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import Banner from "./Banner";

describe("Banner", () => {
  it("renders correctly", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("displays the movie title", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    expect(screen.getByText(mockMovieDetails.title)).toBeInTheDocument();
  });

  it("displays up to 3 main cast members", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    mockMovieDetails.casts.forEach((cast) => {
      expect(screen.getByText(cast.name)).toBeInTheDocument();
    });
  });

  it("displays up to 3 genres as badges", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    mockMovieDetails.genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it("displays the movie poster with correct attributes", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockMovieDetails.backdropLowResUrl);
    expect(image).toHaveAttribute(
      "srcset",
      `${mockMovieDetails.backdropLargeUrl} highRes, ${mockMovieDetails.backdropSmallUrl} lowRes`
    );
  });

  it("displays the PlayButton component", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("formats the release date correctly", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    const formattedDate = dayjs(mockMovieDetails.releaseDate).format(
      "MMM DD, YY"
    );
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("formats the budget with compact notation", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    const formattedBudget = `$${Intl.NumberFormat("en", {
      notation: "compact",
    }).format(mockMovieDetails.budget)}`;
    expect(screen.getByText(formattedBudget)).toBeInTheDocument();
  });

  it("displays the duration in minutes", () => {
    render(<Banner movieDetails={mockMovieDetails} />);
    expect(
      screen.getByText(`${mockMovieDetails.duration} min`)
    ).toBeInTheDocument();
  });
});
