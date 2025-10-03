"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"

export function UpdateUserRole({
  userId,
  currentRole,
  userEmail,
}: {
  userId: string
  currentRole: string
  userEmail: string
}) {
  const router = useRouter()
  const [role, setRole] = useState(currentRole)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async () => {
    setIsUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("profiles")
      .update({
        role,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (error) {
      console.error("[v0] Update error:", error)
      alert("Failed to update role")
    } else {
      router.refresh()
    }
    setIsUpdating(false)
  }

  // Prevent changing role of the special admin email
  const isProtectedAdmin = userEmail === "mantimdanzaki@gmail.com"

  return (
    <div className="flex items-end gap-4">
      <div className="flex-1 space-y-2">
        <Label>User Role</Label>
        <Select value={role} onValueChange={setRole} disabled={isProtectedAdmin}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        {isProtectedAdmin && <p className="text-xs text-muted-foreground">This admin account cannot be modified</p>}
      </div>
      <Button onClick={handleUpdate} disabled={isUpdating || role === currentRole || isProtectedAdmin}>
        {isUpdating ? "Updating..." : "Update Role"}
      </Button>
    </div>
  )
}
