import { Hero } from "../types";

export default async function generateGptResponse(heroes: Hero[]) {
  const prompt = `What team name would you give to these heroes: ${JSON.stringify(heroes.map((hero) => ({ name: hero.name, description: hero.description })))}`;

  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "assistant",
          content:
            "You are an expert in all things Marvel comic books and movies. Your primary job is to take a JSON collection of Marvel characters and craft a unique and witty team name based on those characters. The team name should be relevant to the characters in the team and involve their abilities or attributes in some way. This team name should be unique and not already exist in the Marvel universe. Your response must be the team name and nothing else. Do not put quotations around the team name.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}
