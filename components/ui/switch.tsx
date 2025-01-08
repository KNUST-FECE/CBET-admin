"use client"

import * as S from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react";

type IRoot = typeof S.Root;

const Switch = forwardRef<Ref<IRoot>,NoRef<IRoot>>(
  ({ className, ...props }, ref) => (
    <S.Root className={cn("switch",className)} {...props} ref={ref} >
      <S.Thumb className={cn("thumb")} />
    </S.Root>
  )
);
Switch.displayName = S.Root.displayName

export { Switch }