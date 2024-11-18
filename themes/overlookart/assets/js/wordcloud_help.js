import { WordCloud } from '../../node_modules/wordcloud/src/wordcloud2.js';

WordCloud(document.getElementById('wordcloud'), { list: [['foo', 12], ['bar', 6]]});