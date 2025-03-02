# Website Traffic Tracker

## Prerequisites
- Node.JS
- npm
- MySQL

## Components

### traffic-tracker-backend
This component contains all the server-side logic as well as the database integration for the Traffic Tracker. In order to start it, navigate to the `traffic-tracker-backend` directory and run `npm run start`. The server will run on `http://localhost:3000` by default.

The tracker is provided via a GET request, so it can be easily embedded into a web page without having to manually add its code, this way, its implementation is also encapsulated. It can be added in an html page like so:
```
<script src="http://localhost:3000/tracker.js"></script>
```

#### API Endpoints

Base URL: `http://localhost:3000`

- `GET /tracker.js` retrieves the tracker script to be added to a website page, in order to track unique visits to that page.

- `POST /visits` sends visit data to the server so it can be tracked. The data is expected to be in a JSON format passed in the request body and contain the following: `{ url: <The URL of the visited page>, timestamp: <The timestamp of the visit as ISO string> }`.

- `GET /websites/:websiteId/pages` retrieves all the pages of the website with the `websiteId` id as JSON array.

- `GET /websites` retrieves all the websites as JSON array.

- `GET /pages/:pageId/visits/count?startDate=2025-02-28T00:00:00Z&endDate=2025-02-29T23:59:59Z` retrieves the number of visits tracked for the page with the `pageId` id as number. Additionally, start and end timestamps in ISO format can be passed by params to filter the visits tracked only in a specific time interval.

- `GET /websites/:websiteId/traffic/analyze` provides insights on unusual spikes or drops in traffic and offers potential reasons using the tracked visits of all the pages in the website with `websiteId` id.

- `GET /websites/:websiteId/traffic/predict` provides predictions on future traffic patterns based on historical trends using the tracked visits of all the pages in the website with `websiteId` id.

- `GET /websites/:websiteId/traffic/optimize` provides suggestions for optimizing traffic using the tracked visits of all the pages in the website with `websiteId` id.

### traffic-tracker-frontend

### demo-websites