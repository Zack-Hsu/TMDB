import ASC from "../ASC/ASC";
import DESC from "../DESC/DESC";

export default function SortButtonGroup() {
    return (
        <div className="position-fixed" style={{ bottom: '2rem', right: "1rem" }}>
            <div className="btn-group">
                <ASC />
                <DESC />
            </div>
        </div>
    )
}