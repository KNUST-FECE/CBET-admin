import { ComponentPropsWithoutRef as CPWR, ComponentProps as CP, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = forwardRef<HTMLElement,CPWR<"nav"> & { separator?: React.ReactNode}>(
    ({ ...props }, ref) => (
        <nav 
            ref={ref} 
            aria-label="breadcrumb" 
            {...props}
        />
    )
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = forwardRef<HTMLOListElement, CPWR<"ol">>(
    ({ className, ...props }, ref) => (
        <ol 
            ref={ref}
            className={cn("breadcrumb", className)} 
            {...props} 
        />
    )
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = forwardRef<HTMLLIElement,CPWR<"li">>(
    ({ className, ...props }, ref) => (
        <li 
            ref={ref} 
            className={cn("item", className)} 
            {...props} 
        />
    )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = forwardRef<HTMLAnchorElement,CPWR<"a"> & {asChild?: boolean}>(
    ({ asChild, className, ...props }, ref) => {
        const Comp = asChild ? Slot : "a"

        return (
            <Comp
                ref={ref}
                className={cn("link", className)}
                {...props}
            />
        )
    }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = forwardRef<HTMLSpanElement,CPWR<"span">>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("", className)}
            {...props}
        />
    )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({children, className, ...props}: CP<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("separator", className)}
        {...props}
    >
        {children ?? <ChevronRight />}
    </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props}: CP<"span">) => (
    <span 
        role="presentation" 
        aria-hidden="true" 
        className={cn("ellipsis", className)} 
        {...props}
    >
        <MoreHorizontal />
        <span className="sr-only">More</span>
    </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}