"use client"

import * as P from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react";

type IContent = typeof P.Content;

const Popover = P.Root

const PopoverTrigger = P.Trigger

const PopoverAnchor = P.Anchor

const PopoverContent = forwardRef<Ref<IContent>,NoRef<IContent>>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <P.Portal>
      <P.Content ref={ref} align={align} sideOffset={sideOffset} className={cn( "popover content", className )} {...props} />
    </P.Portal>
  )
);
PopoverContent.displayName = P.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }