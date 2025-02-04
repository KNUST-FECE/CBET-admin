import React from "react";

export default function Folder(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M667 233.667H380.333L323.667 176.667C317.363 170.653 309.043 167.206 300.333 167H133.667C115.986 167 99.0286 174.024 86.5262 186.526C74.0238 199.029 67 215.986 67 233.667V567C67 584.681 74.0238 601.638 86.5262 614.14C99.0286 626.643 115.986 633.667 133.667 633.667H667C684.681 633.667 701.638 626.643 714.14 614.14C726.643 601.638 733.667 584.681 733.667 567V300.333C733.667 282.652 726.643 265.695 714.14 253.193C701.638 240.69 684.681 233.667 667 233.667Z" fill="black"/>
        </svg>
    )
}