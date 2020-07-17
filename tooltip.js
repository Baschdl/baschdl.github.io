function openPopup(featureEvent) {
    if (featureEvent.data.observation_time) {
        let content = '<div class="widget">';
        content += `Data observed: ${featureEvent.data.observation_time}`;
        content += '</div>';

        console.log(featureEvent.data);

        popup.setContent(content);
        popup.setLatLng(featureEvent.latLng);
        if (!popup.isOpen()) {
            popup.openOn(map);
        }
    }
}

function closePopup(featureEvent) {
    popup.removeFrom(map);
}