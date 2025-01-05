"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react";

type ICheckboxPrimitive = typeof CheckboxPrimitive.Root;
type IElementRef = React.ElementRef<ICheckboxPrimitive>;
type IPropWithoutRef = React.ComponentPropsWithoutRef<ICheckboxPrimitive>;

const Checkbox = forwardRef<IElementRef,IPropWithoutRef>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn("checkbox", className)} {...props}>
    <CheckboxPrimitive.Indicator>
      <Check />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
