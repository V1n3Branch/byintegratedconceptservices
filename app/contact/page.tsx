import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Get In Touch</h1>
              <p className="text-lg text-muted-foreground">
                Visit us at any of our locations or reach out for inquiries
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">+234 XXX XXX XXXX</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground break-all">info@byintegrated.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon - Sat: 8AM - 6PM</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Locations</h3>
                  <p className="text-sm text-muted-foreground">Sokoto & Abuja</p>
                </CardContent>
              </Card>
            </div>

            {/* Locations */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Visit Our Locations</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Head Office</h3>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Sokoto</p>
                    <p className="text-sm mb-4">No. 11, Argungu Road, Off J. Allen, Sokoto</p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Mabushi Branch</h3>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Abuja</p>
                    <p className="text-sm mb-4">EMADEB Filling Station, Mabushi, Abuja</p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Guddu Branch</h3>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Abuja</p>
                    <p className="text-sm mb-4">Opposite Guddu Market, Guddu District, Abuja</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/40">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book a Service?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create an account to access our booking system and manage your vehicle services
            </p>
            <Button asChild size="lg">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
