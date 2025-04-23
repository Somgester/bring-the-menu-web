"use client"

import { useEffect, useRef } from "react"

export default function ConstructionAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: Particle[] = []
    const icons = [
      { icon: "🔨", size: 20 },
      { icon: "🔧", size: 18 },
      { icon: "⚙️", size: 22 },
      { icon: "🛠️", size: 24 },
      { icon: "📐", size: 20 },
    ]

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      icon: string
      rotation: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height

        const iconData = icons[Math.floor(Math.random() * icons.length)]
        this.icon = iconData.icon
        this.size = iconData.size

        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.1
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1
        }

        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.font = `${this.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.icon, 0, 0)
        ctx.restore()
      }
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw center construction icon
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.font = "60px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("🏗️", 0, 0)
      ctx.restore()

      // Update and draw particles
      particles.forEach((particle) => {
              particle.update(canvas)
              particle.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
