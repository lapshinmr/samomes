import Vue from 'vue';
import moment from 'moment';

Vue.filter('format', (value, format) => moment(value, 'YYYY-MM-DD').locale('ru').format(format));
