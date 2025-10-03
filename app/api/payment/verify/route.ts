import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")

    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference" }, { status: 400 })
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

    if (!paystackSecretKey) {
      return NextResponse.json({ error: "Payment system not configured" }, { status: 500 })
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
      },
    })

    const paystackData = await paystackResponse.json()

    if (!paystackResponse.ok || !paystackData.status) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
    }

    const transaction = paystackData.data

    // Update booking payment status
    const supabase = await createClient()

    const bookingId = transaction.metadata?.booking_id

    if (!bookingId) {
      return NextResponse.json({ error: "Invalid payment metadata" }, { status: 400 })
    }

    const paymentStatus = transaction.status === "success" ? "paid" : "failed"
    const bookingStatus = transaction.status === "success" ? "confirmed" : "pending"

    await supabase
      .from("bookings")
      .update({
        payment_status: paymentStatus,
        status: bookingStatus,
        payment_reference: reference,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)

    return NextResponse.json({
      status: transaction.status,
      amount: transaction.amount / 100, // Convert from kobo
      booking_id: bookingId,
    })
  } catch (error: any) {
    console.error("[mantim] Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
