"use client";

import { useEffect, useState } from "react";

interface Options {
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
}

/** Types out each string in `words`, holds it, deletes it, then moves on — loops forever. */
export function useCyclingText(words: string[], options: Options = {}) {
  const { typeSpeed = 45, deleteSpeed = 25, holdMs = 1800 } = options;
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const id = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("holding"), holdMs);
      return () => clearTimeout(id);
    }

    if (phase === "holding") {
      const id = setTimeout(() => setPhase("deleting"), holdMs);
      return () => clearTimeout(id);
    }

    if (text.length > 0) {
      const id = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deleteSpeed,
      );
      return () => clearTimeout(id);
    }
    // Deletion just finished — hop to the next word on the same timer
    // cadence as every other transition above, instead of synchronously.
    const id = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }, 0);
    return () => clearTimeout(id);
  }, [text, phase, wordIndex, words, typeSpeed, deleteSpeed, holdMs]);

  return text;
}
