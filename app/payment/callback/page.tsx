"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference")

      if (!reference) {
        setStatus("failed")
        setError("No payment reference found")
        return
      }

      try {
        const response = await fetch(`/api/payment/verify?reference=${reference}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Payment verification failed")
        }

        if (data.status === "success") {
          setStatus("success")
        } else {
          setStatus("failed")
          setError("Payment was not successful")
        }
      } catch (err: any) {
        console.error("[mantim] Verification error:", err)
        setStatus("failed")
        setError(err.message || "Failed to verify payment")
      }
    }

    verifyPayment()
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              {status === "loading" && (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                  <CardTitle>Verifying Payment</CardTitle>
                  <CardDescription>Please wait while we confirm your payment...</CardDescription>
                </>
              )}

              {status === "success" && (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <CardTitle className="text-green-600">Payment Successful!</CardTitle>
                  <CardDescription>Your booking has been confirmed</CardDescription>
                </>
              )}

              {status === "failed" && (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="h-10 w-10 text-red-600" />
                  </div>
                  <CardTitle className="text-red-600">Payment Failed</CardTitle>
                  <CardDescription>{error || "Something went wrong with your payment"}</CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="text-center space-y-4">
              {status === "success" && (
                <>
                  <p className="text-muted-foreground">
                    Thank you for your payment. We&apos;ve received your booking and will contact you shortly with
                    further details.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link href="/bookings">View My Bookings</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/services">Book Another Service</Link>
                    </Button>
                  </div>
                </>
              )}

              {status === "failed" && (
                <>
                  <p className="text-muted-foreground">
                    Your payment could not be processed. Please try again or contact support if the problem persists.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link href="/bookings">Back to Bookings</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
