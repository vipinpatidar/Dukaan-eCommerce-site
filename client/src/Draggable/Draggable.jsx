import { useState, useRef } from "react";

const Draggable = ({ children }) => {
  const ourRef = useRef(null);

  const [isMousedown, setIsMousedown] = useState(false);

  const mouseCoords = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const categories = document.querySelector(".categories");

  // const [isScrolling, setIsScrolling] = useState(false);

  const handleDragStart = (e) => {
    if (!ourRef.current) return;

    const slider = ourRef.current.children[0];

    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    mouseCoords.current = { startX, scrollLeft };

    setIsMousedown(true);
    categories.style.cursor = "grabbing";
  };

  const handleDragEnd = () => {
    setIsMousedown(false);
    if (!ourRef.current) return;
    categories.style.cursor = "default";
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (!isMousedown || !ourRef.current) return;

    const slider = ourRef.current.children[0];

    const x = e.pageX - slider.offsetLeft;

    const walkX = (x - mouseCoords.current.startX) * 1.5;

    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
  };

  return (
    <div
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
    >
      {children}
    </div>
  );
};

export default Draggable;
