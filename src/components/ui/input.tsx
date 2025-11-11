import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 selection:bg-primary selection:text-primary-foreground",
        "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100",
        "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-sky-500 dark:focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:focus-visible:ring-sky-800 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-200 dark:aria-invalid:ring-red-800 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
