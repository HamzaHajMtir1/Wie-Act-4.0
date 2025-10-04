import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, TrendingUp, Cpu, Sprout } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Sprout,
      title: "Community Support",
      description:
        "Building a strong network between farmers and companies to share experiences, solve challenges, and grow together.",
    },
    {
      icon: Cpu,
      title: "Smart Assistance",
      description:
        "Providing digital tools and real-time guidance to make farming tasks easier, faster, and more efficient.",
    },
    {
      icon: ShieldCheck,
      title: "Safety & Well-being",
      description:
        "Ensuring farmers’ safety through continuous monitoring, alerts, and preventive measures to reduce risks during work.",
    },
    {
      icon: TrendingUp,
      title: "Productivity Boost",
      description:
        "Helping companies enhance agricultural performance through data insights, optimized resource use, and better coordination with workers.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
            <span className="text-foreground">About Our </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            We’re dedicated to transforming agriculture through technology and safety innovation.
            Our mission is to simplify farmers’ daily work, ensure their well-being, and help companies 
            improve productivity while promoting sustainable practices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="gradient-card border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Vision for the Future</h3>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-6">
              We envision a future where technology empowers every farmer, making agriculture smarter, safer, and more sustainable.
              By bridging the gap between farmers and agricultural firms, we aim to boost efficiency, protect workers, and drive 
              innovation for a greener planet.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full">Innovation</span>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Collaboration </span>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full">Safety </span>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Efficiency </span>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full">Sustainability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
