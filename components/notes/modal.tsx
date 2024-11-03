import Button from "@/components/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function Modal({
  handleClick,
  onNoteAdded,
}: {
  handleClick: () => void;
  onNoteAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [letterCount, setLetterCount] = useState(0);

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    setLetterCount(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noteData = { title, content };

    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const result = await response.json();
      console.log("Note created:", result);

      // Reset form and notify parent to refresh notes
      handleReset(e);
      onNoteAdded(); // Call the fetch function from the parent
      handleClick(); // Close the modal
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  return (
    <motion.div
      className="font-roboto-mono px-10 pt-20"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Button
        type="back"
        className="absolute left-[1%] top-5"
        onClick={handleClick}
      >
        <IoArrowBack />
      </Button>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="border-2 border-yellow-400 text-lg flex flex-col rounded-xl bg-yellow-100 px-4 py-2 mx-auto w-full lg:w-3/4"
      >
        <div className="pb-2">
          <input
            type="text"
            placeholder="Title"
            className="bg-yellow-100 w-full border-b-2 border-yellow-300 outline-none text-center"
            autoFocus
            value={title} // Bind the input value to the state
            onChange={(e) => setTitle(e.target.value)} // Update state on change
          />
        </div>
        <div>
          <textarea
            className="bg-yellow-100 w-full h-52 outline-none border-yellow-300 border-2 p-2"
            placeholder="To remember..."
            value={content} // Corrected to value instead of content
            onChange={(e) => {
              setContent(e.target.value);
              setLetterCount(e.target.value.length);
            }}
          />
        </div>
        <div className="flex justify-between text-sm pb-1">
          <p>{letterCount}/160 Characters</p>
          <p className="text-end">date & time</p>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </motion.div>
  );
}
