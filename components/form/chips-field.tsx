import { ArchiveX, Check} from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";

type Props = {
    fieldKey: string,
    fieldOptions: string[]
}

export default function ChipsField(props:Props) {
    const { register, watch, setValue } = useFormContext();
    const selectedValues: string[] = watch(props.fieldKey) || [];
    const [search, setSearch] = useState("");

    const toggleValue = (option: string) => {
        const newValues = selectedValues.includes(option)
            ? selectedValues.filter(val => val !== option) // Remove if already selected
            : [...selectedValues, option]; // Add if not selected
        setValue(props.fieldKey, newValues);
    };

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu chips-field-trigger" type="button">
                <span>{props.fieldKey}</span>
            </DropMenuTrigger>
            <DropMenuContent id="chips-field-content">
                <div>
                    <h4>{props.fieldKey}</h4>
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
                                    <input 
                                        type="checkbox" 
                                        name={props.fieldKey} 
                                        id={option} 
                                        value={option} 
                                        checked={selectedValues.includes(option)}
                                        onChange={() => toggleValue(option)} 
                                    />
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