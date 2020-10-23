'use strict';

const $api = require('@zenginehq/backend-http');

/**
 * Does something awesome.
 *
 * @param {number} formId
 * @param {number} recordId
 * @param {Object} settings
 *
 * @return {Promise<*>}
 */
module.exports.method = function (formId, recordId, settings) {
	return $api.getRecord(formId, recordId).then(record => {
		// Do something.
	});
};
