import Moment from 'react-moment'
import './album.css'

const Album = ({ albumData, selectedAlbum, albumSelection }) => {


    return (

        <div className="overflow-hidden bg-gray-800 text-gray-300 w-full flex flex-row rounded-xl shadow-lg p-4 mb-2 cursor-pointer hover:bg-gray-900" >

            <div className="flex items-center">
                <a href={albumData.id.label} target="blank" className="link">
                    <img className="album-img rounded-full w-8 border" src={albumData["im:image"][2].label} alt={'itunes' + Math.random()} />
                </a>
            </div>

            <div className="flex flex-row items-center w-full pl-3 md:pl-5 md:pl-6 lg:pl-6" onClick={albumSelection(albumData)}>
                <div className="flex flex-col w-9/12" title={albumData.title.label}>
                    <div className="text-md font-bold h-6 truncate" >{albumData["im:name"].label}</div>
                    <div className="text-sm">{albumData["im:artist"].label} ( {albumData["im:itemCount"].label} songs )</div>
                    <div className="text-sm">{albumData["im:price"].label}</div>
                </div>
                <div className="flex items-center space-x-4 justify-end flex-col-reverse md:flex-row lg:md:flex-row xl:md:flex-row text-sm w-3/12">
                    <Moment format="DD/MM/YYYY">{albumData['im:releaseDate'].label}</Moment>
                    <a href={albumData.id.label} target="blank" className="text-gray-500 hover:text-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </a>
                    
                </div>
            </div>
        </div>

    )
};

export default Album;