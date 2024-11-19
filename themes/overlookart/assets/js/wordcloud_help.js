
import WordCloud from './modules/wordcloud2'


console.debug('wordcloud_help.js');
function initWordCloud  () {
    let wcElement = document.getElementById('wordcloud')
        console.debug('initWordCloud', wcElement.innerText);

        const jsonObject = JSON.parse(wcElement.innerText);
        console.debug('jsonObject', jsonObject);

        WordCloud(wcElement, { 
        list: jsonObject,
        gridSize: Math.round(16 * wcElement.clientWidth / 1024),
        weightFactor: function (size) {
            let wc = document.getElementById('wordcloud');
            return Math.pow(size, 2) * wc.scrollWidth / 1024;
        },
        drawOutOfBound: false,
        shrinkToFit: true,
        minSize: 10,
        // origin: [ wcElement.scrollWidth/2.0,100],
        shape: 'star',
        // fontweight:'900',
        rotateRatio: 0.5,
        // backgroundColor: '#f0f0f0',
    });
};
setTimeout(initWordCloud, 300);


 