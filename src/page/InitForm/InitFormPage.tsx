import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import axios from "axios";
import { useState } from "react";

export function InitFormPage() {
  const answer = "APPLE"; // This should be replaced with the actual answer logic
  const [result, setResults] = useState<{ letter: string; status: string }[][]>(
    []
  );
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);

  const fetchItems = async () => {
    if (word.length !== 5) {
      setError(true);
      return;
    }
    // compare the word with the answer
    const wordArray = word.split("").map((letter) => letter.toUpperCase());
    const answerArray = answer.split("").map((letter) => letter.toUpperCase());
    const compareArray = wordArray.map((letter, index) => {
      if (letter === answerArray[index]) {
        return { letter, status: "correct" }; // Correct position
      } else if (answerArray.includes(letter)) {
        return { letter, status: "present" }; // Present but wrong position
      } else {
        return { letter, status: "absent" }; // Not present
      }
    });
    setResults((prevResults) => [...prevResults, compareArray]);
    console.log("Result:", result);
    setWord(""); // Clear the input after submission
    setError(false); // Reset error state
  };

  const resetInput = () => {
    console.log("resetInput");
    setWord("");
    setError(false);
  };
  return (
    <>
      <div>
        {result.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2 mb-2">
            {row.map((item, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center border ${
                  item.status === "correct"
                    ? "bg-green-500 text-white"
                    : item.status === "present"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {item.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Enter your word</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="word"
                  placeholder="Enter a word"
                  onChange={(e) => setWord(e.target.value)}
                  value={word.toUpperCase()}
                  minLength={5}
                  maxLength={5}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent form submission on Enter key
                      fetchItems();
                    }
                  }}
                />
                {error && (
                  <div className="text-xs text-muted-foreground text-red-500">
                    Please enter a 5-letter word.
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={resetInput} variant="outline">
            Reset
          </Button>
          <Button onClick={fetchItems}>Guess</Button>
        </CardFooter>
      </Card>
    </>
  );
}
