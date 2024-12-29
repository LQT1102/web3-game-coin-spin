"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  result: "Heads" | "Tails" | null;
};

const CoinSpinning = ({ result }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationId = useRef<number | null>(null);
  const angle = useRef<number>(0);
  const headsUrl = "/images/Coin-Heads.png",
    tailsUrl = "/images/Coin-Tails.png";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Kích thước đồng xu
    const coinDiameter = 200;
    const coinRadius = coinDiameter / 2;

    canvas.width = coinDiameter + 10;
    canvas.height = coinDiameter + 10;

    // Tạo Image object
    const frontImage = new Image();
    const backImage = new Image();

    function drawCoin() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      const scaleX = Math.abs(Math.cos(angle.current));
      const radius = coinRadius * scaleX;
      const isFront = Math.cos(angle.current) > 0;

      // Bắt đầu vẽ đường elip
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height / 2, radius, coinRadius, 0, 0, Math.PI * 2); // Điều chỉnh toạ độ của ellipse
      ctx.strokeStyle = isFront ? "darkgoldenrod" : "darkgray";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.clip();

      if (isFront) {
        ctx.drawImage(
          frontImage,
          canvas.width / 2 - coinRadius, //canh giữa theo chiều x
          canvas.height / 2 - coinRadius, //canh giữa theo chiều y
          coinDiameter,
          coinDiameter
        );
      } else {
        ctx.drawImage(
          backImage,
          canvas.width / 2 - coinRadius,
          canvas.height / 2 - coinRadius,
          coinDiameter,
          coinDiameter
        );
      }

      ctx.restore();
    }

    function updateIndefinitely() {
      angle.current += 0.1;
      drawCoin();
      animationId.current = requestAnimationFrame(updateIndefinitely);
    }

    function updateToResult() {
      const targetAngle = result === "Heads" ? 0 : Math.PI;
      let diff = targetAngle - (angle.current % (Math.PI * 2));

      while (diff < 0) {
        diff += Math.PI * 2;
      }
      diff = diff % (Math.PI * 2);

      if (Math.abs(diff) < 0.01) {
        angle.current = targetAngle;
        if (animationId.current) {
          cancelAnimationFrame(animationId.current);
        }
      } else {
        const easeOutCubic = (t: number) => --t * t * t + 1;
        angle.current += diff * 0.05 * easeOutCubic((Math.PI * 2 - diff) / (Math.PI * 2));
        drawCoin();
        animationId.current = requestAnimationFrame(updateToResult);
      }
    }

    // Load hình ảnh và bắt đầu animation khi ảnh load xong
    frontImage.onload = () => {
      backImage.onload = () => {
        if (result === null) {
          if (animationId.current) cancelAnimationFrame(animationId.current);
          animationId.current = requestAnimationFrame(updateIndefinitely);
        } else {
          if (animationId.current) cancelAnimationFrame(animationId.current);
          animationId.current = requestAnimationFrame(updateToResult);
        }
      };
    };
    frontImage.src = headsUrl;
    backImage.src = tailsUrl;

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [result, headsUrl, tailsUrl]);

  return (
    <div className="h-[250px] w-[250px] relative">
      <canvas
        className="absolute top-0 left-0"
        ref={canvasRef}
        id="coinCanvas"
        style={{
          display: "block",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CoinSpinning;
