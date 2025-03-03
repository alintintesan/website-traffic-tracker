
# Website Traffic Tracker

## Prerequisites
- Node.JS
- npm
- MySQL

## Components

### traffic-tracker-backend
This component contains all the server-side logic as well as the database integration for the Traffic Tracker. In order to start it, navigate to the `traffic-tracker-backend` directory and run `npm run start`. The server will run on `http://localhost:3000` by default.

#### Traffic tracker script
The traffic tracker script is provided via a GET request, so it can be easily embedded into a web page without having to manually add its code, this way, its implementation is also encapsulated. It can also be provided as a standard JavaScript file if it's needed. To add it in a HTML page, only the following line is required:
```
<script src="http://localhost:3000/tracker.js"></script>
```
This method facilitates fast delivery of new changes or updates to the clients that are using the script, because they don't have to add the updated script again to their website each time the script is updated. Also, it would add overhead and unnecessary code to their pages, only one line of code is needed to import and use it. 

The tracker counts a unique visit to a page only when the page is opened for the first time in a browser. Opening the same page in multiple tabs or instances of the same browser will not count as another visit. The unique counted visit will expire after one minute, so that after this time, another unique visit can be counted. This expiration time can be set to any number of minutes from the script. Opening the same page in a different browser or in an incognito-mode browser, will count as another visit. Visits are shared across the same browser tabs/instances but not across different browsers or incognito browsers.

#### API Endpoints

Base URL: `http://localhost:3000`

- `GET /tracker.js` retrieves the tracker script to be added to a website page, in order to track unique visits to that page.

- `POST /visits` sends visit data to the server so it can be tracked. The data is expected to be in a JSON format passed in the request body and contain the following: `{ url: <The URL of the visited page>, timestamp: <The timestamp of the visit as ISO string> }`. The result is a JSON array.

- `GET /websites/:websiteId/pages` retrieves all the pages of the website with the `websiteId` id as a JSON array.

- `GET /websites` retrieves all the websites as JSON array.

- `GET /pages/:pageId/visits/count?startDate=2025-02-28T00:00:00Z&endDate=2025-02-29T23:59:59Z` retrieves the number of visits tracked for the page with the `pageId` id as number. Additionally, start and end timestamps in ISO format can be passed as request parameters to retrieve the visits tracked only during a specific time interval. The result is a JSON object with the following structure: `{ visitsCount: <The number of visits>}`.

- `GET /websites/:websiteId/traffic/analyze` provides insights on unusual spikes or drops in traffic and offers potential reasons using the tracked visits of all the pages in the website with `websiteId` id. The result is a JSON object with the following structure: `{ result: '<The analysis result>' }`.

- `GET /websites/:websiteId/traffic/predict` provides predictions on future traffic patterns based on historical trends using the tracked visits of all the pages in the website with `websiteId` id. The result is a JSON object with the following structure: `{ result: '<The prediction result>' }`.

- `GET /websites/:websiteId/traffic/optimize` provides suggestions for optimizing traffic using the tracked visits of all the pages in the website with `websiteId` id. The result is a JSON object with the following structure: `{ result: '<The optimization analysis result>' }`.

### traffic-tracker-frontend
This component contains a simple React user-interface, that can display visit counts for each page of each website. First, a website must be selected, then, all the pages that belong to that website will be displayed and after selecting a page, the total visit count for that page will be displayed on the right. There's also an additional functionality that provides only the visit count that was tracked during a certain time period. This period can be adjusted using the `Filter visit count by time period` filter. In order to start it, navigate to the `traffic-tracker-front-end` directory and run `npm run start`.

### demo-websites
A number of five demo websites were created in order to test the tracker. Each one of them (their five html pages) is statically served by a http-server so it would mimic a real website with a domain and path. Running the servers can be done by running the batch script: `serve-websites.bat`. This will start five servers, each one corresponding to a website as such:

`http://127.0.0.1:4001` -> `demo-website-1`

`http://127.0.0.1:4002` -> `demo-website-2`

`http://127.0.0.1:4003` -> `demo-website-3`

`http://127.0.0.1:4004` -> `demo-website-4`

`http://127.0.0.1:4005` -> `demo-website-5`

This way, each website can be opened in the browser and be navigated to by opening its home page:

`http://127.0.0.1:4001/demo-website-1/dw1-home.html`

`http://127.0.0.1:4002/demo-website-2/dw2-home.html`

`http://127.0.0.1:4003/demo-website-3/dw3-home.html`

`http://127.0.0.1:4004/demo-website-4/dw4-home.html`

`http://127.0.0.1:4005/demo-website-5/dw5-home.html`

Each page from each website has the tracker script added to it, so accesing the pages will track the unique visits.

### MySQL database
This solution uses a simple MySQL database which is running locally, that stores the visits data. It consists of three tables: `website`, `page` and `visit`. Each table has an index set on the primary `id` column to speed up select and join operations used in the `traffic-tracker-backend`. The relations between tables are:

- `website` - `page` : `1:N` (One to Many)

    - Each website contains multiple pages.
    - Each page belongs to only one website.

- `page` - `visit` : `1:N` (One to Many)

    - Each page has either one or multiple visits.
    - Each visit was made to only one page.

![alt text](https://github.com/alintintesan/website-traffic-tracker/blob/main/database-schema.png)

## Additional AI features for future development
### Real-Time Anomaly Detection
For this feature, I would use an event-driven approach where I analyze the visit data as it is received by the server and offer a push notification or websockets mechanism to notify subscribed users in real-time if there are any anomalies detected.

### Bot Detection 
For this feature, I would update the tracker script first to collect additional data, such as: user-agent for detecting bot interaction, IP address to check the frequency of visits and use browser fingerprint to determine any suspicious patterns in the page interactions. I would then use Hugging Face's pre-trained models to detect bot interaction based on the collected data.
