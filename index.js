import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { olMap } from './openlayers';
import { mlMap } from './maplibre';

const
  params = new URLSearchParams(document.location.search);

if(!params.get('page')) {
  document.location.search='?page=1';
}

applyPage(params);
applyMap(params);

window.goto = (page) => {
  const hash = document.location.hash,
    params = new URLSearchParams(document.location.search),
    url = new URL(document.location.href);
  params.set('page',page);
  url.search = params;

  const loc = `${url}#${hash}`;
  document.location=loc;

}

window.demo = (demo) => {
  console.log(demo);
  const hash = document.location.hash;
  switch (demo) {
    case 'features':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_beta1/index.html?lang=fin&crs=EPSG%3A3067&vector=false${hash}`;
      break;
    case 'quick':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_quick_beta1/index.html${hash}`;
      break;
    case 'simple':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_simple_beta1/index.html${hash}`;
      break;
    case 'styles':
      document.location = 
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_style_beta1/#12.49/-72.69304/-12.51414`;
      break;
  }
  return false;

};

function applyPage(params) {
  const pageVal = params.get('page');
  switch (pageVal) {
    case '1':
      document.body.classList.add(`page_${pageVal}`);
    case '2':
      document.body.classList.add(`page_${pageVal}`);
    case '3':
      document.body.classList.add(`page_${pageVal}`);
      break;
  }
}


function applyMap(params) {
  const apiKey = '7cd2ddae-9f2e-481c-99d0-404e7bc7a0b2',
    /* get your own api key at maanmittauslaitos.fi <<https://www.maanmittauslaitos.fi/rajapinnat/api-avaimen-ohje>> */

    styleName = 'kipa_kiinteistojaotus_raster_v1',
    tileMatrixSet = 'WGS84_Pseudo-Mercator',
    styleUrl = `https://beta-karttakuva.maanmittauslaitos.fi/kipa/${tileMatrixSet}/${styleName}.json`;

  const pageVal = params.get('page');

  fetch(styleUrl).then(r => r.json()).then(styleJson => {
    if (!(document.location.hash.length > 1)) {
      styleJson.center = [21.75184, 62.38502];
      styleJson.zoom = 13.08;
    }
    const url =
      styleJson.sources.rasteritaustakartta.tiles[0];

    styleJson.sources.rasteritaustakartta.tiles[0] =
      url.replace('karttamoottori', 'avoin-karttakuva').replace('maasto', 'avoin') + `?api-key=${apiKey}`;

    switch (pageVal) {
      case '1':
      case '2':
        document.body.classList.add(`olMap`);
        return olMap(styleJson, 'map')
        break;
      case '3':
        document.body.classList.add(`mlMap`);
        return mlMap(styleJson, 'map')
        break;
    }
  }).then(map=>{
    console.log(map);
    window.map =map;
  });

}