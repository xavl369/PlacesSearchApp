/*
 Places APIs
 Access global POI data and rich content from 100K+ trusted sources 
 via places API for real-time venue search, discovery, and ranking.
*/

async function getPlaces(lat, lon, category) {

    const baseUrl = getBaseUrl();
    const apiKey = getApiKey();
    const apiUrl = `${baseUrl}/search`;
    const params = { ll: `${lat},${lon}` };
    if (category) {
        params.categories = category;
    }

    const queryParams = new URLSearchParams(params)
    const url = `${apiUrl}?${queryParams}`;
    const response = await GET(url, apiKey);
    return response.results;
}

function getPlacePhotos(id) {
    const baseUrl = getBaseUrl();
    const apiKey = getApiKey();
    const url = `${baseUrl}/${id}/photos?limit=1`;
    const response = GET(url, apiKey);
    return response;

}
function getPlaceTips(id) {
    const baseUrl = getBaseUrl();
    const apiKey = getApiKey();
    const url = `${baseUrl}/${id}/tips?limit=3`;
    const response = GET(url, apiKey);
    return response;
}

function getBaseUrl() {
    return document.querySelector('#foursquareAPIUrl').value;
}

function getApiKey() {
    return document.querySelector('#foursquareAPIKey').value;
}