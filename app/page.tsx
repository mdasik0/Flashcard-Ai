"use client";
import React from "react";

export default function Home() {
  const [prompt, setPrompt] = React.useState("");
  const [inputH, setInputH] = React.useState(110);
  const [isFocused, setIsFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  console.log(`h-[${inputH}px]`)

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
        setInputH(textareaRef.current.scrollHeight + 54)
    }
  }, [prompt]);

  return (
    <>
      <style jsx>{`
        .animated-container {
          transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          overflow: hidden;
        }
      `}</style>
      
      <div className="flex items-center justify-center w-[calc(100%-60px)]">
        <div className="input-container relative">
          <textarea 
            ref={textareaRef}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="bg-stone-800 w-[500px] min-h-[24px] max-h-[200px] resize-none overflow-hidden rounded-xl p-4 absolute left-[6px] top-[6px] focus:outline-0 text-white z-10" 
            placeholder="Something..."
            rows={1}
            style={{ lineHeight: "1.5" }}
          />
          <div 
            className="animated-container bg-gray-300 w-[512px] max-h-[254px] rounded-2xl px-2 flex flex-col items-start justify-end" 
            style={{ 
              height: (isFocused || prompt) ? `${inputH}px` : '68px',
              opacity: (isFocused || prompt) ? 1 : 0.3
            }}
          >
            <div className="ele bg-stone-950 mb-2 px-4 py-1 rounded-xl text-white">generate</div>
          </div>
        </div>
      </div>
    </>
  );
}