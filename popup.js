function openPopup(featureEvent) {
    if (featureEvent.data.observation_time) {
        let content = '<div class="widget">';
        content += `Data observed: ${featureEvent.data.observation_time} ${featureEvent.data.product_id} ${featureEvent.data.cartodb_id}`;
        content += `</div>`;

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