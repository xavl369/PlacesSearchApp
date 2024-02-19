# Places Search App

This is a web application designed to search for places based on latitude and longitude coordinates. It utilizes a user interface where users can input latitude, longitude or select desired location by double click and select a category to search for places. The application displays the places on a map and provides additional details about each place when the user clicks on its marker.

## Features

- **Search by Coordinates**: Users can input latitude and longitude coordinates to search for places within the specified area.
- **Category Selection**: Users can select a category to filter the places they want to search for.
- **Interactive Map**: The application displays the places on an interactive map for easy visualization.
- **Place Details**: Users can view additional details about each place, including tips and photos, by clicking on its marker on the map.
- **Save Places**: Users can save details of a place for future reference.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: ASP.NET Core (MVC)
- **Mapping**: Leaflet.js
- **API Integration**: Foursquare API

## Usage

To use the application, follow these steps:

1. Input latitude and longitude coordinates in the designated fields or select the location by double click on the map.
2. Select a category from the dropdown list.
3. The map will display markers representing places based on the selected criteria.
4. Click on a marker to view additional details about the place, including tips and photos.
5. Save details of a place by clicking the "Save Details" button.

## Instructions

Follow these steps to install and run the project locally:
1. Clone the repository to your local machine using `git clone https://github.com/xavl369/PlacesSearchApp.git`.
2. Subscribe to the API https://location.foursquare.com/developer/reference/places-api-get-started.
3. Get an API Key and replace it on the file: appsettings.json as setting FoursquareAPIKey.
4. For more information about the endpoints visit: https://developer.foursquare.com/reference/place-search.
5. Update the connection string in the `appsettings.json` file to match your desired database configuration.


## Images

Sample images related to the project:

![image](https://github.com/xavl369/PlacesSearchApp/assets/31866236/1b36cc90-f34b-4155-b9e1-92ea11a625df)

![image](https://github.com/xavl369/PlacesSearchApp/assets/31866236/9f8ee3a8-f954-4dd5-aed0-8a2936e88b79)


## Contributors

- Abraham Saul Sandoval Meneses
