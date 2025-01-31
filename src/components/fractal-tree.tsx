"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Leaf, Sprout } from 'lucide-react';

const FractalTree = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(1);
  const [angle, setAngle] = useState(Math.PI / 4);

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

    const newLen = len * 0.75;
    drawTree(ctx, endX, endY, newLen, angle - Math.PI / 8, depth + 1, maxDepth);
    drawTree(ctx, endX, endY, newLen, angle + Math.PI / 8, depth + 1, maxDepth);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTree(ctx, canvas.width / 2, canvas.height, 80, -Math.PI / 2, 1, depth);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [depth, angle]);

  return (
    <div className="relative h-screen w-full bg-slate-950">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="fixed bottom-6 right-6 flex items-center gap-2">
        <Button
          size="icon"
          onClick={() => setDepth(prev => Math.min(prev + 1, 50))}
          className="rounded-full bg-emerald-600 hover:bg-emerald-700"
        >
          <Sprout className="h-5 w-5" />
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