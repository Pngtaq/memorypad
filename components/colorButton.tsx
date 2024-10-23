export default function ColorButton({
  handleColorChange,
  colorChange,
}: {
  handleColorChange: (color: string) => void;
  colorChange: string;
}) {
  return (
    <div className="space-x-2">
      <button
        onClick={() =>
          handleColorChange("rgb(253 224 71 / var(--tw-border-opacity))")
        }
        className={`p-2 bg-yellow-300 rounded-full ${
          colorChange === "rgb(253 224 71 / var(--tw-border-opacity))"
            ? "border-2 border-black"
            : "border-0"
        }`}
      ></button>
      <button
        onClick={() => handleColorChange("rgb(147 197 253)")}
        className={`p-2 bg-blue-300 rounded-full ${
          colorChange === "rgb(147 197 253)"
            ? "border-2 border-black"
            : "border-0"
        }`}
      ></button>
      <button
        onClick={() => handleColorChange("rgb(253 186 116)")}
        className={`p-2 bg-orange-300 rounded-full ${
          colorChange === "rgb(253 186 116)"
            ? "border-2 border-black"
            : "border-0"
        }`}
      ></button>
      <button
        onClick={() => handleColorChange("rgb(251 207 232)")}
        className={`p-2 bg-pink-200 rounded-full ${
          colorChange === "rgb(251 207 232)"
            ? "border-2 border-black"
            : "border-0"
        }`}
      ></button>
      <button
        onClick={() => handleColorChange("rgb(167 243 208)")}
        className={`p-2 bg-emerald-200 rounded-full ${
          colorChange === "rgb(167 243 208)"
            ? "border-2 border-black"
            : "border-0"
        }`}
      ></button>
    </div>
  );
}
