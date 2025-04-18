import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const TextSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    // Initialize state from local storage
    const storedHistory = localStorage.getItem('searchHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const history = useHistory(); // Use history for navigation
  const inputRef = useRef<HTMLInputElement>(null); // Reference for the input field

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Save search history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Handle form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      // Add the new search term to the local storage directly
      const updatedHistory = [searchTerm, ...searchHistory];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

      // Navigate to the result page with the search term
      history.push('/result', { transcript: searchTerm });

      // Clear the input field
      setSearchTerm('');
    }
  };

  // Handle click on a search history item
  const handleHistoryClick = (term: string) => {
    // Navigate to the result page with the selected term
    history.push('/result', { transcript: term });
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex items-center mb-2 mt-2 mr-3">
        {/* Back Arrow */}
        <span
          className="material-symbols-outlined text-gray-500 cursor-pointer mr-4"
          onClick={() => history.push('/')} // Navigate to the home page
        >
          arrow_back
        </span>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-grow">
          <input
            ref={inputRef} // Attach the ref to the input field
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent border-none outline-none text-base text-zinc-300"
          />
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <img
            src="/src/assets/google-voice.png"
            alt="Voice Search"
            className="w-6 h-6 cursor-pointer mr-3"
            onClick={() => history.push('/voice-search')} // Navigate to Voice Search
          />
          <img
            src="/src/assets/google-lens.png"
            alt="Google Lens"
            className="w-6 h-6 cursor-pointer "
            onClick={() => history.push('/camera')} // Navigate to Camera
          />
        </div>
      </div>

      {/* Grey Line */}
      <div className="h-[1px] bg-zinc-500 mb-4 mt-4"></div>

      {/* Search History */}
      <div className="flex flex-col space-y-5 mt-7">
        {searchHistory.map((term, index) => (
          <div
            key={index}
            className="flex items-center text-zinc-300 cursor-pointer"
            onClick={() => handleHistoryClick(term)} // Handle click on history item
          >
            <span className="material-symbols-outlined text-zinc-400 mr-4 p-[4px] bg-zinc-700 rounded-full">
              schedule
            </span>
            <p className="text-base ml-2">{term}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSearch;