import 'ol/ol.css';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map';
import Hash from './hash';

function olMap(styleJson, el) {
    document.getElementById(el).classList.add('olMap');

    const hash = new Hash(),
        map = new Map({ target: el });
    hash.addTo(map);

    apply(map, styleJson);
    return map;
}

export { olMap };
