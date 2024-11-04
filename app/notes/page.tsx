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

  async function deleteNote(noteId: string) {
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: noteId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting note:", errorData.error);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log(data.message); // Success message
      console.log("deleted");
    } catch (error) {
      // Type assertion to handle the unknown type
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      console.error("Error:", errorMessage);
    } finally {
      fetchData(); // Fetch notes after deleting a note
    }
  }
  // const updateNote = async (
  //   id: string,
  //   updatedTitle: string,
  //   updatedContent: string
  // ) => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/notes", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //         title: updatedTitle,
  //         content: updatedContent,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log("Note updated successfully:", result);

  //     // Refresh notes after updating
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error updating note:", error);
  //   }
  // };

  // console.log(notes);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen">
      <Navigation />
      <div
        className={`${
          !isOpen ? "opacity-100" : "opacity-10"
        } flex justify-center`}
      >
        {!isOpen && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2  justify-center grid-cols-1 gap-12  pt-12 pb-4 px-4 ">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                onClick={() => deleteNote(note._id)}
              />
            ))}
          </div>
        )}

        <Button
          type="secondary"
          className="absolute right-[1%] bottom-20 px-4 py-2"
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
