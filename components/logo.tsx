import { Wrench } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
          <Wrench className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-lg tracking-tight">BY INTEGRATED</span>
        <span className="text-xs text-muted-foreground tracking-wide">CONCEPT SERVICES</span>
      </div>
    </div>
  )
}
