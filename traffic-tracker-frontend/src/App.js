import React, { useState, useEffect } from 'react';
import PageList from './components/PageList';
import WebsiteList from './components/WebsiteList';
import VisitCount from './components/VisitCount';
import { getAllWebsites } from './services/ApiService';

const App = () => {
  const [websites, setWebsites] = useState([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [selectedWebsiteOrigin, setSelectedWebsiteOrigin] = useState(null);

  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedPagePath, setSelectedPagePath] = useState(null);

  useEffect(() => {
    const getWebsites = async () => {
      try {
        const data = await getAllWebsites();
        setWebsites(data);
      } catch (error) {
        console.error('Error fetching websites', error);
      }
    };

    getWebsites();
  }, []);

  const handleWebsiteSelect = (websiteId, websiteOrigin) => {
    setSelectedWebsiteId(websiteId);
    setSelectedWebsiteOrigin(websiteOrigin);
    setSelectedPageId(null);
    setSelectedPagePath(null);
  };

  const handlePageSelect = (pageId, pagePath) => {
    setSelectedPageId(pageId);
    setSelectedPagePath(pagePath);
  };

  return (
    <div className='container'>
      <WebsiteList websites={websites} onSelectWebsite={handleWebsiteSelect} />
      {selectedWebsiteId && <PageList websiteId={selectedWebsiteId} selectedOrigin={selectedWebsiteOrigin} onSelectPage={handlePageSelect} />}
      {selectedPageId &&
        <VisitCount
          pageId={selectedPageId}
          websiteOrigin={selectedWebsiteOrigin}
          pagePath={selectedPagePath} />
      }
    </div>
  );
};

export default App;
