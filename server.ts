// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { ngExpressEngine } from '@nguniversal/express-engine';

import * as express from 'express';
import { enableProdMode } from '@angular/core';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
enableProdMode();

const app = express();

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
}));

app.set('view engine', 'html');
app.set('views', __dirname + '/dist/browser');

app.get('*.*', express.static(__dirname + '/dist/browser', {
    maxAge: '1y'
}));

app.get('*', (req, res) => {
    res.render(__dirname + '/dist/browser/index.html', { req });
});

app.listen(9000, () => {
    console.log('now listening on http://localhost:9000');
});
