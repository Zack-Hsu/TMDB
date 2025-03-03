import React from "react";

export default function BaseLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <div>{children}</div>
    )
}