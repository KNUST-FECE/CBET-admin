import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { Calendar } from "../ui/calender";
import { useFormContext } from "react-hook-form";

type Props = {
    fieldKey: string,
}

export default function DateRangeField(props:Props) {
    const {} = useFormContext();

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu date-range-field-trigger">
                <span>{props.fieldKey}</span>
            </DropMenuTrigger>
            <DropMenuContent id="date-range-field-content" collisionPadding={50}>
                <div>
                    <h4>{props.fieldKey}</h4>
                </div>
                <div>
                    <p>
                        <span className="calender-from">--- , ---, ---</span>
                        <span className="calender-gap">to</span>
                        <span className="calender-to">--- , ---, ---</span>
                    </p>
                </div>
                <div>
                    <Calendar autoFocus mode="range" />
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}