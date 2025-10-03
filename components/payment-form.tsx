"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Loader2, CreditCard, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface PaymentFormProps {
  booking: any
}

export function PaymentForm({ booking }: PaymentFormProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      // Initialize Paystack payment
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: booking.id,
          email: booking.profiles.email,
          amount: booking.total_amount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment")
      }

      // Redirect to Paystack payment page
      if (data.authorization_url) {
        window.location.href = data.authorization_url
      }
    } catch (err: any) {
      console.error("[v0] Payment error:", err)
      setError(err.message || "Failed to process payment")
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Review your booking details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">{booking.services.name}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Booking Date</span>
            <span className="font-medium">{format(new Date(booking.booking_date), "PPP")}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Customer</span>
            <span className="font-medium">{booking.profiles.full_name || booking.profiles.email}</span>
          </div>

          {booking.notes && (
            <div className="py-2 border-b">
              <p className="text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{booking.notes}</p>
            </div>
          )}

          <div className="flex justify-between py-4 text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-2xl">₦{Number(booking.total_amount).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Secure payment via Paystack</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
            <CreditCard className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Pay with Paystack</p>
              <p className="text-sm text-muted-foreground">Card, Bank Transfer, USSD, and more</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button onClick={handlePayment} disabled={isProcessing} className="w-full mt-6" size="lg">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay ₦{Number(booking.total_amount).toLocaleString()}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Your payment is secured by Paystack. We do not store your card details.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
