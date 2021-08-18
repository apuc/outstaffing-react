import SVGLoader from "react-loader-spinner";
import './loader.css'

export const Loader = ({ width=50, height=50 }) => {
    return (
        <div className='loader'>
            <SVGLoader
                type="Circles"
                color="#fff"
                height={height}
                width={width}
            />
        </div>
    );
}