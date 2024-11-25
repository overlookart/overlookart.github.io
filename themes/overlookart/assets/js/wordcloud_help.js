
import WordCloud from './modules/wordcloud2'

console.debug('wordcloud_help.js');
function initWordCloud  () {
    let wcElement = document.getElementById('wordcloud');
    if (!wcElement) {
        console.debug('wordcloud element not found');
        return;
    }
    let content = wcElement.innerText;
    
    console.debug('WordCloud Content:', content);
    let words = content.split('\n').map((item) => {
        let str = item.split('|')[0];
        var weight = parseInt(item.split('|')[1]);
        if (isNaN(weight)) {
            weight = Math.floor(Math.random() * 20) + 1;
        }
        return [str, weight]
    });
    
    console.debug('subStr', words);
        WordCloud(wcElement, { 
        list: words,
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


 