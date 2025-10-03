import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, CheckCircle, MapPin, Sparkles, Wrench, Droplets, Circle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "Auto Beauty Services",
      description: "Expert panel beating, painting, and finishing",
    },
    {
      icon: Wrench,
      title: "Auto Maintenance",
      description: "Complete servicing and fault diagnosis",
    },
    {
      icon: Droplets,
      title: "Car Wash Clinic",
      description: "Professional washing with modern equipment",
    },
    {
      icon: Circle,
      title: "Tyre Services",
      description: "Balancing, alignment, and tyre changes",
    },
  ]

  const benefits = [
    "Professional certified technicians",
    "Modern equipment and facilities",
    "Competitive pricing",
    "Quality guaranteed work",
    "Multiple convenient locations",
    "Fast turnaround time",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 md:py-20 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
                  Professional Auto Services
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                  Your Vehicle Deserves the Best Care
                </h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-xl">
                  From panel beating to tyre services, we provide comprehensive auto care solutions across Sokoto and
                  Abuja with modern equipment and expert technicians.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-base">
                    <Link href="/services">
                      View Our Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80"
                  alt="Auto service workshop"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 md:py-20 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Core Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive auto care solutions delivered by experienced professionals
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Why Choose BY INTEGRATED?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We combine years of expertise with modern equipment to deliver exceptional auto care services that
                  keep your vehicle running smoothly.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80"
                  alt="Professional mechanic at work"
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-12 md:py-20 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Visit Our Locations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conveniently located in Sokoto and Abuja to serve you better
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Head Office - Sokoto</h3>
                  <p className="text-sm text-muted-foreground">No. 11, Argungu Road, Off J. Allen, Sokoto</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Abuja - Mabushi</h3>
                  <p className="text-sm text-muted-foreground">EMADEB Filling Station, Mabushi, Abuja</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Abuja - Guddu</h3>
                  <p className="text-sm text-muted-foreground">Opposite Guddu Market, Guddu District, Abuja</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <div className="container text-center px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Service Your Vehicle?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Book your service today and experience professional auto care
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/auth/sign-up">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
