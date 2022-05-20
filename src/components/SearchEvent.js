import { useState, useEffect } from 'react';

import styles from './SearchEvent.module.css';

function SearchEvent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [query, setQuery] = useState('');
  const [debouncedText, setDebouncedText] = useState(query);

  // debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://mobile-staging.gametime.co/v1/search?q=${debouncedText}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const results = await response.json();

        setIsLoaded(true);

        // Event
        let resultEvents = results.events.slice(0, 3).map((item) => {
          return {
            image: item?.performers[0]?.hero_image_url,
            name: item?.event?.name,
            subtitle: item?.venue?.name,
          };
        });

        // Performers
        let resultPeformers = results.performers.slice(0, 3).map((item) => {
          return {
            image: item?.hero_image_url,
            name: item?.name,
            subtitle: item?.category,
          };
        });

        //Venues
        let resultVenues = results.venues.slice(0, 3).map((item) => {
          return {
            image: item?.image_url,
            name: item?.name,
            subtitle: item?.city,
          };
        });

        //All Entities
        let FilteredItems = [
          ...resultEvents,
          ...resultPeformers,
          ...resultVenues,
        ];

        setItems(FilteredItems);
      };
      fetchData();
    } catch (error) {
      console.error(`Could Not Find Results: ${error}`);
    }
  }, [debouncedText]);

  return (
    <div className='gameTime'>
      <input
        className={styles.textbox}
        type='search'
        name='search-form'
        id='search-form'
        placeholder='Search for Event, Performer or Venue'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        <ul>
          {isLoaded ? (
            items.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.image} />
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.subtitle}</p>
                </div>
              </li>
            ))
          ) : (
            <h1>Loading....</h1>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchEvent;

//  He included node_modules in his solution. This is completely unnecessary given there is a lock file and ended up with a 58mb attachment instead of a few hundred kilobytes, which is what is expected
// - Code doesn't handle empty states. The app starts with "oakland" results pre-populated and doesn't gracefully handle errors or empty state
// - The UI is very different from the problem statement, the size of the input box changes depending on the search results.
// - The business logic happens entirely in one file (SearchEvent.js) inside the useeffect function.
