"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Users, Maximize2 } from "lucide-react"
import { workers } from "@/lib/worker-data"
import { cn } from "@/lib/utils"

export default function GPSTrackingPage() {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)
  const activeWorkers = workers.filter((w) => w.status === "active")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GPS Tracking</h1>
          <p className="text-muted-foreground mt-2">Real-time location monitoring of active workers</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-muted-foreground">Live tracking</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map View */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Map View</CardTitle>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
              {/* Interactive Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted">
                <div className="relative h-full w-full">
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, oklch(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--border)) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Worker markers */}
                  {activeWorkers.map((worker, index) => {
                    const isSelected = selectedWorker === worker.id
                    // Position markers in a scattered pattern
                    const positions = [
                      { top: "20%", left: "30%" },
                      { top: "40%", left: "60%" },
                      { top: "60%", left: "25%" },
                      { top: "30%", left: "75%" },
                      { top: "70%", left: "50%" },
                      { top: "50%", left: "40%" },
                    ]
                    const position = positions[index % positions.length]

                    return (
                      <button
                        key={worker.id}
                        onClick={() => setSelectedWorker(worker.id)}
                        className={cn(
                          "absolute -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110",
                          isSelected && "scale-125 z-10",
                        )}
                        style={position}
                      >
                        <div className="relative">
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full border-2 bg-primary flex items-center justify-center shadow-lg transition-all",
                              isSelected ? "border-primary-foreground" : "border-white",
                            )}
                          >
                            <MapPin className="h-4 w-4 text-primary-foreground" />
                          </div>
                          {isSelected && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg border border-border">
                              {worker.name}
                              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-popover border-r border-b border-border" />
                            </div>
                          )}
                          {/* Pulse animation for active workers */}
                          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                        </div>
                      </button>
                    )
                  })}

                  {/* Center info */}
                  <div className="absolute bottom-4 left-4 rounded-lg bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg border border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{activeWorkers.length} Active Workers</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute top-4 right-4 rounded-lg bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg border border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Active Worker</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-muted-foreground">Live Location</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Click on markers to view worker details</span>
              <Button variant="ghost" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Center Map
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Worker List Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Active Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {activeWorkers.map((worker) => {
                const isSelected = selectedWorker === worker.id
                return (
                  <button
                    key={worker.id}
                    onClick={() => setSelectedWorker(worker.id)}
                    className={cn(
                      "w-full text-left rounded-lg border p-3 transition-all hover:border-primary",
                      isSelected ? "border-primary bg-primary/5" : "border-border",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{worker.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{worker.phone}</p>
                      </div>
                      <Badge variant="default" className="text-xs flex-shrink-0">
                        Active
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{worker.address}</span>
                    </div>
                    {worker.lastActive && (
                      <div className="mt-2 text-xs text-muted-foreground">Last update: {worker.lastActive}</div>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold text-foreground">{activeWorkers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Navigation className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">2.5m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coverage Area</p>
                <p className="text-2xl font-bold text-foreground">12 km²</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
