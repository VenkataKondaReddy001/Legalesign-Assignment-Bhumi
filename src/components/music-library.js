import React, { useState, useEffect } from 'react';

const MusicLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=50/json')
      .then((response) => response.json())
      .then(albumList => {
        const aList = albumList['feed']['entry'].slice(0, 49)
        setMusicData(aList)
        setFilteredData(aList)
        console.log(aList)
      });
  }, [])

  const filterByName = (e) => {
    setQ(e.target.value)
    if (!q) {
      setFilteredData(musicData)
    }
    const dat = musicData.filter(item =>
      item['im:name']['label'].toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(dat)
  };

  return (
    <div className="p-10">
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            value={q}
            onChange={(e) => filterByName(e)}
          />
          <span className="sr-only">Search albums here</span>
        </label>
      </div>

      {filteredData.map(function (mdata, index) {
        return (
          <>
            <div className="rounded overflow-hidden shadow-lg mb-10">
              <img className="w-15" src={mdata['im:image'][0]['label']} alt="Artist" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{index + 1} {mdata['im:name']['label']}</div>
                <p className="text-gray-700 text-base">
                  <ul>
                    <li>
                      Title : {mdata['title']['label']}
                    </li>
                    <li>
                      Artist : {mdata['im:artist']['label']}
                    </li>
                    <li>
                      Price : {mdata['im:price']['label']}
                    </li>
                    <li>
                      Copyrights : {mdata['rights']['label']}
                    </li>
                  </ul>

                </p>
              </div>
            </div>

          </>
        );
      })}
    </div>
  );
};

export default MusicLibrary;
