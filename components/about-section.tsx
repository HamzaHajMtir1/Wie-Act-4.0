import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Award } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Users,
      title: "Community Building",
      description:
        "Creating supportive networks where women engineers can connect, collaborate, and grow together in their careers.",
    },
    {
      icon: Target,
      title: "Skill Development",
      description:
        "Providing targeted training programs, workshops, and resources to help women excel in technical and leadership roles.",
    },
    {
      icon: Heart,
      title: "Mentorship",
      description:
        "Connecting experienced professionals with emerging talent to foster growth, confidence, and career advancement.",
    },
    {
      icon: Award,
      title: "Recognition",
      description:
        "Celebrating achievements and highlighting the contributions of women in engineering to inspire the next generation.",
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
            We're dedicated to creating an inclusive environment where women in engineering can thrive, innovate, and
            lead the future of technology. Our comprehensive approach focuses on education, mentorship, and community
            support.
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
              We envision a world where gender equality in engineering is not just an aspiration, but a reality. Through
              our initiatives, we're working to eliminate barriers, challenge stereotypes, and create opportunities for
              women to excel in all areas of engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full">Innovation</span>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Equality</span>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full">Empowerment</span>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
