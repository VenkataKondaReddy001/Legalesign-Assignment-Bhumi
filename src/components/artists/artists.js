const Artists = ({artist}) => {
    return (
        <div className="relative bg-gray-800 py-6 px-6 rounded-3xl w-64 my-4 shadow-xl mb-8 hover:bg-gray-900">
            <div className=" text-gray-300 flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-gray-800 left-4 -top-6">
                <img className="album-img rounded-full w-8 h-8 border" src={artist['image']} alt={'itunes' + Math.random()} />
            </div>
            <div className="mt-6">
                <p className="text-md font-semibold my-2 text-gray-300">{artist['name']}</p>
            </div>
        </div>
    )
}

export default Artists
