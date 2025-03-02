import React from 'react';

const WebsiteList = ({ websites, onSelectWebsite }) => {
    return (
      <div className='list-container'>
        {websites.map((website) => (
          <div
            key={website.id}
            className='list-item'
            onClick={() => onSelectWebsite(website.id, website.origin)}>
            {website.origin}
          </div>
        ))}
      </div>
    );
  };

export default WebsiteList;
