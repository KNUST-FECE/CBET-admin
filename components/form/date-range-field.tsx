import { ArrowLeftRight, Calendar, LucideIcon } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";

type Props = {
    control: any,
    fieldKey: string,
    icon?: LucideIcon
}

export default function DateRangeField(props:Props) {
    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu date-range-field-trigger">
                {props.icon ?
                    (<props.icon />) :
                    (<Calendar />)
                }
                <span>{props.fieldKey}</span>
            </DropMenuTrigger>
            <DropMenuContent id="date-range-field-content" collisionPadding={50}>
                <div>
                    <h4>{props.fieldKey}</h4>
                </div>
                <div>
                    <div className="svg-container">
                        <ArrowLeftRight />
                    </div>
                    <label htmlFor={`${props.fieldKey}-min`}>
                        <div>
                            <input type="text" name={`${props.fieldKey} min`} id={`${props.fieldKey}-min`} step={10} placeholder="min" />
                        </div>
                        <div>
                            
                        </div>
                    </label>
                    <label htmlFor={`${props.fieldKey}-max`}>
                        <div>
                            <input type="text" name={`${props.fieldKey} max`} id={`${props.fieldKey}-max`} step={10} placeholder="max" />
                        </div>
                        <div>

                        </div>
                    </label>
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}