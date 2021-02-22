import 'ol/ol.css';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map';
import View from 'ol/View';
import Hash from './hash';
import proj4 from 'proj4';
import { get as getProjection, getTransform } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import TileGrid from 'ol/tilegrid/TileGrid';
import styleFunction from 'ol-mapbox-style/dist/stylefunction';


function olMap(styleJson, el, epsgCode) {
    document.getElementById(el).classList.add('olMap');

    proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
    proj4.defs("EPSG:3067", "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
  
    register(proj4);

    if (epsgCode && epsgCode == 'EPSG:3067') {
        const projection = getProjection(epsg),
            resolutions = [8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5],
            tileGrid = new TileGrid({
                extent: extent,
                resolutions: resolutions,
                tileSize: [256, 256]
            });
        projection.setExtent(extent);

        const hash = new Hash(),
            map = new Map({ target: el,
                view: new View({
                    projection: projection,
                    resolutions: resolutions
                })    
            });
        hash.addTo(map);

        return map;
    } else {

        const hash = new Hash(),
            map = new Map({ target: el });
        hash.addTo(map);

        apply(map, styleJson);
        return map;
    }
}

export { olMap };
