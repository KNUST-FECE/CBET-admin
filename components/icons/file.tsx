import React from "react";

export default function File(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path id="primary" d="M4.29,8.29l6-6A1,1,0,0,1,11,2h7a2,2,0,0,1,2,2V20a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V9A1,1,0,0,1,4.29,8.29Z" fill="#42A5F5"></path>
            <path id="secondary" d="M4,9.14l6.93-1A1,1,0,0,0,11.79,7L10.81,2a1,1,0,0,0-.52.27l-6,6A1,1,0,0,0,4,9.14Z" fill="#E1F5FE"></path>
        </svg>
    )
}