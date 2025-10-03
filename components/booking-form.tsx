"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { Profile, Service } from "@/lib/types"

interface BookingFormProps {
  profile: Profile | null
  services: Service[]
  selectedService: Service | null
}

export function BookingForm({ profile, services, selectedService }: BookingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [serviceId, setServiceId] = useState(selectedService?.id || "")
  const [bookingDate, setBookingDate] = useState<Date>()
  const [notes, setNotes] = useState("")

  const selectedServiceData = services.find((s) => s.id === serviceId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!bookingDate) {
      setError("Please select a booking date")
      setIsLoading(false)
      return
    }

    if (!serviceId) {
      setError("Please select a service")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: profile?.id,
          service_id: serviceId,
          booking_date: bookingDate.toISOString(),
          total_amount: selectedServiceData?.base_price || 0,
          status: "pending",
          payment_status: "pending",
          notes: notes || null,
        })
        .select()
        .single()

      if (bookingError) throw bookingError

      // Redirect to payment page
      router.push(`/bookings/${booking.id}/payment`)
    } catch (err: any) {
      console.error("[mantim] Booking error:", err)
      setError(err.message || "Failed to create booking")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Details</CardTitle>
        <CardDescription>Select a service and choose your preferred date</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select value={serviceId} onValueChange={setServiceId} required>
              <SelectTrigger id="service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - ₦{service.base_price.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Booking Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bookingDate ? format(bookingDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={setBookingDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific requirements or concerns..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Price Summary */}
          {selectedServiceData && (
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="text-2xl font-bold">₦{selectedServiceData.base_price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Final price may vary based on vehicle condition and additional services required
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Creating Booking..." : "Proceed to Payment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
