import { ArchiveX, Check, LucideIcon, Tag } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";

type Props = {
    control: any,
    fieldKey: string,
    icon?: LucideIcon,
    fieldOptions: string[]
}

export default function ChipsField(props:Props) {
    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu chips-field-trigger" type="button">
                {props.icon ? 
                    (<props.icon />) : 
                    (<Tag />)
                }
                <span>{props.fieldKey}</span>
            </DropMenuTrigger>
            <DropMenuContent id="chips-field-content">
                <div>
                    <h4>{props.fieldKey}</h4>
                </div>
                <div>
                    <input type="text" placeholder={`search ${props.fieldKey}...`} />
                </div>
                <div>
                    {props.fieldOptions.length? 
                        (
                            props.fieldOptions.map(option => 
                                <label key={option} htmlFor={option}>
                                    <div className="check-container">
                                        <Check />
                                    </div>
                                    <div className="key-container">
                                        <p>{option}</p>
                                    </div>
                                    <input type="checkbox" name={props.fieldKey} id={option} />
                                </label>
                            )
                        ):
                        (
                            <div className="empty-container">
                                <ArchiveX />
                                <p>no options</p>
                            </div>
                        )
                    }
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}