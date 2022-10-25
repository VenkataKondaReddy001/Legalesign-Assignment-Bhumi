import Moment from 'react-moment'
import './album.css'

const Album = ({ albumData, selectedAlbum, albumSelection }) => {


    return (

        <div className="bg-gray-800 text-gray-300 w-full flex flex-row rounded-xl shadow-lg p-4 mb-2 cursor-pointer hover:bg-gray-900" >

            <div className="flex items-center mr-5">
                <a href={albumData.id.label} target="blank" className="link">
                    <img className="album-img rounded-full w-8 h-8 border" src={albumData["im:image"][2].label} alt={'itunes' + Math.random()} />
                </a>
            </div>

            <div className="flex flex-row items-center justify-between w-full" onClick={albumSelection(albumData)}>
                <div className="flex flex-col" title={albumData.title.label}>
                    <div className="text-md font-bold" >{albumData["im:name"].label.slice(0, 80)}</div>
                    <div className="text-sm">{albumData["im:artist"].label} ( {albumData["im:itemCount"].label} songs )</div>
                    <div className="text-sm">{albumData["im:price"].label}</div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
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

/*<ul className="album">

    <li className="album-item">
        <a href={link} target="blank" className="link">
            <img className="album-img" src={albumData["im:image"][2].label} alt={'itunes' + Math.random()} />
        </a>
    </li>

    <li className="title album-item">
        <a href={link} target="blank" className="link">
            {title.slice(0, 20)}..</a></li>
    <li className="price album-item">Price:{price}</li>

    <li className="date album-item">Released:{date}</li>

</ul> */