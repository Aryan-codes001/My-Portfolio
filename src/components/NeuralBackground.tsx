"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;      // Opacity multiplier
  isBurst?: boolean;  // Mark clicked elements
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];
    const baseParticleCount = Math.min(Math.floor((width * height) / 9500), 90);
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000, radius: 180 };

    // Floating ambient orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, rx: 250, ry: 250, vx: 0.15, vy: 0.1, color: "rgba(30, 58, 138, 0.2)" }, // Deep blue
      { x: width * 0.8, y: height * 0.7, rx: 320, ry: 320, vx: -0.1, vy: 0.15, color: "rgba(88, 28, 135, 0.15)" }, // Deep purple
      { x: width * 0.5, y: height * 0.5, rx: 200, ry: 200, vx: 0.08, vy: -0.08, color: "rgba(6, 182, 212, 0.08)" } // Soft cyan
    ];

    // Initialize base particles
    for (let i = 0; i < baseParticleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 2 + 1,
        alpha: 1.0
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn burst particles on click
      const burstCount = 10;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.6;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1.5,
          alpha: 1.0,
          isBurst: true
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update floating ambient orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce check
        if (orb.x < 0 || orb.x > width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > height) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, Math.max(orb.rx, orb.ry));
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, Math.max(orb.rx, orb.ry), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // 2. Filter out faded burst particles
      particles = particles.filter(p => !p.isBurst || p.alpha > 0.01);

      // 3. Update & Draw Particles
      particles.forEach((p) => {
        if (p.isBurst) {
          p.alpha -= 0.015; // Fade burst particles
        }

        // Apply mouse gravitation to standard particles
        if (!p.isBurst && mouse.x !== -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.vx += (dx / dist) * force * 0.022;
            p.vy += (dy / dist) * force * 0.022;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Velocity dampening & limits
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = p.isBurst ? 3.0 : 0.8;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Boundary bounce check
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isBurst) {
          ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`; // Cyan burst spark
        } else {
          ctx.fillStyle = "rgba(59, 130, 246, 0.4)"; // Blue standard node
        }
        ctx.fill();
      });

      // 4. Draw Connections (Standard Web & Cursor Halo Links)
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];

        // Draw glowing line from active cursor to nodes in range
        if (!pi.isBurst && mouse.x !== -1000) {
          const dx = mouse.x - pi.x;
          const dy = mouse.y - pi.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius - 20) {
            const alpha = (1 - dist / (mouse.radius - 20)) * 0.22;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(pi.x, pi.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`; // Cyan halo link
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const baseAlpha = 1 - dist / connectionDistance;
            const alpha = baseAlpha * 0.16 * Math.min(pi.alpha, pj.alpha);
            
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            
            if (pi.isBurst || pj.isBurst) {
              ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 1.5})`; // Cyan for spark links
              ctx.lineWidth = 0.9;
            } else {
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`; // Blue for standard links
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-black"
    />
  );
}
