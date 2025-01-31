import { ArrowDownUp } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { useFormContext } from "react-hook-form";

type Props = {
    fieldKey: string,
}

export default function DigitRangeField(props:Props) {
    const {} = useFormContext();

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu digit-range-field-trigger" type="button">
                <span>{props.fieldKey}</span>
            </DropMenuTrigger>
            <DropMenuContent id="digit-range-field-content">
                <div>
                    <h4>{props.fieldKey}</h4>
                </div>
                <div>
                    <div className="svg-container">
                        <ArrowDownUp />
                    </div>
                    <label htmlFor={`${props.fieldKey}-min`}>
                        <input type="number" name={`${props.fieldKey} min`} id={`${props.fieldKey}-min`} step={10} placeholder="min: 0" />
                    </label>
                    <label htmlFor={`${props.fieldKey}-max`}>
                        <input type="number" name={`${props.fieldKey} max`} id={`${props.fieldKey}-max`} step={10} placeholder="max: 9999" />
                    </label>
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}