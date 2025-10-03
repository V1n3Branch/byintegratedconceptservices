export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: "customer" | "admin"
  created_at: string
  updated_at: string
}

export interface ServiceCategory {
  id: string
  name: string
  description: string | null
  icon: string | null
  display_order: number
  created_at: string
}

export interface Service {
  id: string
  category_id: string
  name: string
  description: string | null
  base_price: number
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id: string
  service_id: string
  booking_date: string
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  total_amount: number
  payment_status: "pending" | "paid" | "failed" | "refunded"
  payment_reference: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ServiceWithCategory extends Service {
  service_categories: ServiceCategory
}

export interface BookingWithDetails extends Booking {
  services: Service
  profiles: Profile
}
