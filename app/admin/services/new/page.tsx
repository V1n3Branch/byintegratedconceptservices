import { createClient } from "@/lib/supabase/server"
import { ServiceForm } from "@/components/service-form"

export default async function NewServicePage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("service_categories").select("*").order("display_order")

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Service</h1>
        <p className="text-muted-foreground">Create a new service offering</p>
      </div>

      <ServiceForm categories={categories || []} />
    </div>
  )
}
