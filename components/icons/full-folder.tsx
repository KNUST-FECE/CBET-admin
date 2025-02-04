import React from "react";

export default function FullFolder(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path id="secondary" d="M18,2H6A2,2,0,0,0,4,4v7a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V4A2,2,0,0,0,18,2Z" fill="#42A5F5"></path>
            <path id="primary" d="M20,10H11.4L9.7,8.29A1.05,1.05,0,0,0,9,8H4a2,2,0,0,0-2,2V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V12A2,2,0,0,0,20,10Z" fill="#FFCA28"></path>
        </svg>
    )
}