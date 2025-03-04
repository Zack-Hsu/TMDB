import LoginButton from "@/elements/components/LoginButton/LoginButton";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <h3>TMDB</h3>
                </Link>
                <div className="navbar-toggler border-0 d-block">
                    <LoginButton />
                </div>
            </div>
        </nav>
    )
}