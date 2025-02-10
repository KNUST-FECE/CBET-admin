import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { Calendar } from "../ui/calender";
import { useFormContext } from "react-hook-form";
import { toCamelCase } from "@/lib/utils";
import { format } from "date-fns";

type Props = {
    fieldKey: string,
}

export default function DateRangeField(props:Props) {
    const { watch, setValue} = useFormContext();
    const fieldKey = toCamelCase(props.fieldKey);
    const value = watch(fieldKey);

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu date-range-field-trigger" type="button">
                <span>{props.fieldKey}</span>
            </DropMenuTrigger>
            <DropMenuContent id="date-range-field-content" collisionPadding={50}>
                <div>
                    <h4>{props.fieldKey}</h4>
                </div>
                <div>
                    <p>
                        <span className="calender-from">
                            {value?.min? format(value.min, "M-d-yyyy") : "--- , ---, ---" }
                        </span>
                        <span className="calender-gap">to</span>
                        <span className="calender-to">
                            {value?.max? format(value.max, "M-d-yyyy") : "--- , ---, ---"}
                        </span>
                    </p>
                </div>
                <div>
                    <Calendar 
                        autoFocus 
                        mode="range" 
                        selected={{
                            from: value?.min ? new Date(value.min) : undefined,
                            to: value?.max ? new Date(value.max) : undefined,
                        }}
                        onSelect={(selected) => {
                            const data = selected?.from && selected?.to ?
                                { min: selected.from?.toISOString(), max: selected.to?.toISOString()} :
                                undefined;

                            setValue(fieldKey, data, {shouldDirty: true});
                        }}
                    />
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}