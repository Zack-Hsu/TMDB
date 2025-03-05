import { setStatus } from "@/store/slices/searchMovie"
import { MovieStatus } from "@/types/store/states/movie-types"
import { useDispatch } from "react-redux"

export default function Spinner(props: { loaderReduxState?: boolean, loadingStatus?: MovieStatus }) {
    const distpatch = useDispatch()
    if (!props.loadingStatus?.success) {
        setTimeout(() => {
            distpatch(setStatus({ success: true }))
        }, 1000)
    }
    if (props.loaderReduxState) {
        return (
            <div className="loadding">
                <div className="spinner-border" role="status">
                </div>
                {props.loadingStatus?.success ?
                    <span className="sr-only w-100 text-center">Loading...</span>
                    :
                    <span className="sr-only w-100 text-center">{props.loadingStatus?.noticeMessage}</span>
                }
            </div>
        )
    } else {
        return null
    }
}