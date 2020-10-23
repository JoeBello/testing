plugin.register('wgn', {
	route: '{replace-route}',
	title: 'client',
	icon: 'icon-chart-pie',
	interfaces: [
		{
			controller: 'wgnMainCtrl',
			template: 'wgn-main',
			type: 'fullPage',
			order: 300,
			topNav: true,
			routes: [
				'/:page'
			]
		},
		{
			controller: 'wgnSettingsCtrl',
			template: 'wgn-settings',
			type: 'settings'
		}
	]
});
