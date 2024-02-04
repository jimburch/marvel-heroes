import React from "react";
import { render, screen } from "@testing-library/react";
import Team from "./Team";

test('renders "Recruit Your Heroes" text when team is empty', () => {
  render(<Team team={[]} setTeam={() => {}} />);
  const textElement = screen.getByText(/Recruit Your Heroes/i);
  expect(textElement).toBeInTheDocument();
});

test('renders "Choose X more to complete your team" text when team has less than 5 members', () => {
  const team = [
    {
      id: 1,
      name: "Hulk",
      description: "The Incredible Hulk",
      thumbnail: {
        path: "https://example.com/images/hulk",
        extension: "jpg",
      },
    },
  ];
  render(<Team team={team} setTeam={() => {}} />);
  const textElement = screen.getByText(/Choose 4 more to complete your team/i);
  expect(textElement).toBeInTheDocument();
});

test('renders "Disband" button for each team member', () => {
  const team = [
    {
      id: 1,
      name: "Hulk",
      description: "The Incredible Hulk",
      thumbnail: {
        path: "https://example.com/images/hulk",
        extension: "jpg",
      },
    },
    {
      id: 2,
      name: "Thor",
      description: "The Mighty Thor",
      thumbnail: {
        path: "https://example.com/images/thor",
        extension: "jpg",
      },
    },
  ];
  render(<Team team={team} setTeam={() => {}} />);
  const buttonElements = screen.getAllByRole("button", { name: /Disband/i });
  expect(buttonElements).toHaveLength(team.length);
});
