import { Check } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";
import { SORT_PREFERENCE } from "@/lib/constants";
import { useFormContext } from "react-hook-form";

type Props = {
    fieldKeys: string[],
}

export default function SortField(props:Props) {
    const {} = useFormContext();
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
                            <input type="radio" name="sort" id={item} value={item} />
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
                            <input type="radio" name="sort-preference" id={preference} value={preference} />
                        </label>
                    )}
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}