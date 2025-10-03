import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TeamSection } from "@/components/team-section"
import { AIAgentChat } from "@/components/ai-agent-chat"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <AIAgentChat />
    </div>
  )
}
