import { Check } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { SORT_PREFERENCE } from "@/lib/constants";
import { useFormContext } from "react-hook-form";
import { toCamelCase } from "@/lib/utils";

type Props = {
    fieldKeys: string[],
}

export default function SortField(props:Props) {
    const { watch, setValue } = useFormContext();

    const currentSort = watch("sort") || undefined;
    const activeField = currentSort && Object.keys(currentSort).find(key => currentSort[key] !== undefined);
    const sortOrder = activeField ? currentSort[activeField] === true ? SORT_PREFERENCE[0] : SORT_PREFERENCE[1] : SORT_PREFERENCE[0];

    const handleFieldSelection = (selectedField: string) => {
        const updatedSort = props.fieldKeys.reduce((acc, key) => {
            const fieldKey = toCamelCase(key);
            acc[fieldKey] = key === selectedField ? (sortOrder === SORT_PREFERENCE[0] ? true : false) : undefined;
            
            return acc;
        }, {} as Record<string, boolean | undefined>);

        setValue("sort", updatedSort, {shouldDirty: true});
    };

    const handleSortPreference = (preference: string) => {
        if (!activeField) return;

        const updatedSort = props.fieldKeys.reduce((acc, key) => {
            const fieldKey = toCamelCase(key);
            acc[fieldKey] = fieldKey === activeField ? (preference === SORT_PREFERENCE[0]) : undefined;
            return acc;
        }, {} as Record<string, boolean | undefined>);

        setValue("sort", updatedSort, {shouldDirty: true});
    };

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu sort-field-trigger" type="button">
                <span>sort</span>
            </DropMenuTrigger>
            <DropMenuContent id="sort-field-content" collisionPadding={30}>
                <div>
                    <h4>sort by</h4>
                </div>
                <div>
                    {props.fieldKeys.map(item => 
                        <label key={item} htmlFor={item}>
                            <div className="check-container">
                                <Check />
                            </div>
                            <div className="key-container">
                                <p>{item}</p>
                            </div>
                            <input 
                                type="radio"
                                name="sort"
                                id={item}
                                value={item}
                                checked={activeField === toCamelCase(item)}
                                onChange={() => handleFieldSelection(item)}
                            />
                        </label>
                    )}
                </div>
                <div>
                    {SORT_PREFERENCE.map(preference => 
                        <label key={preference} htmlFor={preference}>
                            <div className="check-container">
                                <Check />
                            </div>
                            <div className="key-container">
                                <p>{preference}</p>
                            </div>
                            <input 
                                type="radio" 
                                name="sort-preference" 
                                id={preference} 
                                value={preference}
                                checked={sortOrder === preference}
                                onChange={() => handleSortPreference(preference)}
                            />
                        </label>
                    )}
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}