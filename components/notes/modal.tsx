import Button from "@/components/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function Modal({ handleClick }: { handleClick: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [letterCount, setLetterCount] = useState(0);
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    setLetterCount(0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(title, content);
    e.preventDefault(); // Prevent the default form submission behavior
    handleClick(); // Close the modal
  };
  //   useEffect(() => {}, [letterCount]);
  return (
    <motion.div
      className="flex justify-center items-center h-1/2 font-roboto-mono"
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
        className="absolute left-20 top-10"
        onClick={handleClick}
      >
        <IoArrowBack />
      </Button>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="border-2 border-yellow-400 text-lg flex flex-col w-[55%] rounded-xl bg-yellow-100 px-4 py-2 placeholder-slate-200"
      >
        <div className="pb-2">
          <input
            type="text"
            placeholder="Title"
            className="bg-yellow-100 w-full border-b-2 border-yellow-300 outline-none text-center "
            autoFocus
            value={title} // Bind the input value to the state
            onChange={(e) => setTitle(e.target.value)} // Update state on change
          />
        </div>
        <div>
          <textarea
            className="bg-yellow-100 w-full h-52 outline-none border-yellow-300 border-2 p-2"
            placeholder="To remember..."
            content={content}
            onChange={(e) => {
              setContent(e.target.value);
              setLetterCount(e.target.value.length);
            }}
          />
        </div>
        <div className="flex justify-between text-sm pb-1">
          <p>{letterCount}/160 Characters </p>

          <p className="text-end">date & time</p>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </motion.div>
  );
}
