"use client"

import { cn } from "@/lib/utils"
import { differenceInCalendarDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { DayPicker, labelNext, labelPrevious, useDayPicker, type DayPickerProps } from "react-day-picker"

export type CalendarProps = DayPickerProps & {
  yearRange?: number // In the year view, the number of years to display at once.
  showYearSwitcher?: boolean // Wether to show the year switcher in the caption.

  monthsCN?: string
  monthCaptionCN?: string
  weekdaysCN?: string
  weekdayCN?: string
  monthCN?: string
  captionCN?: string
  captionLabelCN?: string
  navCN?: string
  monthGridCN?: string
  weekCN?: string
  dayCN?: string
  dayButtonCN?: string
  rangeStartCN?: string
  rangeEndCN?: string
  selectedCN?: string
  todayCN?: string
  outsideCN?: string
  disabledCN?: string
  rangeMiddleCN?: string
  hiddenCN?: string
}

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
    className,
    showOutsideDays = true,
    showYearSwitcher = true,
    yearRange = 12,
    numberOfMonths,
    ...props
}: CalendarProps) {
    const [navView, setNavView] = useState<"days" | "years">("days");
    const [displayYears, setDisplayYears] = useState<{
        from: number;
        to: number;
    }>(
        useMemo(() => {
            const currentYear = new Date().getFullYear();
            return {
                from: currentYear - Math.floor(yearRange / 2 - 1),
                to: currentYear + Math.ceil(yearRange / 2),
            };
        }, [yearRange])
    );

    const { onNextClick, onPrevClick, startMonth, endMonth } = props;
    const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("calender", className)}
            style={{width: 248.8 * (columnsDisplayed ?? 1) + "px"}}
            classNames={{
                months: cn("months", props.monthsCN),
                nav: cn("nav", props.navCN),
                month: cn("month", props.monthCN),
                month_caption: cn("month-caption", props.monthCaptionCN),
                weekdays: cn("weekdays", props.weekdaysCN),
                weekday: cn("weekday", props.weekdayCN),
                month_grid: cn("month-grid", props.monthGridCN),
                week: cn("week", props.weekCN),
                day: cn("day", props.dayCN),
                outside: cn("day-outside outside", props.outsideCN),
                day_button: cn("day-button", props.dayButtonCN),
                range_start: cn( "range-buttons day-range-start range-start", props.rangeStartCN),
                range_end: cn( "range-buttons day-range-end range-end", props.rangeEndCN),
                selected: cn("day-selected", props.selectedCN),
                range_middle: cn("range-middle", props.rangeMiddleCN),
                today: cn("day-today", props.todayCN),
                disabled: cn("day-disabled", props.disabledCN),
                hidden: cn("day-hidden", props.hiddenCN),
                caption: cn("footer-caption", props.captionCN),
                caption_label: cn("footer-caption-label", props.captionCN),
            }}
            components={{
                Chevron: ({ orientation }) => {
                    const Icon = orientation === "left" ? ChevronLeft : ChevronRight
                    return <Icon className="date-picker-chevron" />
                },
                Nav: ({ className }) => {
                    const { nextMonth, previousMonth, goToMonth } = useDayPicker();
                    const daysDifference = (dir: "to" | "from", month: Date) => 
                        differenceInCalendarDays(new Date(displayYears[dir] - (dir==="to"? -1 : 1), 0, 1), month);

                    const isPreviousDisabled = (() => {
                        if (navView === "years")
                            return (
                                (startMonth && daysDifference("from", startMonth) < 0) || 
                                (endMonth && daysDifference("from", endMonth) > 0)
                            )
                        return !previousMonth
                    })()

                    const isNextDisabled = (() => {
                        if (navView === "years")
                            return (
                                (startMonth && daysDifference("to", startMonth) < 0) ||
                                (endMonth && daysDifference("to", endMonth) > 0)
                            )
                        return !nextMonth
                    })()

                    const handlePreviousClick = useCallback(() => {
                        if (!previousMonth) return
                        if (navView === "years") {
                            setDisplayYears((prev) => ({
                                from: prev.from - (prev.to - prev.from + 1),
                                to: prev.to - (prev.to - prev.from + 1),
                            }))
                            onPrevClick?.(new Date(displayYears.from - (displayYears.to - displayYears.from), 0, 1))
                            return
                        }
                        goToMonth(previousMonth)
                        onPrevClick?.(previousMonth)
                    }, [previousMonth, goToMonth])

                    const handleNextClick = useCallback(() => {
                        if (!nextMonth) return
                        if (navView === "years") {
                            setDisplayYears((prev) => ({
                                from: prev.from + (prev.to - prev.from + 1),
                                to: prev.to + (prev.to - prev.from + 1),
                            }))
                            onNextClick?.(new Date(displayYears.from + (displayYears.to - displayYears.from),0,1))
                            return
                        }
                        goToMonth(nextMonth)
                        onNextClick?.(nextMonth)
                    }, [goToMonth, nextMonth])

                    return (
                        <nav className={className}>
                            <button
                                className="btn btn-outline nav-buttons nav-previous"
                                type="button"
                                tabIndex={isPreviousDisabled ? undefined : -1}
                                disabled={isPreviousDisabled}
                                aria-label={
                                navView === "years"
                                    ? `Go to the previous ${
                                        displayYears.to - displayYears.from + 1
                                    } years`
                                    : labelPrevious(previousMonth)
                                }
                                onClick={handlePreviousClick}
                            >
                                <ChevronLeft />
                            </button>

                            <button
                                className="btn btn-outline nav-buttons nav-next"
                                type="button"
                                tabIndex={isNextDisabled ? undefined : -1}
                                disabled={isNextDisabled}
                                aria-label={
                                navView === "years"
                                    ? `Go to the next ${
                                        displayYears.to - displayYears.from + 1
                                    } years`
                                    : labelNext(nextMonth)
                                }
                                onClick={handleNextClick}
                            >
                                <ChevronRight />
                            </button>
                        </nav>
                    )
                },
                CaptionLabel: ({ children, ...props }) => {
                    if (!showYearSwitcher) return <span {...props}>{children}</span>
                    return (
                        <button
                            className="btn btn-ghost size-sm w-full truncate text-xs font-medium"
                            onClick={() => setNavView((prev) => (prev === "days" ? "years" : "days"))}
                        >
                            {navView === "days"
                                ? children
                                : displayYears.from + " - " + displayYears.to}
                        </button>
                    )
                },
                MonthGrid: ({ className, children, ...props }) => {
                    const { goToMonth } = useDayPicker()
                    if (navView === "years") {
                        return (
                            <div
                                className={cn("month-years-view", className)}
                                {...props}
                            >
                                {Array.from({ length: displayYears.to - displayYears.from + 1 }, (_, i) => {
                                    const isBefore = differenceInCalendarDays( new Date(displayYears.from + i, 11, 31), startMonth!) < 0
                                    const isAfter = differenceInCalendarDays(new Date(displayYears.from + i, 0, 0), endMonth!) > 0
                                    const isDisabled = isBefore || isAfter
                                    return (
                                        <button
                                            key={i}
                                            className="year-button"
                                            onClick={() => {
                                                setNavView("days");
                                                goToMonth(new Date(displayYears.from + i, new Date().getMonth()))
                                            }}
                                            disabled={navView === "years" ? isDisabled : undefined}
                                        >
                                            {displayYears.from + i}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    }

                    return (
                        <table className={className} {...props}>
                            {children}
                        </table>
                    )
                },
            }}
            numberOfMonths={columnsDisplayed}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"
export { Calendar }