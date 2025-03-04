import React, { useState, useEffect } from 'react';
import { getPagesOfWebsite } from '../services/ApiService';

const PageList = ({ websiteId, onSelectPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getPages = async () => {
      try {
        const data = await getPagesOfWebsite(websiteId);
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages', error);
      }
    };

    getPages();
  }, [websiteId]);

  return (
    <div className='list-container'>
      {pages.map((page) => (
        <div
          key={page.id}
          className='list-item'
          onClick={() => onSelectPage(page.id, page.path)}>
          {page.path}
        </div>
      ))}
    </div>
  );
};

export default PageList;
