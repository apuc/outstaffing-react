import SVGLoader from "react-loader-spinner";
export const Loader = () => {
    return (
        <div className='loader'>
            <SVGLoader
                type="Circles"
                color="#fff"
                height={50}
                width={50}
                timeout={3000}
            />
        </div>
    );
}