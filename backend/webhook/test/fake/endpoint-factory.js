'use strict';

const Http = require('zengo').fakes.znHttp;
const Firebase = require('zengo').fakes.firebase;
let fakeFbData = require('../data/firebase.json');
let fakeData = require('../data/endpoint.json');

let Config;

try {
	Config = require('../../config');
} catch (error) {}

function createFakeEndpointFactory () {
	const factory = {};

	factory.Http = Http(fakeData);
	factory.Firebase = new Firebase(null, fakeFbData);
	factory.config = Config;

	return factory;
}

module.exports = createFakeEndpointFactory;
