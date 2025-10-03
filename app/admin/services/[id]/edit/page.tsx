import { createClient } from "@/lib/supabase/server"
import { ServiceForm } from "@/components/service-form"
import { notFound } from "next/navigation"

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: service } = await supabase.from("services").select("*").eq("id", id).single()

  if (!service) {
    notFound()
  }

  const { data: categories } = await supabase.from("service_categories").select("*").order("display_order")

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Service</h1>
        <p className="text-muted-foreground">Update service details and pricing</p>
      </div>

      <ServiceForm categories={categories || []} service={service} />
    </div>
  )
}
