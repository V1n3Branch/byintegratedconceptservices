import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { bookingId, email, amount } = await request.json()

    if (!bookingId || !email || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify booking exists and is pending payment
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    if (booking.payment_status === "paid") {
      return NextResponse.json({ error: "Booking already paid" }, { status: 400 })
    }

    // Initialize Paystack payment
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

    if (!paystackSecretKey) {
      console.error("[mantim] PAYSTACK_SECRET_KEY not configured")
      return NextResponse.json({ error: "Payment system not configured" }, { status: 500 })
    }

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Convert to kobo
        reference: `BK-${bookingId}-${Date.now()}`,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/callback`,
        metadata: {
          booking_id: bookingId,
          custom_fields: [
            {
              display_name: "Booking ID",
              variable_name: "booking_id",
              value: bookingId,
            },
          ],
        },
      }),
    })

    const paystackData = await paystackResponse.json()

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("[mantim] Paystack error:", paystackData)
      return NextResponse.json({ error: paystackData.message || "Payment initialization failed" }, { status: 500 })
    }

    // Update booking with payment reference
    await supabase
      .from("bookings")
      .update({
        payment_reference: paystackData.data.reference,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)

    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      reference: paystackData.data.reference,
    })
  } catch (error: any) {
    console.error("[mantim] Payment initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
