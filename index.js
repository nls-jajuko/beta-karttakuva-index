import 'ol/ol.css';
import FullScreen from 'ol/control/FullScreen';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map';
import Hash from './hash';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const
  /* get your own api key at maanmittauslaitos.fi <<https://www.maanmittauslaitos.fi/rajapinnat/api-avaimen-ohje>> */
  apiKey = '7cd2ddae-9f2e-481c-99d0-404e7bc7a0b2',

  styleName = 'kipa_kiinteistojaotus_raster_v1',
  tileMatrixSet = 'WGS84_Pseudo-Mercator',
  styleUrl = `https://beta-karttakuva.maanmittauslaitos.fi/kipa/${tileMatrixSet}/${styleName}.json`;

const hash = new Hash(),
  map = new Map({ target: 'map' });
hash.addTo(map);

fetch(styleUrl).then(r => r.json()).then(styleJson => {
  if (!(document.location.hash.length > 1)) {
    styleJson.center = [21.75184, 62.38502];
    styleJson.zoom = 13.08;
  }
  const url =
    styleJson.sources.rasteritaustakartta.tiles[0];

  styleJson.sources.rasteritaustakartta.tiles[0] =
    url.replace('karttamoottori', 'avoin-karttakuva').replace('maasto', 'avoin') + `?api-key=${apiKey}`;
  apply(
    map, styleJson).then(function (map) {
      map.addControl(new FullScreen());
    });
});

window.demo = (demo) => {
  console.log(demo);
  const hash = document.location.hash;
  switch (demo) {
    case 'features':
      document.location=
      `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_beta1/index.html?lang=fin&crs=EPSG%3A3067&vector=true${hash}`;
      break;
    case 'quick':
      document.location=
      `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_quick_beta1/index.html${hash}`;
      break;
    case 'simple':
        document.location=
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_simple_beta1/index.html${hash}`;
        break;
    }
  return false;

};