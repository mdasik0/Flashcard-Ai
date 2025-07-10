"use client";
import React from "react";

export default function Home() {
  const [prompt, setPrompt] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  return (
<div className="flex items-center justify-center w-[calc(100%-60px)] relative">
  <textarea
    ref={textareaRef}
    onChange={(e) => setPrompt(e.target.value)}
    className="bg-green-50/10 p-3 ps-4 rounded-xl focus:outline-0 w-1/3 resize-none overflow-hidden min-h-[24px] max-h-[200px] absolute z-20 top-0 left-1/2 transform -translate-x-1/2"
    name="prompt-input"
    id="prompt-input"
    placeholder="Type your message..."
    rows={1}
    style={{ lineHeight: "1.5" }}
  />
  <div className="bg-white/20 w-[510px] h-[48px] absolute z-10 top-0 left-1/2 transform -translate-x-1/2">
  </div>
</div>
  );
}
