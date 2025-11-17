import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Tooltip.css";

interface TooltipProps {
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
}

const GAP = 6; // distance between tooltip and element

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = "top",
  bgColor = "#000",
  textColor = "#fff",
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });

  const updatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const el = wrapperRef.current.getBoundingClientRect();
    const tt = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = el.top - tt.height - GAP;
        left = el.left + el.width / 2 - tt.width / 2;
        break;

      case "bottom":
        top = el.bottom + GAP;
        left = el.left + el.width / 2 - tt.width / 2;
        break;

      case "left":
        top = el.top + el.height / 2 - tt.height / 2;
        left = el.left - tt.width - GAP;
        break;

      case "right":
        top = el.top + el.height / 2 - tt.height / 2;
        left = el.right + GAP;
        break;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (visible) updatePosition();
  }, [visible]);

  useEffect(() => {
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  });

  return (
    <>
      <div
        ref={wrapperRef}
        className="d-inline-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {ReactDOM.createPortal(
        <span
          ref={tooltipRef}
          className={`tooltip-global ${visible ? "show" : ""}`}
          style={{
            top: coords.top,
            left: coords.left,
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          {text}
        </span>,
        document.body
      )}
    </>
  );
};

export default Tooltip;
