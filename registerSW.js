if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('https://kangasta.github.io/pakka/sw.js', { scope: 'https://kangasta.github.io/pakka/' })})}