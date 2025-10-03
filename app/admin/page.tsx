import { Users, UserCheck, UserX } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { WorkerTable } from "@/components/worker-table"
import { getWorkerStats, workers } from "@/lib/worker-data"

export default function AdminDashboard() {
  const stats = getWorkerStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Monitor and manage women workers in your farm</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Workers"
          value={stats.total}
          icon={Users}
          trend={{ value: "+2 this month", positive: true }}
        />
        <StatCard
          title="Active Workers"
          value={stats.active}
          icon={UserCheck}
          trend={{ value: `${Math.round((stats.active / stats.total) * 100)}% of total`, positive: true }}
        />
        <StatCard
          title="Inactive Workers"
          value={stats.inactive}
          icon={UserX}
          trend={{ value: `${Math.round((stats.inactive / stats.total) * 100)}% of total`, positive: false }}
        />
      </div>

      {/* Worker Table */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Worker Directory</h2>
        <WorkerTable workers={workers} />
      </div>
    </div>
  )
}
