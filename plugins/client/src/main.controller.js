plugin.controller('wgnMainCtrl', ['$scope', '$routeParams', 'znMessage', 'wgnConfigSrv',
	($scope, $routeParams, znMessage, configService) => {
		$scope.loading = true;

		// Keep this out of the $scope to avoid polluting it.
		const workspaceId = $routeParams.workspace_id;
		const formId = parseInt($routeParams.record.split('.')[0], 10);

		// Init plugin.
		init().then(() => {
			$scope.loading = false;
		});

		/**
		 * Boostraps the plugin.
		 *
		 * @private
		 */
		function init () {
			// Load settings if using multi config.
			return configService.load(workspaceId, true).then(configs => {
				// Find any applicable config.
				$scope.settings = configs.filter(cfg => cfg.targetFormId === formId)[0];
			}).catch(err => {
				znMessage(err, 'error');
			});

			// NOT MULTI CONFIG VERSION
			// return configService.load(workspaceId).then(config => {
			//     $scope.settings = config;
			// }).catch(err => {
			//     znMessage(err, 'error');
			// });
		}
	}]);
