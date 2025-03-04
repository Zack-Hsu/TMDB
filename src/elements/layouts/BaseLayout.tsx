import React from "react";
import SortButtonGroup from "../components/SortButtons/SortButtonGroup/SortButtonGroup";

export default function BaseLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <div>
            {children}
            <SortButtonGroup />
        </div>
    )
}