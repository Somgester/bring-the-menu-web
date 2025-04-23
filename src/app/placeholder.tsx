import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Linkedin, Youtube } from "lucide-react"
import ConstructionAnimation from "@/components/underconstruction"
 
export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 text-center">
      <div className="max-w-md mx-auto space-y-8 animate-fade-in">
        <div className="relative h-48 w-full">
          <ConstructionAnimation />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight animate-slide-up">Site Under Construction</h1>
          <p className="text-xl text-muted-foreground animate-slide-up animation-delay-200">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        <div className="pt-6 animate-slide-up animation-delay-400">
          <p className="text-sm text-muted-foreground mb-4">Join me on my journey as I build this website</p>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="lg" asChild className="group animate-bounce-subtle animation-delay-500">
              <Link
                href="https://www.linkedin.com/in/mohit-kumar-profile/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-5 w-5 group-hover:text-blue-600 transition-colors" />
                <span>LinkedIn</span>
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="group animate-bounce-subtle animation-delay-700">
              <Link
                href="https://www.youtube.com/playlist?list=PLGX2nx2JSkBsTgls_K0xhvuB6r9X_zjr0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="h-5 w-5 group-hover:text-red-600 transition-colors" />
                <span>YouTube</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full overflow-hidden h-32 pointer-events-none">
        <div className="construction-line"></div>
      </div>

      <footer className="mt-auto py-6 relative z-10">
        <p className="text-sm text-muted-foreground animate-pulse">&copy; {new Date().getFullYear()} • Coming Soon</p>
      </footer>
    </div>
  )
}
