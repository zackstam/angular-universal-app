
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { writeFileSync } from 'fs';

const { AppServerModuleNgFactory } = require('./dist/server/main');
renderModuleFactory(AppServerModuleNgFactory, {
    document: '<app-root></app-root>',
    url: '/contact'
}).then(html => {
    console.log('Pre rendering successful ');
    writeFileSync('./prerender.html', html);
}).catch(error => {
    console.log(error);
});
