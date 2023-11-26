export function useGmapScript() {

    return new Promise((resolve, reject) => {
        if (window.google?.maps?.places && new URLSearchParams(document.querySelector('#gmapscript').src).get('language') === localStorage.getItem('user-locale')) {
            resolve();
        } else {
            if (window.google?.maps?.places) {
                document.head.removeChild(document.querySelector('#gmapscript'))
                document.querySelectorAll("[src^='https://maps.googleapis.com/maps-api-v3/']").forEach(script => {
                    document.head.removeChild(script)
                })
                delete window.google

            }
            const gScript = document.createElement("script");
            gScript.id = 'gmapscript'
            gScript.setAttribute(
                "src",
                `https://maps.googleapis.com/maps/api/js?&libraries=places&callback=initMap&type=locality&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&language=${localStorage.getItem('user-locale')}`
            );

            window.initMap = () => {
                resolve()
            }

            gScript.onerror = async (err) => {
                reject(err);
            }

            document.head.appendChild(gScript);


        }
    })
}