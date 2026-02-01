"use client"

import * as React from "react"
import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative rounded-full w-10 h-10 overflow-hidden transition-all duration-500",
        isDark 
          ? "bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
          : "bg-secondary hover:bg-secondary/80"
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun icon for light mode */}
        <Sun 
          className={cn(
            "absolute h-5 w-5 transition-all duration-500",
            isDark 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100 text-amber-500"
          )} 
        />
        {/* Moon + sparkles for dark mode */}
        <div 
          className={cn(
            "absolute flex items-center justify-center transition-all duration-500",
            isDark 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          )}
        >
          <Moon className="h-5 w-5 text-cyan-400" />
          <Sparkles className="absolute h-3 w-3 text-cyan-300 -top-1 -right-1 animate-pulse" />
        </div>
      </div>
      
      {/* Glow effect in dark mode */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 animate-pulse" />
      )}
    </Button>
  )
}
