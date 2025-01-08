import { LucideIcon } from "lucide-react"
import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon,
    value: string
}

const FilterButton = React.forwardRef<HTMLButtonElement,Props>(
    ({ value, icon, type="button", ...props }, ref) => {
        const Icon = {icon};
        return (
            <button type={type} ref={ref} {...props}>
                <Icon.icon />
                <span>{value}</span>
            </button>
        )
    }
);

export default FilterButton;