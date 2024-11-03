import { useState } from "react";
import ColorButton from "../colorButton";

import Button from "../button";

import { FaRegTrashCan } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";

interface NoteCardProps {
  title: string;
  content: string;
  onClick: () => void;
}

export default function NoteCard({ title, content, onClick }: NoteCardProps) {
  const [colorChange, setColorChange] = useState("");

  const handleColorChange = (color: string) => {
    setColorChange(color === colorChange ? "" : color);
  };

  return (
    <div
      style={{
        backgroundColor:
          colorChange || "rgb(253, 224, 71 / var(--tw-border-opacity))", // Fix the color definition
      }}
      className={`border-2 border-slate-800 min-h-72 h-auto p-4 rounded-xl flex flex-col hover:scale-105 transition-all ease-in-out duration-300 hover:cursor-pointer font-roboto-mono w-72`}
    >
      <p className="text-center border-b-2 border-black">{title}</p>
      <p className="flex-grow pt-4">{content}</p>
      <div className="flex justify-between">
        <Button type="secondary" className="text-lg p-2 border-2 border-black">
          <RxUpdate />
        </Button>
        <ColorButton
          colorChange={colorChange}
          handleColorChange={handleColorChange}
        />
        <Button
          type="secondary"
          className="text-lg p-2 border-2 border-black"
          onClick={onClick}
        >
          <FaRegTrashCan />
        </Button>
      </div>
    </div>
  );
}
