"use client"

import * as T from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react"

type IContent = typeof T.Content;

const TooltipProvider = T.Provider

const Tooltip = T.Root

const TooltipTrigger = T.Trigger

const TooltipContent = forwardRef<Ref<IContent>,NoRef<IContent>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <T.Portal>
      <T.Content ref={ref} sideOffset={sideOffset} className={cn("tooltip content",className)} {...props} />
    </T.Portal>
  )
);
TooltipContent.displayName = T.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }