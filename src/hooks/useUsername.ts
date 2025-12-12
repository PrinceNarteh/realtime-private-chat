import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = [
  "lion",
  "bear",
  "elephant",
  "giraffe",
  "penguin",
  "kangaroo",
  "dolphin",
  "zebra",
  "cheetah",
  "ostrich",
  "chimpanzee",
];
const STORAGE_KEY = "chat_username";

const generateUsername = () => {
  const username = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${username}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const main = () => {
      const storedUsername = localStorage.getItem(STORAGE_KEY);
      if (storedUsername) {
        setUsername(storedUsername);
        return;
      }

      const generatedUsername = generateUsername();
      localStorage.setItem(STORAGE_KEY, generatedUsername);
      setUsername(generatedUsername);
    };

    main();
  }, []);

  return { username };
};
