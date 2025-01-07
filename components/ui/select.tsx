"use client"

import * as S from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef as NoRef, ElementRef as Ref, forwardRef } from "react"

type ITrigger = typeof S.Trigger;
type IScrollUp = typeof S.ScrollUpButton;
type IScrollDown = typeof S.ScrollDownButton;
type IContent = typeof S.Content;
type ILabel = typeof S.Label;
type IItem = typeof S.Item;
type ISeparator = typeof S.Separator;

const Select = S.Root;
const SelectGroup = S.Group;
const SelectValue = S.Value;

const SelectTrigger = forwardRef<Ref<ITrigger>,NoRef<ITrigger>>(
    ({ className, children, ...props }, ref) => (
        <S.Trigger ref={ref} className={cn("select trigger", className)} {...props}>
            {children}
            <S.Icon asChild>
                <ChevronsUpDown />
            </S.Icon>
        </S.Trigger>
    )
);
SelectTrigger.displayName = S.Trigger.displayName;

const SelectScrollUpButton = forwardRef<Ref<IScrollUp>,NoRef<IScrollUp>>(
    ({ className, ...props }, ref) => (
        <S.ScrollUpButton ref={ref} className={cn("scroll-up", className)} {...props}>
            <ChevronUp />
        </S.ScrollUpButton>
    )
);
SelectScrollUpButton.displayName = S.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<Ref<IScrollDown>,NoRef<IScrollDown>>(
    ({ className, ...props }, ref) => (
        <S.ScrollDownButton ref={ref} className={cn("scroll-down", className)} {...props}>
            <ChevronDown />
        </S.ScrollDownButton>
    )
);
SelectScrollDownButton.displayName = S.ScrollDownButton.displayName

const SelectContent = forwardRef<Ref<IContent>,NoRef<IContent>>(
    ({ className, children, position = "popper", ...props }, ref) => (
        <S.Portal>
            <S.Content ref={ref} className={cn("select content", position === "popper" && "popper", className )} position={position} {...props}>
                <SelectScrollUpButton />
                <S.Viewport className={cn("viewport", position === "popper" && "popper")}>
                    {children}
                </S.Viewport>
                <SelectScrollDownButton />
            </S.Content>
        </S.Portal>
))
SelectContent.displayName = S.Content.displayName;

const SelectLabel = forwardRef<Ref<ILabel>,NoRef<ILabel>>(
    ({ className, ...props }, ref) => (
        <S.Label ref={ref} className={cn("label", className)} {...props} />
    )
);
SelectLabel.displayName = S.Label.displayName;

const SelectItem = forwardRef<Ref<IItem>,NoRef<IItem>>(
    ({ className, children, ...props }, ref) => (
        <S.Item ref={ref} className={cn("item", className)} {...props}>
            <span className="indicator">
                <S.ItemIndicator>
                    <Check />
                </S.ItemIndicator>
            </span>
            <S.ItemText>{children}</S.ItemText>
        </S.Item>
    )
);
SelectItem.displayName = S.Item.displayName;

const SelectSeparator = forwardRef<Ref<ISeparator>,NoRef<ISeparator>>(
    ({ className, ...props }, ref) => (
        <S.Separator ref={ref} className={cn("separator", className)} {...props} />
    )
);
SelectSeparator.displayName = S.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}