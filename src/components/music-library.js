import React, { useState, useEffect } from 'react';
import Album from './album/album';
import Artists from './artists/artists';
import Footer from './footer/footer';
import Header from './header/header';

const MusicLibrary = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filteredKey, setFilteredKey] = useState('Top Rated');
  const [musicData, setMusicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [artists, setArtists] = useState([])
  const [q, setQ] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState([]);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=50/json')
      .then((response) => response.json())
      .then(albumList => {
        const aList = albumList['feed']['entry'].slice(0, 49)
        resetArtistList(aList)
        setMusicData(aList)
        setFilteredData(aList)
      });
  }, [])

  const resetArtistList = (inpData) => {
    const data = inpData.map((ech) => ({ name: ech['im:artist'].label, image: ech["im:image"][2].label })).reduce((unique, o) => {
      if(!unique.some(obj => obj.name === o.name && obj.value === o.value)) {
        unique.push(o);
      }
      return unique;
    },[]);
    setArtists(data)
  }

  const filterBy = (inp, val) => {
    let data = JSON.parse(JSON.stringify(musicData))
    setFilteredKey(val)
    toggleFilter()

    if(inp == 'ara'){
      data = data.sort((a, b) => (a['im:artist'].label).localeCompare(b['im:artist'].label));
    }else if(inp == 'ard'){
      data = data.sort((a, b) => (b['im:artist'].label).localeCompare(a['im:artist'].label))
    }else if(inp == 'ala'){
      data = data.sort((a, b) => (a.title.label).localeCompare(b.title.label));
    }else if(inp == 'ald'){
      data = data.sort((a, b) => (b.title.label).localeCompare(a.title.label))
    }else if(inp == 'pa'){
      data = data.sort((a, b) => { return b['im:price'].label.split("$")[1] - a['im:price'].label.split("$")[1] });
    }else if(inp == 'pd'){
      data = data.sort((a, b) => { return a['im:price'].label.split("$")[1] - b['im:price'].label.split("$")[1] });
    }else if(inp == 'lr'){
      data = data.sort((a, b) => { return new Date(b['im:releaseDate'].label) - new Date(a['im:releaseDate'].label) });
    }else{
      data = data.sort((a, b) => { return new Date(a['im:releaseDate'].label) - new Date(b['im:releaseDate'].label) });
    }

    setFilteredData(data)

  }

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  const filterByNameTitle = (e) => {
    setQ(e.target.value)
    if (!q) {
      setFilteredData(musicData)
    }
    const dat = musicData.filter(item =>
      (item['im:name']['label'].toLowerCase().includes(e.target.value.toLowerCase()) || item['im:artist']['label'].toLowerCase().includes(e.target.value.toLowerCase())) 
    );
    setFilteredData(dat)
  };

  const albumSelection = (selAlbum) => {
    setSelectedAlbum(selAlbum)
  }

  return (

    <>

      <Header></Header>
      <main className="relative">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-xl bg-gray-900 w-full min-h-screen p-4">

              <h1 className='text-center text-lg font-bold text-white flex justify-center'>
                <img className='h-8 w-8' src="https://fc-euc1-00-pics-bkt-00.s3.amazonaws.com/0503658ea6cd8b74d5fbad80cc30943ce572cd3e7c114b58f7057a9a85b39e4f/f_marketingpicFull/u_42ccc176c6c2a38b131f3c4b3eb93271429345f4fd5e504decf0ab9ad13dc3b3/img_vvmnl6bact_e38948873531546f1856b3efcb6778bbd8b0014716005c147d558f9a09aa9815.png" alt="Legalesign Logo"/> Legalesign Music Store : Top {musicData.length}(50) Albums
              </h1>

              <div className="relative flex justify-between mb-4 w-auto text-left">

                <div className="shadow flex">
                  <input className="text-gray-300 focus:outline-none w-full rounded p-2 rounded-md border border-gray-300 bg-gray-800 text-sm" type="text" placeholder="Search by Title/Artist..." value={q} onChange={(e) => filterByNameTitle(e)} />
                </div>

                <div className="">
                  <button type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-900 focus:outline-none" aria-expanded="true" aria-haspopup="true" onClick={() => { toggleFilter() }}>
                    {filteredKey}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className={"absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " + (showFilter ? 'show' : 'hidden')} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                  <div className="py-1" role="none">

                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('tr', 'Top Rated') }}>Top Rated</a>
                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('lr', 'Latest Releases') }}>Latest Releases</a>
                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('or', 'Old releases') }}>Old releases</a>

                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ara', 'Artist A-Z') }}>Artist A-Z</a>
                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ard', 'Artist Z-A') }}>Artist Z-A</a>

                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ala', 'Album A-Z') }}>Album A-Z</a>
                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ald', 'Album Z-A') }}>Album Z-A</a>

                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('pd', 'Price Low to High') }}>Price Low to High</a>
                    <a className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('pa', 'Price High to Low') }}>Price High to Low</a>

                  </div>
                </div>
              </div>

              {q && (
                <p class="text-gray-300 mb-3">Showing {filteredData.length} results for " {q} "</p>
              )}

              {filteredData.map(function (e, index) {
                return (
                  <Album key={index} index={index+1} albumData={e} selAlbum={selectedAlbum} albumSelection={albumSelection}
                  ></Album>
                )
              }
              )}

              <h1 className="text-gray-300 mb-12 mt-6">Featured Artists</h1>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {artists.map(function (e, index) {
                  return (
                    <Artists
                      key={index}
                      artist={e}
                    ></Artists>
                  )
                }
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>

    </>

  );
};

export default MusicLibrary;
