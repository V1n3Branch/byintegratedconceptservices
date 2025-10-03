import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Wrench, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                About BY INTEGRATED CONCEPT SERVICES
              </h1>
              <p className="text-lg text-muted-foreground">
                Your trusted partner for professional auto services in Nigeria
              </p>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    BY INTEGRATED CONCEPT SERVICES LIMITED is a leading provider of comprehensive auto care solutions,
                    serving customers across Sokoto and Abuja with dedication and expertise.
                  </p>
                  <p>
                    With our head office strategically located in Sokoto and operating outlets in Abuja, we bring
                    professional auto services closer to you. Our team of certified technicians uses modern equipment to
                    deliver quality services that keep your vehicle in optimal condition.
                  </p>
                  <p>
                    From auto beauty services including panel beating and painting, to complete maintenance, car wash,
                    and tyre services, we offer a full spectrum of automotive care under one roof.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1632823469850-1b4942f4d2b5?w=800&q=80"
                  alt="Our workshop"
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/40">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">We never compromise on the quality of our work</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Customer Focus</h3>
                  <p className="text-sm text-muted-foreground">Your satisfaction is our top priority</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Expertise</h3>
                  <p className="text-sm text-muted-foreground">Certified technicians with years of experience</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">Multiple locations for your convenience</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Locations Detail */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Locations</h2>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Head Office</h3>
                  <p className="text-sm text-muted-foreground mb-1">Sokoto</p>
                  <p className="text-sm">No. 11, Argungu Road, Off J. Allen, Sokoto</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Mabushi Branch</h3>
                  <p className="text-sm text-muted-foreground mb-1">Abuja</p>
                  <p className="text-sm">EMADEB Filling Station, Mabushi, Abuja</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Guddu Branch</h3>
                  <p className="text-sm text-muted-foreground mb-1">Abuja</p>
                  <p className="text-sm">Opposite Guddu Market, Guddu District, Abuja</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
