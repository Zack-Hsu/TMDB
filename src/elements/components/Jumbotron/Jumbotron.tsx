export default function Jumbotron(props: { title: string, subtitle?: string }) {
    const { title, subtitle } = props
    return (
        <div className="jumbotron p-3">
            <h1 className="display-5">{title}</h1>
            {subtitle && (<p className="lead">{subtitle}</p>)}
            {/**
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
             */}
        </div>


    )
}