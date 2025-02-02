import { animated, useSpring } from "@react-spring/web";
import { X } from "lucide-react";

type Props = {
    totalSelected: number,
    onClose: () => void,
    actions: {
        label: string,
        trigger: () => void,
        single?: boolean
    }[]
}

export default function SelectPopup(props:Props) {

    const styles = useSpring({
        opacity: !!props.totalSelected ? 1 : 0,
        transform: !!props.totalSelected ? "translate(-50%, 0%)" : "translate(-50%, 20%)",
        config: { tension: 300, friction: 15 },
    });

    return (
        <animated.div 
            className="selected-popup" 
            style = {styles} 
            data-active={!!props.totalSelected}
        >
            <div className="total-selected">
                <p>{props.totalSelected}</p>
            </div>
            <div className="action-buttons">
                {props.actions.map(action => (
                    <button 
                        onClick={action.trigger} 
                        data-hidden={ action.single && props.totalSelected !== 1}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
            <div className="clear-selection">
                <button onClick={props.onClose}>
                    <X />
                </button>
            </div>
        </animated.div>
    )
}