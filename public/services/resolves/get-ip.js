/*
 * Wazuh app - Module to fetch index patterns
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { StateProvider } from 'ui/state_management/state';
import { SavedObjectsClientProvider } from 'ui/saved_objects';

import healthCheck from './health-check'

export default (Promise, courier, config, $q, $rootScope, $window, $location, Private, appState, genericReq,errorHandler) => {
    const deferred = $q.defer();

    const catchFunction = error => {
        deferred.reject(error);
        $rootScope.blankScreenError = errorHandler.handle(error,'Elasticsearch',false,true);
        $location.path('/blank-screen');
    }

    if (healthCheck($window, $rootScope)) {
        deferred.reject();
        $location.path('/health-check');
    } else {
        const State = Private(StateProvider);
        const savedObjectsClient = Private(SavedObjectsClientProvider);
        savedObjectsClient.find({
            type   : 'index-pattern',
            fields : ['title'],
            perPage: 10000
        })
        .then(({ savedObjects }) => {
            genericReq.request('GET', '/get-list')
            .then(data => {
                let currentPattern = '';
                if (appState.getCurrentPattern()) { // There's cookie for the pattern
                    currentPattern = appState.getCurrentPattern();
                } else {
                    if(!data.data.data.length){
                        $rootScope.blankScreenError = 'Sorry but no valid index patterns were found'
                        $location.search('tab',null);
                        $location.path('/blank-screen');
                        return;
                    }
                    currentPattern = data.data.data[0].id;
                    appState.setCurrentPattern(currentPattern);
                }

                const onlyWazuhAlerts = savedObjects.filter(element => element.id === currentPattern);

                if (onlyWazuhAlerts.length === 0) { // There's now selected ip
                    deferred.resolve('No ip');
                    return;
                }

                courier.indexPatterns.get(currentPattern)
                .then(data => {
                    deferred.resolve({
                        list         : onlyWazuhAlerts,
                        loaded       : data,
                        stateVal     : null,
                        stateValFound: false
                    });
                })
                .catch(catchFunction);

            })
            .catch(catchFunction);
        })
        .catch(catchFunction);

    }
    return deferred.promise;
}