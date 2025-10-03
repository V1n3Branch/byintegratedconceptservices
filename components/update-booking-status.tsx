"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"

export function UpdateBookingStatus({ bookingId, currentStatus }: { bookingId: string; currentStatus: string }) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async () => {
    setIsUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("bookings")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)

    if (error) {
      console.error("[v0] Update error:", error)
      alert("Failed to update status")
    } else {
      router.refresh()
    }
    setIsUpdating(false)
  }

  return (
    <div className="flex items-end gap-4">
      <div className="flex-1 space-y-2">
        <Label>Update Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleUpdate} disabled={isUpdating || status === currentStatus}>
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </div>
  )
}
