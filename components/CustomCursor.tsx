"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails(prev => [...prev.slice(-5), newTrail]);
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, input, textarea, [role="button"], .cursor-pointer');
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Trail Effects */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 pointer-events-none z-[9998]"
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
          }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-cyan-500 mix-blend-difference pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-cyan-500/50 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}
