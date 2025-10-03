import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ServiceCategory, Service } from "@/lib/types"

export default async function ServicesPage() {
  const supabase = await createClient()

  // Fetch all service categories
  const { data: categories } = await supabase.from("service_categories").select("*").order("display_order")

  // Fetch all active services with their categories
  const { data: services } = await supabase
    .from("services")
    .select("*, service_categories(*)")
    .eq("is_active", true)
    .order("created_at")

  // Group services by category
  const servicesByCategory = categories?.reduce(
    (acc, category) => {
      acc[category.id] = services?.filter((service) => service.category_id === category.id) || []
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Services</h1>
              <p className="text-lg text-muted-foreground">
                Professional auto care services tailored to keep your vehicle in perfect condition
              </p>
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <section className="py-20">
          <div className="container">
            {categories?.map((category: ServiceCategory) => (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                  {category.description && <p className="text-muted-foreground">{category.description}</p>}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {servicesByCategory?.[category.id]?.map((service: Service) => (
                    <Card key={service.id} className="flex flex-col">
                      {service.image_url && (
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img
                            src={service.image_url || "/placeholder.svg"}
                            alt={service.name}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">₦{service.base_price.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">starting price</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/bookings/new?service=${service.id}`}>Book Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
