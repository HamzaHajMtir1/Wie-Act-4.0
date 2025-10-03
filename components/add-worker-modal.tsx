"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Phone, MapPin, Calendar, Briefcase, Mail } from "lucide-react"

interface AddWorkerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddWorker: (worker: NewWorker) => void
}

interface NewWorker {
  name: string
  phone: string
  address: string
  dateJoined: string
  role: string
  status: "active" | "inactive"
  notes: string
}

export function AddWorkerModal({ open, onOpenChange, onAddWorker }: AddWorkerModalProps) {
  const [formData, setFormData] = useState<NewWorker>({
    name: "",
    phone: "",
    address: "",
    dateJoined: new Date().toISOString().split('T')[0],
    role: "",
    status: "active",
    notes: ""
  })

  const [errors, setErrors] = useState<Partial<NewWorker>>({})

  const handleInputChange = (field: keyof NewWorker, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<NewWorker> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.role.trim()) newErrors.role = "Role is required"


    // Validate phone format (basic)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAddWorker(formData)
      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        dateJoined: new Date().toISOString().split('T')[0],
        role: "",
        status: "active",
        notes: ""
      })
      setErrors({})
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form and errors when closing
    setFormData({
      name: "",
      phone: "",
      address: "",
      dateJoined: new Date().toISOString().split('T')[0],
      role: "",
      status: "active",
      notes: ""
    })
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Add New Worker
          </DialogTitle>
          <DialogDescription>
            Fill in the information below to add a new worker to your farm.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>


              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Enter complete address (Village, City, Province)"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`pl-10 ${errors.address ? "border-destructive" : ""}`}
                  rows={2}
                />
              </div>
              {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
            </div>
          </div>

          {/* Work Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Work Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role/Position *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farm-worker">Farm Worker</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="harvester">Harvester</SelectItem>
                    <SelectItem value="equipment-operator">Equipment Operator</SelectItem>
                    <SelectItem value="livestock-caretaker">Livestock Caretaker</SelectItem>
                    <SelectItem value="irrigation-specialist">Irrigation Specialist</SelectItem>
                    <SelectItem value="quality-inspector">Quality Inspector</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "inactive") => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the worker..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 cursor-pointer">
              Add Worker
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}