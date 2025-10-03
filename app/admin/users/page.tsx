import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { UpdateUserRole } from "@/components/update-user-role"

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Users Management</h1>
        <p className="text-muted-foreground">Manage user accounts and roles</p>
      </div>

      <div className="space-y-4">
        {users?.map((user: any) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{user.full_name || "No name"}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div>
                  <p className="text-sm font-medium mb-1">Phone</p>
                  <p className="text-sm text-muted-foreground">{user.phone || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Joined</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(user.created_at), "PP")}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(user.updated_at), "PP")}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <UpdateUserRole userId={user.id} currentRole={user.role} userEmail={user.email} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!users || users.length === 0) && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No users found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
