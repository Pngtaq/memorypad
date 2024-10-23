"use client";
import Button from "@/components/button";
import Modal from "@/components/notes/modal";
import Navigation from "@/components/navigation";

import NoteCard from "@/components/notes/noteCard";
import { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState<Array<string> | null>([]); // Replace 'any' with the actual type if known
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred");
        }
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, []);

  // if (loading)
  //   return (
  //     <div className="h-screen text-center flex justify-center items-center">
  //       Loading...
  //     </div>
  //   );
  // if (error) return <div>Error: {error}</div>;

  console.log(data);

  return (
    <div className="h-screen relative ">
      <Navigation />
      <div className={`${!isOpen || "opacity-10"}`}>
        {!isOpen && (
          <div className="flex flex-row flex-wrap gap-y-8 gap-x-8 h-[60%] overflow-y-auto justify-center pt-12 pb-4 px-4">
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
        )}

        {/* {!isOpen && <NoContent />} */}

        <Button
          type="secondary"
          className="absolute right-10 bottom-10 px-4 py-2"
          onClick={handleClick}
        >
          +
        </Button>
      </div>
      {isOpen && <Modal handleClick={handleClick} />}
    </div>
  );
};

export default Page;
