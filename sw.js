//Constante para nombrar
const CACHE_NAME='v1_cache_BCH_PWA';

//configuración de los archivos
var urlsToCache = [
    './',
    './css/style.css',
    './img/404.png',
    './img/icoCat 16x16.png',
    './img/icoCat 32x32.png',
    './img/icoCat 64x64.png',
    './img/icoCat 96x96.png',
    './img/icoCat 128x128.png',
    './img/icoCat 192x192.png',
    './img/icoCat 256x256.png',
    './img/icoCat 384x384.png',
    './img/icoCat 512x512.png'
];

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cahce => {
            return caches.addAll(urlsToCache)
            .then(()=>{
                self.skipWaiting();
            })
        })
        .catch(err => console.log('No se ha registrado la cache', err))
    );
});