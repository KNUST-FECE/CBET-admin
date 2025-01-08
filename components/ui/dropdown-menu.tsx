"use client"

import * as D from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react"

type ITrigger = typeof D.SubTrigger;
type ISubContent = typeof D.SubContent;
type IContent = typeof D.Content;
type ICheckboxItem = typeof D.CheckboxItem;
type IItem = typeof D.Item;
type IRadioItem = typeof D.RadioItem;
type ILabel = typeof D.Label;
type ISeparator = typeof D.Separator;

const DropMenu = D.Root

const DropMenuTrigger = D.Trigger

const DropMenuGroup = D.Group

const DropMenuPortal = D.Portal

const DropMenuSub = D.Sub

const DropMenuRadioGroup = D.RadioGroup

const DropMenuSubTrigger = forwardRef<Ref<ITrigger>, NoRef<ITrigger> & {inset?: boolean}>(
  ({ className, inset, children, ...props }, ref) => (
    <D.SubTrigger ref={ref} className={cn( "drop-menu trigger", inset && "has-inset", className )} {...props} >
      {children}
      <ChevronRight />
    </D.SubTrigger>
  )
);
DropMenuSubTrigger.displayName = D.SubTrigger.displayName

const DropMenuSubContent = forwardRef<Ref<ISubContent>,NoRef<ISubContent>>(
  ({ className, ...props }, ref) => (
    <D.SubContent ref={ref} className={cn("sub-content",className)} {...props}/>
  )
);
DropMenuSubContent.displayName = D.SubContent.displayName

const DropMenuContent = forwardRef<Ref<IContent>,NoRef<IContent>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <D.Portal>
      <D.Content ref={ref} sideOffset={sideOffset} className={cn("drop-menu content",className)} {...props} />
    </D.Portal>
  )
);
DropMenuContent.displayName = D.Content.displayName

const DropMenuItem = forwardRef<Ref<IItem>,NoRef<IItem> & {inset?: boolean}>(
  ({ className, inset, ...props }, ref) => (
    <D.Item ref={ref} className={cn( "item", inset && "has-inset", className )} {...props} />
  )
);
DropMenuItem.displayName = D.Item.displayName

const DropMenuCheckItem = forwardRef<Ref<ICheckboxItem>,NoRef<ICheckboxItem>>(
  ({ className, children, checked, ...props }, ref) => (
    <D.CheckboxItem ref={ref} className={cn( "checkbox-item", className )} checked={checked} {...props} >
      <span className="checkbox">
        <D.ItemIndicator>
          <Check className="h-4 w-4" />
        </D.ItemIndicator>
      </span>
      {children}
    </D.CheckboxItem>
))
DropMenuCheckItem.displayName = D.CheckboxItem.displayName

const DropMenuRadioItem = forwardRef<Ref<IRadioItem>,NoRef<IRadioItem>>(
  ({ className, children, ...props }, ref) => (
    <D.RadioItem ref={ref} className={cn("radio-item",className)} {...props} >
      <span className="radio">
        <D.ItemIndicator>
          <Circle />
        </D.ItemIndicator>
      </span>
      {children}
    </D.RadioItem>
  )
);
DropMenuRadioItem.displayName = D.RadioItem.displayName

const DropMenuLabel = forwardRef<Ref<ILabel>,NoRef<ILabel> & {inset?: boolean}>(
  ({ className, inset, ...props }, ref) => (
    <D.Label
      ref={ref}
      className={cn("label", inset && "has-inset", className )}
      {...props}
    />
  )
);
DropMenuLabel.displayName = D.Label.displayName

const DropMenuSeparator = forwardRef<Ref<ISeparator>,NoRef<ISeparator>>(
  ({ className, ...props }, ref) => (
    <D.Separator ref={ref} className={cn("separator", className)} {...props} />
  )
);
DropMenuSeparator.displayName = D.Separator.displayName

export {
  DropMenu,
  DropMenuTrigger,
  DropMenuContent,
  DropMenuItem,
  DropMenuCheckItem,
  DropMenuRadioItem,
  DropMenuLabel,
  DropMenuSeparator,
  DropMenuGroup,
  DropMenuPortal,
  DropMenuSub,
  DropMenuSubContent,
  DropMenuSubTrigger,
  DropMenuRadioGroup,
}