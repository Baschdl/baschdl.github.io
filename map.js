const tomorrow = new moment().hours(0).minutes(0).seconds(0).add(1, 'days').toDate();
const two_weeks_ago = new moment().hours(0).minutes(0).seconds(0).subtract(14, 'days').toDate();

const timeFilter = new carto.filter.Range('observation_time', {gte: two_weeks_ago, lte: tomorrow});

const all_query = 'SELECT cartodb_id, the_geom, the_geom_webmercator, dn, ' +
    'to_char(observation_time, \'YYYY-MM-DD\') as observation_time,' +
    'product_id, tile_id from snow';

const recent_query =
    'SELECT cartodb_id, the_geom, the_geom_webmercator, dn, to_char(observation_time, \'YYYY-MM-DD\') as observation_time, product_id, tile_id ' +
    'FROM snow, (SELECT tile_id as tile_id1, max(observation_time) as last_observation_time FROM snow GROUP BY tile_id, observation_time) as last_observation ' +
    'WHERE snow.tile_id = last_observation.tile_id1 AND snow.observation_time = last_observation.last_observation_time';

// --- Snow ---
const snowDataset = new carto.source.SQL(all_query);

const snowRecentDataset = new carto.source.SQL(recent_query);

const snowFilter = new carto.filter.Range('dn', {lte: 100, gte: 100});
const combinedSnowFilter = new carto.filter.AND([snowFilter, timeFilter]);

snowDataset.addFilter(combinedSnowFilter);
snowRecentDataset.addFilter(snowFilter);

// --- No Data ---
const noDataDataset = new carto.source.SQL(all_query);

const noDataRecentDataset = new carto.source.SQL(recent_query);

const noDataFilter = new carto.filter.Range('dn', {lte: 205, gte: 205});
const combinedNoDataFilter = new carto.filter.AND([noDataFilter, timeFilter]);

noDataDataset.addFilter(combinedNoDataFilter);
noDataRecentDataset.addFilter(noDataFilter);

const snowStyle = new carto.style.CartoCSS(getSnowStyle(1));
const newSnowLayer = new carto.layer.Layer(snowDataset, snowStyle, {
    featureOverColumns: ['observation_time']
});
const newSnowRecentLayer = new carto.layer.Layer(snowRecentDataset, snowStyle, {
    featureOverColumns: ['observation_time']
});

const noDataStyle = new carto.style.CartoCSS(getNoDataStyle(1));
const newNoDataLayer = new carto.layer.Layer(noDataDataset, noDataStyle, {
    featureOverColumns: ['observation_time']
});
const newNoDataRecentLayer = new carto.layer.Layer(noDataRecentDataset, noDataStyle, {
    featureOverColumns: ['observation_time']
});

function addBothLayers(client) {

    client.addLayers([newSnowRecentLayer, newNoDataRecentLayer]);

    snowLayer = newSnowRecentLayer;
    noDataLayer = newNoDataRecentLayer;

}