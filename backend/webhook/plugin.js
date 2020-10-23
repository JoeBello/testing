'use strict';

const $firebase = require('@zenginehq/backend-firebase');
const $api = require('@zenginehq/backend-http')();
const $webhook = require('@zenginehq/backend-webhooks');

const service = require('./src/service');

/* eslint-disable */
exports.run = function(eventData) {
/* eslint-enable */

	if (eventData.request.method !== 'POST') {
		return eventData.response.status(404).send('Not found');
	}

	const workspaceId = eventData.request.params.workspaceId;
	const activity = eventData.request.body.data[0];
	const resource = activity.resource;
	const action = activity.action;
	const formId = activity.record.form.id;
	const recordId = activity.record.id;

	// NOTE: If you are using multiple configurations uncomment tbese.
	// const configId = eventData.request.query.config;
	// if (!configId){
	//     return eventData.response.status(403).send('Config id required');
	// }

	// Sanity.
	if (!workspaceId || !activity || !resource || !action) {
		return eventData.response.status(400).send('Request context not valid.');
	}

	// Filter by action.
	if (resource !== 'records' || action !== 'update') { // @TODO Change this accordingly.
		return eventData.response.status(200).send('Nothing to act on');
	}

	// Don't let any errors slip through the cracks.
	try {
		// Load settings from firebase.
		// NOTE: If you are using multiple configurations replace with:
		// return $firebase.load([workspaceId, 'settings', configId]).then(settings => {
		return $firebase.load(workspaceId).then(settings => {
			if (!$webhook.validateSecret(settings, eventData.request)) {
				return eventData.response.status(403).send('Invalid Webhook Key');
			}

			// Load activity.
			return $api.getActivity(activity.id).then(fullActivity => {
				// @TODO check folder moves or whatever?
				console.log(fullActivity);

				// Route requests to
				return service.method(formId, recordId, settings);
			});
		}).then(res => {
			// @TODO maybe combine multiple items into a single string if res is an array.
			return eventData.response.status(200).send('Plugin ran sucessfully:' + res.toString());
		}).catch(err => {
			return eventData.response.status(400).send(makeErrMsg(err));
		});
	} catch (err) {
		// This is great for dev and harmless in production, better still rememember to comment it out.
		// @TODO check whether we have NODE_ENV set up
		console.error(err);
		return eventData.response.status(400).send(makeErrMsg(err));
	}
};

const makeErrMsg = err => {
	return typeof err === 'string' ? err : err.message || JSON.stringify(err);
};
