"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Phone, MapPin, Clock } from "lucide-react"
import type { Worker } from "@/lib/worker-data"
import { cn } from "@/lib/utils"

interface WorkerTableProps {
  workers: Worker[]
}

export function WorkerTable({ workers }: WorkerTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.phone.includes(searchQuery) ||
      worker.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Workers ({filteredWorkers.length})</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="flex flex-col gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{worker.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={worker.status === "active" ? "default" : "secondary"} className="text-xs">
                        {worker.status}
                      </Badge>
                      {worker.lastActive && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {worker.lastActive}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{worker.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{worker.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sm:flex-col">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex-1 sm:flex-none",
                    worker.status === "active" ? "text-primary hover:text-primary" : "text-muted-foreground",
                  )}
                >
                  Track GPS
                </Button>
              </div>
            </div>
          ))}

          {filteredWorkers.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No workers found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
