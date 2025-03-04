import React from "react";
import SortButtonGroup from "../components/SortButtons/SortButtonGroup/SortButtonGroup";
import Header from "./Header/Header";

export default function BaseLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <div>
            <Header />
            {children}
            <SortButtonGroup />
        </div>
    )
}