import React, { useState, useEffect } from 'react';
import Moment from 'react-moment'
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
  const [selectedAlbum, setSelectedAlbum] = useState({});

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=50/json')
      .then((response) => response.json())
      .then(albumList => {
        const aList = albumList['feed']['entry'].slice(0, 49)
        setSelectedAlbum(aList[0])
        console.log(aList[0])
        resetArtistList(aList)
        setMusicData(aList)
        setFilteredData(aList)
      });
  }, [])

  const resetArtistList = (inpData) => {
    const data = inpData.map((ech) => ({ name: ech['im:artist'].label, image: ech["im:image"][2].label })).reduce((unique, o) => {
      if (!unique.some(obj => obj.name === o.name && obj.value === o.value)) {
        unique.push(o);
      }
      return unique;
    }, []);
    setArtists(data)
  }

  const filterBy = (inp, val) => {
    let data = JSON.parse(JSON.stringify(musicData))
    setFilteredKey(val)
    setQ('')
    toggleFilter()

    if (inp === 'ara') {
      data = data.sort((a, b) => (a['im:artist'].label).localeCompare(b['im:artist'].label));
    } else if (inp === 'ard') {
      data = data.sort((a, b) => (b['im:artist'].label).localeCompare(a['im:artist'].label))
    } else if (inp === 'ala') {
      data = data.sort((a, b) => (a.title.label).localeCompare(b.title.label));
    } else if (inp === 'ald') {
      data = data.sort((a, b) => (b.title.label).localeCompare(a.title.label))
    } else if (inp === 'pa') {
      data = data.sort((a, b) => { return b['im:price'].label.split("$")[1] - a['im:price'].label.split("$")[1] });
    } else if (inp === 'pd') {
      data = data.sort((a, b) => { return a['im:price'].label.split("$")[1] - b['im:price'].label.split("$")[1] });
    } else if (inp === 'lr') {
      data = data.sort((a, b) => { return new Date(b['im:releaseDate'].label) - new Date(a['im:releaseDate'].label) });
    } else if (inp === 'or') {
      data = data.sort((a, b) => { return new Date(a['im:releaseDate'].label) - new Date(b['im:releaseDate'].label) });
    } else {
      data = JSON.parse(JSON.stringify(musicData))
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

  return (

    <>

      <Header></Header>
      {musicData.length && (
        <main className="relative">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="rounded-xl bg-gray-900 w-full min-h-screen p-4">

                <h1 className='text-center text-lg font-bold text-white flex justify-center'>
                  <img className='h-8 w-8' src="https://fc-euc1-00-pics-bkt-00.s3.amazonaws.com/0503658ea6cd8b74d5fbad80cc30943ce572cd3e7c114b58f7057a9a85b39e4f/f_marketingpicFull/u_42ccc176c6c2a38b131f3c4b3eb93271429345f4fd5e504decf0ab9ad13dc3b3/img_vvmnl6bact_e38948873531546f1856b3efcb6778bbd8b0014716005c147d558f9a09aa9815.png" alt="Legalesign Logo" /> Legalesign Music Store : Top {musicData.length}(50) Albums
                </h1>

                {selectedAlbum && (
                  <div className="relative px-4 pt-4 pb-6 mx-auto max-w-7xl sm:px-6 lg:px-8 text-gray-300" >
                    <div className="max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-none lg:flex bg-gray-800">
                      <div className="px-3 py-8 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12" >
                        <a href={selectedAlbum['im:artist']?.attributes?.href} target="blank" className="link flex justify-center">
                          <img className="album-img rounded-full w-18 border" src={selectedAlbum["im:image"]?.[2].label} alt={'itunes' + Math.random()} />
                        </a>
                        <div className="mt-6">
                          <div className="rounded-md shadow">
                            <a href={selectedAlbum.id?.label} rel="noreferrer" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-900 focus:outline-none" target="_blank">Go to Album</a>
                          </div>
                        </div>
                        <div className="mt-4 text-sm">
                          <a href={selectedAlbum['im:artist'].attributes?.href} rel="noreferrer" className="font-medium text-gray-500 hover:text-gray-300" target="_blank">Or Go to
                            <span className="font-bold">Artist</span>
                          </a>
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-8 lg:p-12" >
                        <h3 className="text-2xl font-extrabold sm:text-3xl" >{selectedAlbum["im:name"]?.label}</h3>
                        <h3 className="text-xl font-extrabold sm:text-xl" >{selectedAlbum["im:artist"]?.label}</h3>
                        <div className="mt-8">
                          <div className="flex items-center">
                            <h4 className="flex-shrink-0 pr-4 text-sm font-semibold tracking-wider uppercase">ALbum Information</h4>
                            <div className="flex-1 border-t-2 border-gray-200"></div>
                          </div>
                          <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                            <li className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <p className="ml-3 text-sm ">Playlist count : {selectedAlbum["im:itemCount"]?.label}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <p className="ml-3 text-sm ">Price : {selectedAlbum["im:price"]?.label}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <p className="ml-3 text-sm">Release Date : <Moment format="DD/MM/YYYY">{selectedAlbum['im:releaseDate']?.label}</Moment></p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <p className="ml-3 text-sm">Category : {selectedAlbum.category?.attributes.term}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <p className="ml-3 text-sm">Content Type : {selectedAlbum['im:contentType']?.attributes.term}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <p className="ml-3 text-sm ">Copyrights {selectedAlbum?.rights?.label}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('tr', 'Top Rated') }}>Top Rated</div>
                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('lr', 'Latest Releases') }}>Latest Releases</div>
                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('or', 'Old releases') }}>Old releases</div>

                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ara', 'Artist A-Z') }}>Artist A-Z</div>
                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ard', 'Artist Z-A') }}>Artist Z-A</div>

                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ala', 'Album A-Z') }}>Album A-Z</div>
                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('ald', 'Album Z-A') }}>Album Z-A</div>

                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('pd', 'Price Low to High') }}>Price Low to High</div>
                      <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => { filterBy('pa', 'Price High to Low') }}>Price High to Low</div>

                    </div>
                  </div>
                </div>

                {q && (
                  <>
                    {filteredData.length > 0 ? (
                      <p className="text-gray-300 mb-3">Showing {filteredData.length} results for " {q} "</p>
                    ) : <p className="text-gray-300 mb-3">No results for " {q} "</p>
                    }
                  </>
                )}

                {filteredData.map(function (e, index) {
                  return (
                    <Album key={index} index={index + 1} albumData={e} selectedAlbum={selectedAlbum} albumSelection={setSelectedAlbum}
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
      )}
      <Footer></Footer>

    </>

  );
};

export default MusicLibrary;
