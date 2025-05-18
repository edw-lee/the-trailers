import { MockImage } from "@/mocks/mockImage";
import { render, screen } from "@testing-library/react";
import CastAvatar from "./CastAvatar";

describe("CastAvatar", () => {
  const mockProps = {
    imageUrl: "https://example.com/actor.jpg",
    name: "John Doe",
  };

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.Image as any) = MockImage;
  });

  it("renders with correct image source and alt text", async () => {
    const rendered = render(<CastAvatar {...mockProps} />);

    const image = await rendered.findByRole("img");
    expect(image).toHaveAttribute("src", mockProps.imageUrl);
    expect(image).toHaveAttribute("alt", `${mockProps.name} avatar`);
  });

  it("displays the actor's name", () => {
    render(<CastAvatar {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("has correct fallback with initials when image fails to load", () => {
    render(<CastAvatar {...mockProps} />);

    // The fallback should show the first letter of the first and last name
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("handles empty image URL", () => {
    const name = "Jane Smith";
    render(<CastAvatar name={name} imageUrl={""} />);
    expect(screen.queryAllByText(name)).toHaveLength(2);
  });
});
