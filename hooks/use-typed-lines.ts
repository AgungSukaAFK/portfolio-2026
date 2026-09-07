"use client";

import { useEffect, useState } from "react";

export interface TypedLine {
  prompt: string;
  output: string;
}

/** Types out each line's output in sequence, once, starting when `active` becomes true. */
export function useTypedLines(lines: TypedLine[], active: boolean, speed = 18) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const done = lineIndex >= lines.length;

  useEffect(() => {
    if (!active || done) return;

    const current = lines[lineIndex];

    if (charCount < current.output.length) {
      const id = setTimeout(() => setCharCount((c) => c + 1), speed);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharCount(0);
    }, 350);
    return () => clearTimeout(id);
  }, [active, done, lineIndex, charCount, lines, speed]);

  const completedLines = lines.slice(0, lineIndex).map((l) => l.output);
  const currentLine = lines[lineIndex]
    ? lines[lineIndex].output.slice(0, charCount)
    : null;

  return { completedLines, currentLine, done };
}
