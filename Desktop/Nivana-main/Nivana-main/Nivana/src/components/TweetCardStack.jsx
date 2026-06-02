"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TweetCardStack() {
  const mockTweets = [
    { id: "1", author: "Sarah Johnson", handle: "@sarahjohn", avatar: "🧘‍♀️", content: "Just completed my first meditation session with Mindnest. Feeling peaceful.", timestamp: "2h ago", likes: 234 },
    { id: "2", author: "Alex Chen", handle: "@alexchen", avatar: "👨‍💼", content: "The quick self-check really helped me understand my stress levels better.", timestamp: "4h ago", likes: 189 },
    { id: "3", author: "Maya Patel", handle: "@mayapatel", avatar: "🎯", content: "Journaling prompts from Mindnest are incredible. Highly recommend!", timestamp: "6h ago", likes: 567 },
    { id: "4", author: "Jordan Smith", handle: "@jordansmith", avatar: "🌟", content: "Using the mood tracker has revealed patterns I never noticed before.", timestamp: "8h ago", likes: 423 },
    { id: "5", author: "Riley Kim", handle: "@rileykim", avatar: "💚", content: "The ambient soundscapes are perfect for my evening wind-down routine.", timestamp: "10h ago", likes: 312 },
  ]

  const [displayedCount, setDisplayedCount] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)
  const scrollAccumRef = useRef(0)

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (!entry.isIntersecting) scrollAccumRef.current = 0
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Smooth scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isInView) return
      if (displayedCount >= mockTweets.length && e.deltaY > 0) return
      if (displayedCount <= 1 && e.deltaY < 0) return

      e.preventDefault()
      scrollAccumRef.current += e.deltaY
      const SCROLL_THRESHOLD = 120
      const tweetDelta = Math.floor(Math.abs(scrollAccumRef.current) / SCROLL_THRESHOLD)

      if (tweetDelta > 0) {
        const direction = scrollAccumRef.current > 0 ? 1 : -1
        setDisplayedCount(prev =>
          Math.max(1, Math.min(prev + direction, mockTweets.length))
        )
        scrollAccumRef.current = 0
      }
    }

    if (isInView) {
      window.addEventListener("wheel", handleWheel, { passive: false })
      return () => window.removeEventListener("wheel", handleWheel)
    }
  }, [isInView, displayedCount])

  return (
    <section
      id="community"
      ref={containerRef}
      className="py-10 px-4 bg-gradient-meadow overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-7xl mb-4 block animate-float">🌻</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            What Our{" "}
            <span className="joy-gradient-text">Community</span>{" "}
            Says
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Scroll to reveal tweets one by one.
          </p>
        </div>

        {/* Tweet Stack */}
        <div className="flex justify-center items-start py-1">
          <div className="relative w-full max-w-xl h-[280px]">
            <AnimatePresence>
              {mockTweets.map((tweet, index) => {
                const isVisible = index < displayedCount
                const offset = index * 10

                return (
                  isVisible && (
                    <motion.div
                      key={tweet.id}
                      initial={{ opacity: 0, y: 50, scale: 0.92 }}
                      animate={{ opacity: 1, y: offset, scale: 1 }}
                      exit={{ opacity: 0, y: 50, scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 180, damping: 22 }}
                      className="absolute inset-0 z-10"
                    >
                      <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/50">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-linear-to-br from-teal-300 to-blue-400 flex items-center justify-center text-2xl">
                              {tweet.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-[#163020]">
                                {tweet.author}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {tweet.handle}
                              </div>
                            </div>
                          </div>
                          
                        </div>

                        {/* Content */}
                        <p className="text-[#355f4b] mb-6 text-[15px] leading-relaxed">
                          {tweet.content}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-black/5">
                          <button className="text-sm text-muted-foreground">
                            ❤️ {tweet.likes}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="text-sm text-muted-foreground ">
            You’ve explored{" "}
            <span className="font-semibold text-[#163020]">
              {displayedCount}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#163020]">
              {mockTweets.length}
            </span>{" "}
            community voices 🌿
          </div>

          {/* soft progress bar */}
          <div className="w-40 h-1 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(displayedCount / mockTweets.length) * 100}%`,
                background:
                  "linear-gradient(to right, var(--joy-spring), var(--joy-meadow))",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
