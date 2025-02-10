import { RefreshCw } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function RunFilterButton() {
    const { formState: {isDirty} } = useFormContext();

    return (
        <button type="submit" id="run-filter-button" disabled={!isDirty}>
            <RefreshCw />
            <span>run</span>
        </button>
    )
}