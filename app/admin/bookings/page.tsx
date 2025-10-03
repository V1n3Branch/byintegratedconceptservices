import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { UpdateBookingStatus } from "@/components/update-booking-status"

export default async function AdminBookingsPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, services(name, service_categories(name)), profiles(full_name, email, phone)")
    .order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all service bookings</p>
      </div>

      <div className="space-y-4">
        {bookings?.map((booking: any) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{booking.services.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{booking.services.service_categories.name}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  <Badge className={getPaymentStatusColor(booking.payment_status)}>{booking.payment_status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm font-medium mb-1">Customer</p>
                  <p className="text-sm text-muted-foreground">{booking.profiles.full_name || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">{booking.profiles.email}</p>
                  {booking.profiles.phone && <p className="text-xs text-muted-foreground">{booking.profiles.phone}</p>}
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Booking Date</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(booking.booking_date), "PPP")}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Amount</p>
                  <p className="text-sm text-muted-foreground">₦{Number(booking.total_amount).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Created</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(booking.created_at), "PP")}</p>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-1">Notes:</p>
                  <p className="text-sm text-muted-foreground">{booking.notes}</p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <UpdateBookingStatus bookingId={booking.id} currentStatus={booking.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!bookings || bookings.length === 0) && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No bookings found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
