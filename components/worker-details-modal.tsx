"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Calendar,
  Navigation,
  Activity,
  X
} from "lucide-react"
import type { Worker } from "@/lib/worker-data"

interface WorkerDetailsModalProps {
  worker: Worker | null
  isOpen: boolean
  onClose: () => void
}

export function WorkerDetailsModal({ worker, isOpen, onClose }: WorkerDetailsModalProps) {
  if (!worker) return null

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{worker.name}</DialogTitle>
              <DialogDescription className="mt-1">
                Worker Details and Information
              </DialogDescription>
            </div>
            <Badge 
              variant={worker.status === "active" ? "default" : "secondary"} 
              className="text-sm px-3 py-1"
            >
              {worker.status === "active" ? "🟢 Active" : "⚫ Inactive"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Worker ID</label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="font-mono text-sm">{worker.id}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{worker.name}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{worker.phone}</span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Call
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="flex-1">{worker.address}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Status
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Current Status</label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <div className={`h-3 w-3 rounded-full ${
                    worker.status === "active" ? "bg-green-500 animate-pulse" : "bg-gray-400"
                  }`} />
                  <span className="capitalize">{worker.status}</span>
                </div>
              </div>
              
              {worker.lastActive && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Active</label>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{worker.lastActive}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* GPS Coordinates */}
          {worker.coordinates && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  GPS Location
                </h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm">
                        {formatCoordinates(worker.coordinates.lat, worker.coordinates.lng)}
                      </span>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View on Map
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Latitude</label>
                      <div className="p-3 bg-muted/50 rounded-lg font-mono text-sm">
                        {worker.coordinates.lat.toFixed(6)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Longitude</label>
                      <div className="p-3 bg-muted/50 rounded-lg font-mono text-sm">
                        {worker.coordinates.lng.toFixed(6)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Additional Information
            </h3>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Work Assignment</p>
              <p className="text-sm">
                {worker.status === "active" 
                  ? "Currently assigned to field operations and crop monitoring tasks."
                  : "Not currently assigned to active duties."
                }
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" variant="default">
              <Phone className="h-4 w-4 mr-2" />
              Contact Worker
            </Button>
            <Button className="flex-1" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Track Location
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}