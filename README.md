# Assemble! | Marvel Heroes & Villains Team Builder

![Image](./public/logo192.png)

## Requirements

- Get an API Key for the Marvel API https://developer.marvel.com/
- Provide a search box to allow searching for a character by name
- Display character information and at least one image of the characters found through the search results
- Allow the user to add a superhero to their team from the search results.
- Provide a view that shows the superhero team.
- Provide the ability to remove a hero from the team.

## Stack

- React (Create React App)
- CSS modules
- CryptoJS (hash generation for Marvel API)
- Jest & React-testing library

In a personal project, I might add to this list -- Next.js or other fully-featured framework, React-jss or tailwind, a UI library like Chakra UI, Axios over fetch, but for technical demonstrations I kept everything as vanilla as possible.

## Bonus Features

- Server-side pagination: Marvel's API limits results to 100 characters max, so fetching/caching the entire library and searching client-side was not an option.
- Team name: Once five heroes are selected, a request is sent to OpenAI to generate a unique team name based on the collection of characters.
- Thanos snap: After a team name is generated, you can click the "Thanos" button to delete half the team -- two or three members at random.
- Tweet team: Opens a draft in a new window with the team name, members, and a CTA to create a team of your own.
- Open the app on mobile for a fun message

## How I Would Scale

- Global state management: I'm not a fan of useState and prop drilling but thought it was simplistic and fitting for a single state (team) at the root level with just one layer of components accepting the state. If the app were to grow I would use React Context or another reducer/store for better management.

## Challenges

- Marvel's API limitations: Max response of 100 characters and a `startsWith` parameter that lets you search the beginning of a name but not the middle or end. For example "Spider" will fetch "Spider-Man (Peter Parker)" but "Parker" will not fetch the same result.
