plugin.controller('wgnSettingsCtrl', ['$scope', 'wgnConfigSettings', 'wgnWebhook', ($scope, Config, webhook) => {
	$scope.config = new Config('client Settings')
		.multi(false)
		.toggle(true)
		.help('Here you can configure some settings for this plugin.')
		.icon('emo-sunglasses')
		.page('Application Form')
		.field({
			id: 'applicationFormId',
			name: 'Application Form',
			help: 'The form which contains the data to check.',
			type: 'form'
		})
		.field({
			id: 'targetFieldId',
			name: 'Target Field',
			help: 'The field which contains the specific data to check.',
			type: 'field',
			restrict: 'text-input',
			belongsTo: 'applicationFormId'
		})
		.webhook(webhook, {
			url: 'my-sample-backend-service',
			'form.id': 'applicationFormId'
		});
}]);
