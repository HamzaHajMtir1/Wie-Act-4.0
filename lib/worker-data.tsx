export interface Worker {
  id: string
  name: string
  phone: string
  address: string
  status: "active" | "inactive"
  lastActive?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export const workers: Worker[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    address: "123 Farm Road, Rural County, State 12345",
    status: "active",
    lastActive: "2 minutes ago",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    name: "Maria Garcia",
    phone: "+1 (555) 234-5678",
    address: "456 Harvest Lane, Rural County, State 12345",
    status: "active",
    lastActive: "15 minutes ago",
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: "3",
    name: "Aisha Patel",
    phone: "+1 (555) 345-6789",
    address: "789 Agriculture Ave, Rural County, State 12345",
    status: "active",
    lastActive: "1 hour ago",
    coordinates: { lat: 40.7489, lng: -73.968 },
  },
  {
    id: "4",
    name: "Jennifer Lee",
    phone: "+1 (555) 456-7890",
    address: "321 Crop Circle, Rural County, State 12345",
    status: "inactive",
    lastActive: "2 days ago",
    coordinates: { lat: 40.7282, lng: -73.9942 },
  },
  {
    id: "5",
    name: "Fatima Ahmed",
    phone: "+1 (555) 567-8901",
    address: "654 Field Street, Rural County, State 12345",
    status: "active",
    lastActive: "30 minutes ago",
    coordinates: { lat: 40.758, lng: -73.9855 },
  },
  {
    id: "6",
    name: "Rosa Martinez",
    phone: "+1 (555) 678-9012",
    address: "987 Meadow Drive, Rural County, State 12345",
    status: "active",
    lastActive: "5 minutes ago",
    coordinates: { lat: 40.7614, lng: -73.9776 },
  },
  {
    id: "7",
    name: "Priya Sharma",
    phone: "+1 (555) 789-0123",
    address: "147 Pasture Road, Rural County, State 12345",
    status: "inactive",
    lastActive: "1 week ago",
    coordinates: { lat: 40.7306, lng: -73.9352 },
  },
  {
    id: "8",
    name: "Amara Okafor",
    phone: "+1 (555) 890-1234",
    address: "258 Barn Way, Rural County, State 12345",
    status: "active",
    lastActive: "45 minutes ago",
    coordinates: { lat: 40.7549, lng: -73.984 },
  },
]

export function getWorkerStats() {
  const total = workers.length
  const active = workers.filter((w) => w.status === "active").length
  const inactive = workers.filter((w) => w.status === "inactive").length

  return { total, active, inactive }
}
