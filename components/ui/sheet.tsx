"use client"

import * as S from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef, ElementRef, ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react"

type IOverlay = typeof S.Overlay;
type IContent = typeof S.Overlay;
type ITitle = typeof S.Overlay;
type IDescription = typeof S.Overlay;

const Sheet = S.Root

const SheetTrigger = S.Trigger

const SheetClose = S.Close

const SheetPortal = S.Portal

const SheetOverlay = forwardRef<Ref<IOverlay>,NoRef<IOverlay>>(
  ({ className, ...props }, ref) => (
    <S.Overlay className={cn("sheet overlay",className)} {...props} ref={ref} />
  )
);
SheetOverlay.displayName = S.Overlay.displayName

const sheetVariants = cva(
  "sheet content",
  {
    variants: {
      side: {
        top: "side-top",
        bottom: "side-bottom",
        left: "side-left",
        right: "side-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends NoRef<typeof S.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<Ref<IContent>,SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <S.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props} >
        <S.Close className="close">
          <X />
          <span className="sr-only">Close</span>
        </S.Close>
        {children}
      </S.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = S.Content.displayName

const SheetTitle = forwardRef<Ref<ITitle>,NoRef<ITitle>>(
  ({ className, ...props }, ref) => (
    <S.Title
      ref={ref}
      className={cn("title", className)}
      {...props}
    />
  )
);
SheetTitle.displayName = S.Title.displayName

const SheetDescription = forwardRef<Ref<IDescription>,NoRef<IDescription>>(
  ({ className, ...props }, ref) => (
    <S.Description ref={ref} className={cn("description", className)} {...props} />
  )
);
SheetDescription.displayName = S.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
}