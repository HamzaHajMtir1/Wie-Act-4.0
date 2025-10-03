"use client"

import { useState } from "react"
import Image from "next/image"
import { Linkedin, Github, Twitter, Star, Award, Code, Users, Heart, Sparkles, Crown, Zap, ChevronRight } from "lucide-react"

export function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("team")

  const teamMembers = [
    {
      name: "Dorra Barbria",
      role: "Chairwomen of IEEEWIE ISIMM SB",
      image: "/team/dorra.jpg",
      gradient: "from-pink-400 to-purple-500",
      socials: { linkedin: "#", github: "#" },
      icon: Crown,
      color: "bg-pink-500"
    },
    {
      name: "Maryem Teborbi",
      role: "Secretary of IEEE WIE ISIMM SB",
      image: "/team/mariem.jpg",
      gradient: "from-purple-400 to-pink-500",
      socials: { linkedin: "#", github: "#" },
      icon: Users,
      color: "bg-purple-500"
    },
    {
      name: "Menyar",
      role: " of IEEE WIE ISIMM SB",
      image: "/team/menyar.jpg",
      gradient: "from-purple-400 to-pink-500",
      socials: { linkedin: "#", github: "#" },
      icon: Users,
      color: "bg-purple-500"
    },

        {
      name: "Chifa",
      role: " of IEEE WIE ISIMM SB",
      image: "/team/chifa.jpg",
      gradient: "from-purple-400 to-pink-500",
      socials: { linkedin: "#", github: "#"},
      icon: Users,
      color: "bg-purple-500"
    },
        {
      name: "Malek",
      role: "Webmaster of IEEE WIE ISIMM SB",
      image: "/team/malek.jpg",
      gradient: "from-purple-400 to-pink-500",
      socials: { linkedin: "#", github: "#"},
      icon: Users,
      color: "bg-purple-500"
    },
    {
      name: "Hamza Haj Mtir",
      role: "Webmaster at IEEE IAS/PES ISIMM SBJC",
      image: "/team/hamza.jpg",
      gradient: "from-cyan-400 to-blue-500",
      socials: { linkedin: "#", github: "#"},
      icon: Users,
      color: "bg-cyan-500"
    },
    {
      name: "Iheb Elazheri",
      role: "Chairman of IEEE ITEAM SB",
      image: "/team/iheb.jpg",
      gradient: "from-emerald-400 to-teal-500",
      socials: { linkedin: "#", github: "#"},
      icon: Users,
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
    <section className="py-20 bg-gradient-to-br from-background to-primary/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Professional Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated women leading innovation in engineering and technology, 
            committed to empowering others and creating positive change.
          </p>
        </div>

        {/* Simple Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-card border border-border rounded-xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Team Members */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => {
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Simple professional card */}
                  <div className="relative p-8 bg-card border border-border rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                  >
                    {/* Simple Avatar */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 transition-all duration-300 group-hover:border-primary/40">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Member info */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-3">
                        {member.role}
                      </p>
                    </div>

                    {/* Simple Social links */}
                    <div className="flex justify-center space-x-4 pt-4 border-t border-border/50">
                      <a 
                        href={member.socials.linkedin} 
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                      <a 
                        href={member.socials.github} 
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Github className="h-4 w-4" />
                        <span className="text-sm font-medium">GitHub</span>
                      </a>
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
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6 cursor-pointer">
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