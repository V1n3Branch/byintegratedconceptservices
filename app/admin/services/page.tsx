import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DeleteServiceButton } from "@/components/delete-service-button"

export default async function AdminServicesPage() {
  const supabase = await createClient()

  const { data: services } = await supabase
    .from("services")
    .select("*, service_categories(name)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Services Management</h1>
          <p className="text-muted-foreground">Manage your auto services and pricing</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service: any) => (
          <Card key={service.id}>
            {service.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={service.image_url || "/placeholder.svg"}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.service_categories.name}</CardDescription>
                </div>
                <Badge variant={service.is_active ? "default" : "secondary"}>
                  {service.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">₦{Number(service.base_price).toLocaleString()}</span>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/services/${service.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteServiceButton serviceId={service.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!services || services.length === 0) && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No services found</p>
            <Button asChild>
              <Link href="/admin/services/new">Add Your First Service</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
