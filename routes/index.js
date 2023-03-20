const express = require('express');
const router = express.Router();
const pathFunc = require('path');

const { interactiveApplicationResponse } = require('./utilities.js');


// availableLangs
// res.status(400).send('');

/*
router.get('/:languageTag/', (req, res, next) => {
	let lang = req.params.languageTag;
	let page = req.params.path;

	if(lang in availableLangs)
		next();
	else
		res.status(400).send('The language you requested is not supported at the moment.');
});
*/


path = 'search';
const searchRouter = require('./' + path);
router.use('/' + path, searchRouter);


path = 'query';
const queryFunction = require(`./${path}_function`);
router.post('/' + path, queryFunction);


var path = 'home';
router.get('/:languageTag/' + path, (req, res) => {
    res.render('home/index', {
	   pageName: 'home',
	   metadata: '{}',
	   lang: req.params.languageTag,
	   dictionary: null
	});
});

path = 'map';
router.get('/:languageTag/' + path, interactiveApplicationResponse(path));


path = 'db';
const entityRouter = require('./' + path);
router.use('/:languageTag/' + path, entityRouter);


path = 'download';
const downloadRouter = require('./' + path);
router.use('/:languageTag/' + path, downloadRouter);


/*path = 'about';
router.get('/:languageTag/' + path, (req, res) => {
   res.render('about/index', {
	   pageName: 'about',
	   metadata: '{}',
	   lang: req.params.languageTag,
	   dictionary: null
	});
});*/


path = 'examples';
router.get('/:languageTag/' + path, (req, res) => {
   res.render('examples/index', {
	   pageName: 'examples',
	   metadata: '{}',
	   lang: req.params.languageTag,
	   exampleId: req.query.id,
	   dictionary: null
	});
});


path = 'plot';
router.get('/:languageTag/' + path, interactiveApplicationResponse(path));


path = 'browser';
router.get('/:languageTag/' + path, interactiveApplicationResponse(path));



path = 'contact';
router.get('/:languageTag/' + path, (req, res) => {
   res.render('contact/index', {
	   pageName: 'contact',
	   metadata: '{}',
	   lang: req.params.languageTag,
	   dictionary: null
	});
});


/*path = 'forum';
router.get('/' + path, (req, res) => {
   res.render('forum/index', {page: path});
});*/


path = 'faq';
router.get('/:languageTag/' + path, (req, res) => {
   res.render('faq/index', {
	   pageName: 'faq',
	   metadata: '{}',
	   lang: req.params.languageTag,
	   questionId: req.query.id,
	   dictionary: null
	});
});


/*
router.get('/:languageTag', (req, res) => {
	res.redirect(`/${req.params.languageTag}/home`);
});
*/

path = '';
router.get('', (req, res) => {
   res.redirect('/en/home');
});


module.exports = router;