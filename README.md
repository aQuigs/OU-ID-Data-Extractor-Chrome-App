# OU Event Manager

This is a chrome app designed to aid with the management of attendance at school-based events (targeted for Oakland University).  It will track attendees and staff hosts of specified events in a tabular form that can be downloaded as a CSV file.  For the sake of redundancy prevention and security, downloading the attendance data will clear it from the application's storage.

## License Information

This project employs two third party libraries:
* [DataTables](https://www.datatables.net/) version 1.10.10 (MIT License)
* [CD.js](https://github.com/zocky/cdjs) version 0.2 (GPLv3 License)

Both have been slightly modified to better fit the chrome app environment for the purposes of this application.  As a result, **this application is GPLv3 licensed.** See LICENSE.txt for details.

## Running the Application

1. Open [chrome://extensions](chrome://extensions) in Google Chrome
2. Choose "Load unpacked extension..."
3. Navigate to and select the root directory of this repo
4. Launch the application:
  * On Chromebooks, search for "OU Event Tracker" and select the icon
  * On other operating systems, the application should appear in the [extensions](chrome://extensions) tab.  Choose "Launch" to open it

## Deploying the Application

1. Open [chrome://extensions](chrome://extensions) in Google Chrome
2. Choose "Pack extension..."
3. Set the extension root directory to the root of this repo
4. Choose "Pack Extension"
