import SVGLoader from "react-loader-spinner";
import './loader.css'

export const Loader = () => {
    return (
        <div className='loader'>
            <SVGLoader
                type="Circles"
                color="#fff"
                height={50}
                width={50}
            />
        </div>
    );
}