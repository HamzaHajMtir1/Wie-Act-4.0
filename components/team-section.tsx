"use client"

import { useState } from "react"
import { Linkedin, Github, Twitter, Star, Award, Code, Users, Heart, Sparkles, Crown, Zap, ChevronRight } from "lucide-react"

export function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("team")

  const teamMembers = [
    {
      name: "Dr. Hamza Chen",
      role: "Founder & CEO",
      expertise: "AI & Machine Learning",
      avatar: "👩🏻‍💻",
      gradient: "from-pink-400 to-purple-500",
      description: "Leading AI researcher with 15+ years experience in tech innovation and women empowerment.",
      achievements: ["MIT PhD", "50+ Patents", "Tech Pioneer Award"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
      icon: Crown,
      quote: "Technology is most powerful when it empowers everyone.",
      color: "bg-pink-500"
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Mentorship",
      expertise: "Software Engineering",
      avatar: "👩🏽‍🔬",
      gradient: "from-purple-400 to-pink-500",
      description: "Full-stack engineer passionate about creating inclusive tech communities and mentoring future leaders.",
      achievements: ["Google SWE", "Mentor of Year", "Open Source Contributor"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
      icon: Users,
      quote: "Every line of code can change someone's life.",
      color: "bg-purple-500"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Research Director",
      expertise: "Robotics & IoT",
      avatar: "👩🏾‍🎓",
      gradient: "from-cyan-400 to-blue-500",
      description: "Robotics expert developing next-gen automation solutions and inspiring young women in STEM.",
      achievements: ["Stanford PhD", "Robotics Innovation", "IEEE Fellow"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
      icon: Zap,
      quote: "Innovation happens when diverse minds collaborate.",
      color: "bg-cyan-500"
    },
    {
      name: "Jennifer Kim",
      role: "Community Manager",
      expertise: "DevOps & Cloud",
      avatar: "👩🏻‍💼",
      gradient: "from-emerald-400 to-teal-500",
      description: "Cloud architect building scalable solutions and fostering vibrant engineering communities.",
      achievements: ["AWS Certified", "DevOps Expert", "Community Leader"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
      icon: Heart,
      quote: "Community is the foundation of growth.",
      color: "bg-emerald-500"
    }
  ]

  const achievements = [
    { 
      icon: Star, 
      number: "1000+", 
      label: "Women Mentored",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    { 
      icon: Award, 
      number: "15+", 
      label: "Industry Awards",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    { 
      icon: Code, 
      number: "500K+", 
      label: "Lines of Code",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      icon: Users, 
      number: "50+", 
      label: "Partner Companies",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  ]

  const tabs = [
    { id: "team", label: "Our Team", icon: Users },
    { id: "impact", label: "Our Impact", icon: Star }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Creative Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20 px-6 py-3 rounded-full">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-primary font-medium">Meet Our Amazing Team</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Brilliant Minds
            </span>
            <br />
            <span className="text-foreground">Changing the World</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the passionate women leading the revolution in engineering and technology. 
            Each bringing unique expertise and unwavering dedication to empowering others.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Team Members */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  {/* Floating card with 3D effect */}
                  <div className={`relative p-6 bg-card/70 backdrop-blur-xl border border-border/50 rounded-3xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-6 group-hover:rotate-1 ${
                    hoveredMember === index ? 'shadow-2xl shadow-primary/20' : 'shadow-lg'
                  }`}>
                    
                    {/* Animated gradient border */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse`}></div>
                    
                    {/* Avatar with floating animation */}
                    <div className="relative mb-6 flex justify-center">
                      <div className={`relative w-24 h-24 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-4xl transition-all duration-500 group-hover:scale-110 group-hover:animate-bounce`}>
                        {member.avatar}
                        {/* Floating sparkles */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      {/* Role icon with spin animation */}
                      <div className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center group-hover:animate-spin transition-all duration-300 shadow-lg`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Member info with slide effect */}
                    <div className="text-center transform transition-all duration-300 group-hover:translate-y-2">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-2`}>
                        {member.role}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        {member.expertise}
                      </p>
                    </div>

                    {/* Quote section - appears on hover */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      hoveredMember === index ? 'max-h-32 opacity-100 mb-4' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-4 border-l-4 border-primary/30">
                        <p className="text-sm italic text-foreground/80 leading-relaxed">
                          "{member.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Social links with bounce effect */}
                    <div className="flex justify-center space-x-3 mt-4">
                      <a 
                        href={member.socials.linkedin} 
                        className="p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:rotate-12"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.socials.github} 
                        className="p-3 bg-gray-500/10 hover:bg-gray-500/20 text-gray-500 dark:text-gray-400 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:-rotate-12"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.socials.twitter} 
                        className="p-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:rotate-12"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Hover indicator */}
                    <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                      hoveredMember === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Impact Section with animated counters */}
        {activeTab === "impact" && (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-primary/20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Impact</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                These numbers represent real lives changed, barriers broken, and futures brightened through our collective efforts.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div
                    key={index}
                    className="group text-center p-6 bg-card/40 backdrop-blur-sm rounded-3xl hover:bg-card/60 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-border/30"
                  >
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${achievement.bgColor} flex items-center justify-center group-hover:animate-bounce transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                      <IconComponent className={`h-10 w-10 ${achievement.color} transition-all duration-300 group-hover:scale-110`} />
                    </div>
                    <div className={`text-4xl md:text-5xl font-bold mb-3 ${achievement.color} transition-all duration-300 group-hover:scale-105`}>
                      {achievement.number}
                    </div>
                    <div className="text-muted-foreground font-medium text-sm group-hover:text-foreground transition-colors">
                      {achievement.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Call to Action with animated gradient */}
        <div className="text-center mt-16">
          <div className="relative bg-gradient-to-r from-primary via-accent to-primary p-8 md:p-12 rounded-3xl text-white overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-8 left-8 w-4 h-4 border-2 border-white rounded-full animate-ping delay-700"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Mission?
              </h3>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Be part of a community that's reshaping the future of engineering. Together, we can achieve anything.
              </p>
              <button className="group bg-white text-primary px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <span className="flex items-center justify-center">
                  Get Involved Today
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}