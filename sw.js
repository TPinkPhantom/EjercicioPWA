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

//Evento Activo
//Este evento permite que la aolicacion funcione Offline
self.addEventListener('activate',e =>{
    const cacheWhilelist = [CACHE_NAME];

//Que el evento espere a que termine de ejecutar
    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
        return Promise.all(
            cacheNames.map(cacheNames=>{
                if(cacheWhilelist.indexOf(cacheName)==-1)
                    {
                        //Borrar elementos que no se necesitan
                        return cache.delete(cacheName);
                    }
                })
            );
        })
        .then(()=>{
            //Activa la cache en el dispositivo
            self.clients.claim();
        })
    );
})

//Evento fetch
//Consigue la informacion de Internet (hace una consulta al backend)
//Cuando se salta de una pagina a otra pagina
//Ejemplo: Revisa si ya tiene lo recursos en el cache si no los solicita

self.addEventListener('fetch',e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res=> {
            if(res)
                {
                    //Devuelvo datos desde cache
                    return res;
                }
            return fetch(e.request);
            //Hago peticion al servidor en caso de que no este en el cache
        })
    );
});