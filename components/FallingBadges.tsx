"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const badges = ["Developer", "Designer", "Researcher", "AI Expert", "Full Stack", "Creator"];

export default function FallingBadges() {
  const [fallingItems, setFallingItems] = useState<Array<{
    id: number;
    text: string;
    x: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const items = badges.map((badge, index) => ({
      id: index,
      text: badge,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setFallingItems(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {fallingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -100, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 0.3, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-xs font-bold text-cyan-500/20"
          style={{ left: `${item.x}%` }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
