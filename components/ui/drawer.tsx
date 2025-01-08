"use client"

import { Drawer as D } from "vaul";
import { cn } from "@/lib/utils";
import { ComponentProps, ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react";

type IRoot = typeof D.Root;
type IOverlay = typeof D.Overlay;
type IContent = typeof D.Content;
type ITitle = typeof D.Title;
type IDescription = typeof D.Description;

const Drawer = ({ shouldScaleBackground = true, ...props }: ComponentProps<IRoot>) => (
  <D.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer"

const DrawerTrigger = D.Trigger

const DrawerPortal = D.Portal

const DrawerClose = D.Close

const DrawerOverlay = forwardRef<Ref<IOverlay>, NoRef<IOverlay>>(
    ({ className, ...props }, ref) => (
        <D.Overlay ref={ref} className={cn("drawer overlay", className)} {...props} />
    )
);
DrawerOverlay.displayName = D.Overlay.displayName

const DrawerContent = forwardRef<Ref<IContent>,NoRef<IContent>>(
    ({ className, children, ...props }, ref) => (
        <DrawerPortal>
            <DrawerOverlay />
            <D.Content ref={ref} className={cn("drawer content", className)} {...props}>
                <div className="handle" />
                {children}
            </D.Content>
        </DrawerPortal>
    )
);
DrawerContent.displayName = "DrawerContent";

const DrawerTitle = forwardRef<Ref<ITitle>,NoRef<ITitle>>(
    ({ className, ...props }, ref) => (
        <D.Title ref={ref} className={cn("title",className)} {...props} />
    )
);
DrawerTitle.displayName = D.Title.displayName

const DrawerDescription = forwardRef<Ref<IDescription>,NoRef<IDescription>>(
    ({ className, ...props }, ref) => (
        <D.Description ref={ref} className={cn("description", className)} {...props} />
    )
);
DrawerDescription.displayName = D.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
}
