import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PaymentForm } from "@/components/payment-form"
import { notFound } from "next/navigation"

export default async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get booking details
  const { data: booking } = await supabase
    .from("bookings")
    .select("*, services(name, base_price), profiles(email, full_name)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!booking) {
    notFound()
  }

  // If already paid, redirect to bookings
  if (booking.payment_status === "paid") {
    redirect("/bookings")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground">Secure payment powered by Paystack</p>
          </div>

          <PaymentForm booking={booking} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
