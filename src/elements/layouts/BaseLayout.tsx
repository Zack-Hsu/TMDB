import Head from "next/head";
import React from "react";

export default function BaseLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
            </Head>
            <div data-bs-theme="dark">{children}</div>
        </>
    )
}