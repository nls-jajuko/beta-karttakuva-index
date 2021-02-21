import { Map } from 'maplibre-gl'
import { NavigationControl } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';


function mlMap(styleJson, el) {
    const htmlEl = 
    document.getElementById(el);
    htmlEl.classList.add('mlMap');
    const map = new Map({
        container: el,
        hash: true
    });
    map.once('load', () => {
        console.log("LOADED");
        console.log(htmlEl.offsetHeight,"VS",htmlEl.parentElement.offsetHeight);
        htmlEl.style.height=htmlEl.parentElement.offsetHeight+"px";
        map.resize();

    });
    map.addControl(new NavigationControl(),'top-left');
    map.setStyle(styleJson);
    return map;
}

export { mlMap }