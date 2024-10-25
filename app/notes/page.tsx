"use client";
import Button from "@/components/button";
import Modal from "@/components/notes/modal";
import Navigation from "@/components/navigation";
import { useState, useEffect } from "react";
import NoteCard from "@/components/notes/noteCard";
import Loading from "@/components/loading";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/notes");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setNotes(result.data || []); // Assuming result.data is the array of notes
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch notes on component mount
  }, []);

  console.log(notes);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <Navigation />
      <div className={`${!isOpen ? "opacity-100" : "opacity-10"}`}>
        {!isOpen && (
          <div className="flex flex-row flex-wrap gap-y-8 gap-x-8 h-[60%] overflow-y-auto justify-center pt-12 pb-4 px-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
              />
            ))}
          </div>
        )}

        <Button
          type="secondary"
          className="absolute right-10 top-20 px-4 py-2"
          onClick={handleClick}
        >
          +
        </Button>
      </div>
      {isOpen && <Modal handleClick={handleClick} onNoteAdded={fetchData} />}
    </div>
  );
};

export default Page;
