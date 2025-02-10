import { ArrowDownUp } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { useFormContext } from "react-hook-form";

type Props = {
    fieldKey: string,
}

export default function DigitRangeField(props:Props) {
    const {register} = useFormContext();
    const inputData = [
        {
            id: `${props.fieldKey}-min`,
            step: 10,
            placeholder: "min: 0",
            key: `${props.fieldKey}.min`
        },
        {
            id: `${props.fieldKey}-max`,
            step: 10,
            placeholder: "max: 9999",
            key: `${props.fieldKey}.max`
        },
    ]

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
                    {inputData.map(item => (
                        <label key={item.id} htmlFor={item.id}>
                            <input type="number" id={item.id} step={item.step} placeholder={item.placeholder} {...register(item.key)} />
                        </label>
                    ))}
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}