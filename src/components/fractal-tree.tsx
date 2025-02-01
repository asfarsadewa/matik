"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Leaf, Sprout, RefreshCcw, Sun, Moon } from 'lucide-react';

const FractalTree = () => {
  // State to control procedural tree variations
  const [treeForm, setTreeForm] = useState({ branchOffset: Math.PI / 8, reduction: 0.75 });

  // State for night (true) / day (false) mode
  const [isNight, setIsNight] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(1);
  const [angle, setAngle] = useState(Math.PI / 4);
  const [maxDepth, setMaxDepth] = useState(15);

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    len: number,
    angle: number,
    depth: number,
    maxDepth: number
  ) => {
    if (depth > maxDepth) return;

    const endX = startX + Math.cos(angle) * len;
    const endY = startY + Math.sin(angle) * len;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `hsl(${(depth / maxDepth) * 120}, 70%, 50%)`;
    ctx.lineWidth = maxDepth - depth + 1;
    ctx.stroke();

    const newLen = len * treeForm.reduction;
    drawTree(ctx, endX, endY, newLen, angle - treeForm.branchOffset, depth + 1, maxDepth);
    drawTree(ctx, endX, endY, newLen, angle + treeForm.branchOffset, depth + 1, maxDepth);
  };

  // Type definition for a star
  type Star = { x: number; y: number; phase: number };

  // Reference to store star positions
  const starsRef = useRef<Star[]>([]);

  // Generate an array of stars within the top half of the canvas
  const generateStars = (canvas: HTMLCanvasElement) => {
    const starCount = 50;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.5), // Top half
        phase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  };

  // Draw stars with a twinkling effect based on time
  const drawStars = (ctx: CanvasRenderingContext2D, time: number) => {
    starsRef.current.forEach((star) => {
      const brightness = 0.5 + 0.5 * Math.sin(time * 0.005 + star.phase);
      ctx.beginPath();
      ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    const animate = (time: number) => {
      // Animate background based on night/day mode
      if (isNight) {
        ctx.fillStyle = '#001'; // dark background for night
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawStars(ctx, time); // draw twinkling stars
      } else {
        // Draw a gentle sky gradient for day mode
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#a3d8f4");  // light blue
        gradient.addColorStop(1, "#fff");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw the fractal tree on top with an initial branch length based on canvas height
      const initialBranchLength = canvas.height * 0.12;
      drawTree(ctx, canvas.width / 2, canvas.height, initialBranchLength, -Math.PI / 2, 1, depth);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [depth, angle, isNight]);

  return (
    <div className="relative h-screen w-full bg-slate-950">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Night/Day toggle button */}
      <div className="fixed top-6 left-6">
        <Button
          size="icon"
          onClick={() => setIsNight(!isNight)}
          className="rounded-full bg-slate-500 hover:bg-slate-600"
        >
          {isNight ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Max Depth Control */}
      <div className="fixed top-6 right-6 bg-white bg-opacity-80 p-2 rounded shadow">
        <label className="block text-sm text-gray-700 mb-1">
          Max Depth: {maxDepth}
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={maxDepth}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMaxDepth(value);
            if (depth > value) {
              setDepth(value);
            }
          }}
          className="w-32"
        />
      </div>

      {/* Growth and reset buttons */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2">
        <Button
          size="icon"
          onClick={() => setDepth(prev => Math.min(prev + 1, maxDepth))}
          className="rounded-full bg-emerald-600 hover:bg-emerald-700"
        >
          <Sprout className="h-5 w-5" />
        </Button>

        <Button
          size="icon"
          onClick={() => {
            setDepth(1);
            // Update treeForm with new random values for procedural variation
            setTreeForm({
              branchOffset: Math.PI / 8 + ((Math.random() - 0.5) * 0.2),
              reduction: 0.75 + ((Math.random() - 0.5) * 0.1)
            });
          }}
          className="rounded-full bg-red-600 hover:bg-red-700"
        >
          <RefreshCcw className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-1 text-emerald-500">
          <Leaf className="h-4 w-4" />
          <span className="font-mono text-sm">{depth}</span>
        </div>
      </div>
    </div>
  );
};

export default FractalTree; 