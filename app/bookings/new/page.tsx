import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingForm } from "@/components/booking-form"

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get service if specified
  let service = null
  if (params.service) {
    const { data } = await supabase
      .from("services")
      .select("*, service_categories(*)")
      .eq("id", params.service)
      .single()
    service = data
  }

  // Get all active services for the dropdown
  const { data: services } = await supabase
    .from("services")
    .select("*, service_categories(*)")
    .eq("is_active", true)
    .order("name")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book a Service</h1>
            <p className="text-muted-foreground">Fill in the details to schedule your vehicle service</p>
          </div>

          <BookingForm profile={profile} services={services || []} selectedService={service} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
