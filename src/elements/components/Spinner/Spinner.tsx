export default function Spinner(props: { loaderReduxState?: boolean }) {
    if (props.loaderReduxState) {
        return (
            <div className="loadding">
                <div className="spinner-border" role="status">
                </div>
                <span className="sr-only w-100 text-center">Loading...</span>
            </div>
        )
    } else {
        return null
    }
}