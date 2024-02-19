/*
Geolocation API
Secure context: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.
The Geolocation API allows the user to provide their location to web applications if they so desire. 
For privacy reasons, the user is asked for permission to report location information.
*/


const getGeoLocation = () => {
    try {
        if (!!navigator.geolocation) return navigator.geolocation;
        else return undefined;
    } catch (e) {
        return undefined;
    }
}


const geo_error = (error) => {
    switch (error.code) {
        case error.TIMEOUT:
            alert('Geolocation Timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Geolocation Position unavailable');
            break;
        case error.PERMISSION_DENIED:
            alert('Geolocation Permission denied');
            break;
        default:
            alert('Geolocation returned an unknown error code: ' + error.code);
    }
}
