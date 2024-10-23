import Button from "../button";

export default function CenterContent() {
  return (
    <div className="text-center gap-y-6 flex-1 flex items-center flex-col justify-center font-roboto-mono">
      <h1 className="text-5xl px-40 font-extralight">
        &quot;Capturing thoughts, ideas, and inspirations—one note at a
        time.&quot;
      </h1>
      <Button type="primary" url="/notes">
        Go to notes
      </Button>
    </div>
  );
}
