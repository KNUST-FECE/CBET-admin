"use client"

import * as D from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react"

type IOverlay = typeof D.Overlay;
type IContent = typeof D.Content;
type ITitle = typeof D.Title;
type IDescription = typeof D.Description;

const Dialog = D.Root

const DialogTrigger = D.Trigger

const DialogPortal = D.Portal

const DialogClose = D.Close

const DialogOverlay = forwardRef<Ref<IOverlay>,NoRef<IOverlay>>(
  ({ className, ...props }, ref) => (
    <D.Overlay ref={ref} className={cn("dialog overlay", className)} {...props}/>
  )
);
DialogOverlay.displayName = D.Overlay.displayName

const DialogContent = forwardRef<Ref<IContent>,NoRef<IContent>>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <D.Content ref={ref} className={cn("dialog content",className)} {...props}>
        {children}
        <D.Close className="close">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </D.Close>
      </D.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = D.Content.displayName;

const DialogTitle = forwardRef<Ref<ITitle>,NoRef<ITitle>>(
  ({ className, ...props }, ref) => (
    <D.Title ref={ref} className={cn("title",className)} {...props}/>
  )
);
DialogTitle.displayName = D.Title.displayName

const DialogDescription = forwardRef<Ref<IDescription>,NoRef<IDescription>>(
  ({ className, ...props }, ref) => (
    <D.Description ref={ref} className={cn("description", className)} {...props}/>
  )
);
DialogDescription.displayName = D.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
}