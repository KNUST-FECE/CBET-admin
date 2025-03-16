import { IDataAction } from "@/lib/types";
import { X } from "lucide-react";

export default function SelectPopup(props:IDataAction) {

    return (
        <div 
            className="selected-popup"
            data-active={!!props.totalSelected}
        >
            <div className="total-selected">
                <p>selected: {props.totalSelected}</p>
            </div>
            <div className="action-buttons">
                {props.actions.map(action => (
                    <button
                        key={action.label}
                        onClick={action.trigger}
                        disabled={!props.totalSelected}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
            <div className="clear-selection">
                <button 
                    onClick={props.onClose}
                    disabled={!props.totalSelected}
                >
                    <X />
                </button>
            </div>
        </div>
    )
}