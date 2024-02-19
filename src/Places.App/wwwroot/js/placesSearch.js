(() => {
    let markers = [];
    let map;
    let mainMarker;
    let places = [];
    let lat;
    let lon;

    document.addEventListener('DOMContentLoaded', () => {

        const message = document.querySelector('#message');
        if (message.value) {
            toastr.success(message.value);
        }

        addInputsEvent();
    });
  
    const handleGeoCoordinates = (position) => {

        lat = position.coords.latitude;
        lon = position.coords.longitude;

        updateInputs(lat, lon);
        addMap(lat, lon);

        populateCategories(lat, lon);

        let selectLocation = document.querySelector('#selectLocation');
        selectLocation.addEventListener('change', onChangeCategory);
    }

    const onChangeCategory = async (e) => {

        const selectLocation = e.target;
        const selectedOption = selectLocation.options[selectLocation.selectedIndex];
        const category = selectedOption.value;

        if (category) {
            places = await getPlaces(lat, lon, category);
            removeMarkers(markers);
            addMarkers(places);
        }
        else {
            removeMarkers(markers);
        }
    }

    const populateCategories = async () => {

        let categories = localStorageGet('categories');
        if (!categories) {
            places = await getPlaces(lat, lon);
            categories = places.flatMap(place =>
                place.categories.map(category => ({ id: category.id, name: category.name })));
            localStorageSet('categories', categories);
        }

        let selectElement = document.querySelector('#selectLocation');

        categories.forEach(item => {
            let option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            selectElement.appendChild(option);
        });
    }

    const addMarkers = async (places) => {
        places.forEach(place => {

            const lat = place.geocodes.main.latitude;
            const lon = place.geocodes.main.longitude;
            let marker = L.marker([lat, lon], { title: place.name }).addTo(map);

            marker.place = place;
            markers.push(marker);
            marker.on('click', onMarkerClick);

        });
    }

    const onMarkerClick = async (e) => {

        const marker = e.target;
        const id = marker.place.fsq_id;
        const [photos, tips] = await Promise.all([getPlacePhotos(id), getPlaceTips(id)]);

        let popupOpen = false;
        if (popupOpen) {
            marker.closePopup();
            popupOpen = false;
        } else {

            const template = createMarkerPopUpTemplate(marker.place, tips, photos);
            marker.bindPopup(template)
                .openPopup();

            popupOpen = true;
        }
    }


    const updateInputs = (lat, lon) => {
        let latitudeInput = document.querySelector('#latitude');
        latitudeInput.value = lat;

        let longitudeInput = document.querySelector('#longitude');
        longitudeInput.value = lon;
    }

    const addMap = (lat, lon) => {
        map = L.map('map', { doubleClickZoom: false }).setView([lat, lon], 12);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        addMainMarker();
        map.on('dblclick', onMapDoubleClick);
    }

    const removeMarkers = (markers) => {
        markers.forEach(marker => { map.removeLayer(marker) });
        markers = [];
    }

    const onChangeLocation = () => {
        map.removeLayer(mainMarker);

        lat = document.querySelector('#latitude').value;
        lon = document.querySelector('#longitude').value;

        addMainMarker();
    }

    const onMapDoubleClick = (e) => {
        map.doubleClickZoom.disable();
        updateInputs(e.latlng.lat, e.latlng.lng);
        onChangeLocation();
    }

    const getCustomIconMarker = () => {
        let iconMarker = L.icon({
            iconUrl: "../images/marker_map_icon.png",
            iconSize: [48, 48],
            iconAnchor: [24, 48], // Adjust the anchor point based on the icon size
        });

        return iconMarker;
    }

    const createMarkerPopUpTemplate = (place, tips, photos) => {

        const location = place.location;
        const div = document.createElement("div");
        let template = `<b class='title'>${place.name}</b><br><br>
                            <b><i>Location</i></b>: <br>${location.formatted_address}<br><br>`;

        if (tips && tips.length > 0) {
            template += addTipsToTemplate(tips);
        }
        else {
            template += '<b><i>Tips</i></b>: No tips found';
        }

        let photoUrl = '';
        if (photos && photos.length > 0) {
            photoUrl = `${photos[0].prefix}original${photos[0].suffix}`;
            template += addPhotosToTemplate(photoUrl);
        }

        div.innerHTML = template;

        const buttonDiv = document.createElement("div");
        buttonDiv.className = 'save-button-container'

        const button = document.createElement("button");
        button.classList.add('btn', 'btn-primary');
        button.innerHTML = "Save Details";
        button.onclick = button.onclick = savePlace.bind(null, {
            id: place.fsq_id,
            name: place.name,
            address: location.formatted_address,
            coordinates: `${place.geocodes.main.latitude},${place.geocodes.main.longitude}`,
            image: photoUrl
        });

        buttonDiv.appendChild(button);
        div.appendChild(buttonDiv);
        return div;
    }

    const savePlace = async (placeModel, e) => {
        e.target.disabled = true;

        const response = await POST('/home/savePlace', placeModel);
        if (response.success) {
            toastr.success(response.message);
            addSavedPlaceToTable(placeModel);
        }
        else {
            toastr.error(response.message);
        }
    }

    const addTipsToTemplate = (tips) => {
        let template = '<b><i>Tips: </i></b><br><ul>';
        tips.forEach((tip) => {
            template += `<li>${tip.text}</li><br>`;
        });
        template += '</ul>';
        return template;
    }

    const addPhotosToTemplate = (photoUrl) => {
        let template = `<div class='photo-container'>
                                <img class='place-photo' src='${photoUrl}' alt="Place Image"/>
                             </div>`;
        return template;
    }

    const addInputsEvent = () => {
        let latitudeInput = document.querySelector('#latitude');
        let longitudeInput = document.querySelector('#longitude');

        latitudeInput.addEventListener('blur', onChangeLocation);
        longitudeInput.addEventListener('blur', onChangeLocation);
    }

    const addSavedPlaceToTable = (placeModel) => {
        const table = document.querySelector('#places-table');
        const tableBody = document.querySelector('#places-table tbody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
                <td>${placeModel.id}</td>
                <td>${placeModel.name}</td>
                <td>${placeModel.address}</td>
                <td>${placeModel.coordinates}</td>
                <td><img src="${placeModel.image}" alt="Image" class="img-thumbnail" /></td>
                <td><a href="/home/delete?id=${placeModel.id}">Delete</a></td>`;
        tableBody.appendChild(newRow);
    }

    const addMainMarker = () => {
        let iconMarker = getCustomIconMarker();
        mainMarker = L.marker([lat, lon], { icon: iconMarker }).addTo(map);
        mainMarker.bindTooltip("Current Location", { direction: 'top', offset: [-3, -48] }).openTooltip();
    }

    const init = () => {

        toastr.options.positionClass = 'toast-top-right';

        var geo = getGeoLocation();
        geo.getCurrentPosition(handleGeoCoordinates, geo_error);
    }

    init();

})();