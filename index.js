import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { olMap } from './openlayers';
import { mlMap } from './maplibre';

const
  params = new URLSearchParams(document.location.search);

if (!params.get('page')) {
  document.location.search = '?page=1';
}

applyPage(params);
applyMap(params,document.location.hash);

window.goto = (page) => {
  const hash = document.location.hash,
    params = new URLSearchParams(document.location.search),
    url = new URL(document.location.href);
  params.set('page', page);
  url.search = params;
  url.hash=hash;

  const loc = `${url}`;
  document.location = loc;

}

window.demo = (demo) => {
  console.log(demo);
  const hash = document.location.hash;
  switch (demo) {
    case 'features':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_beta1/index.html?lang=fin&crs=EPSG%3A3067&vector=false${hash}`;
      break;
    case 'tm35fin':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus-tm35fin-beta1/index.html${hash}`;
      break;
    case 'maplibre':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus-maplibregljs-beta1/index.html${hash}`;
      break;
    case 'ol':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus-openlayers-beta1/index.html${hash}`;
      break;
    case 'styles':
      document.location =
        `https://beta-karttakuva.maanmittauslaitos.fi/kipa/kiinteistojaotus_style_beta1/#12.49/-72.69304/-12.51414`;
      break;
  }
  return false;

};

window.github = (demo) => {
  console.log(demo);
  switch (demo) {
    case 'tm35fin':
      document.location =
        `https://github.com/nlsfi/beta-karttakuva.maanmittauslaitos.fi/tree/master/kipa/kiinteistojaotus-tm35fin-beta1`;
      break;
    case 'ol':
      document.location =
      `https://github.com/nlsfi/beta-karttakuva.maanmittauslaitos.fi/tree/master/kipa/kiinteistojaotus-openlayers-beta1`;
      break;
    case 'maplibre':
      document.location =
      `https://github.com/nlsfi/beta-karttakuva.maanmittauslaitos.fi/tree/master/kipa/kiinteistojaotus-maplibregljs-beta1`;
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


function applyMap(params,hash) {
  const pageVal = params.get('page');
  const apiKey = '7cd2ddae-9f2e-481c-99d0-404e7bc7a0b2',
    /* get your own api key at maanmittauslaitos.fi <<https://www.maanmittauslaitos.fi/rajapinnat/api-avaimen-ohje>> */

    styleName = pageVal == '3' ? 'kipa_kiinteistojaotus_maplibre_v1' :'kipa_kiinteistojaotus_raster_v1' ,
    tileMatrixSet = params.get('TileMatrixSet') || 'WGS84_Pseudo-Mercator',
    styleUrl = `https://beta-karttakuva.maanmittauslaitos.fi/kipa/${tileMatrixSet}/${styleName}.json`;

  


  fetch(styleUrl).then(r => r.json()).then(styleJson => {
    if (!(hash.length > 1)) {
      styleJson.center = [21.75184, 62.38502];
      styleJson.zoom = 13.08;
    }

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
  }).then(map => {
    console.log(map);
    window.map = map;
  });

}