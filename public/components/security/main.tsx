import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  EuiPage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTabs,
  EuiTab,
  EuiPanel,
  EuiCallOut,
  EuiEmptyPrompt,
  EuiSpacer,
} from '@elastic/eui';
import { Users } from './users/users';
import { Roles } from './roles/roles';
import { Policies } from './policies/policies';
import { GenericRequest } from '../../react-services/generic-request';
import { API_USER_STATUS_RUN_AS } from '../../../server/lib/cache-api-user-has-run-as';
import { AppState } from '../../react-services/app-state';
import { ErrorHandler } from '../../react-services/error-handler';
import { RolesMapping } from './roles-mapping/roles-mapping';
import {
  withReduxProvider,
  withGlobalBreadcrumb,
  withUserAuthorizationPrompt,
  withErrorBoundary,
} from '../common/hocs';
import { compose } from 'redux';
import { WAZUH_ROLE_ADMINISTRATOR_NAME, PLUGIN_PLATFORM_NAME } from '../../../common/constants';
import { updateSecuritySection } from '../../redux/actions/securityActions';
import { UI_LOGGER_LEVELS } from '../../../common/constants';
import { UI_ERROR_SEVERITIES } from '../../react-services/error-orchestrator/types';
import { getErrorOrchestrator } from '../../react-services/common-services';
import { getPluginDataPath } from '../../../common/plugin';
import { i18n } from '@kbn/i18n';
const name2 = i18n.translate('controller.manage.comp.confi.setting.name2', {
  defaultMessage: 'Users',
});
const name3 = i18n.translate('controller.manage.comp.confi.setting.name3', {
  defaultMessage: 'Roles',
});
const name4 = i18n.translate('controller.manage.comp.confi.setting.name4', {
  defaultMessage: 'Policies',
});
const name5 = i18n.translate('controller.manage.comp.confi.setting.name5', {
  defaultMessage: 'Roles mapping',
});
const descp1 = i18n.translate('components.security.main.wz.mapping.Descp1', {
  defaultMessage: 'For the role mapping to take effect, enable run_as in',
});
const descp2 = i18n.translate('components.security.main.wz.restart.descp2', {
  defaultMessage: 'Tconfiguration file, restart the',
});
const descp3 = i18n.translate('components.security.main.wz.clear.Descp3', {
  defaultMessage: 'service and clear your browser cache and cookies.',
});
const descp4 = i18n.translate('components.security.main.wz.api.Descp4', {
  defaultMessage:
    'The role mapping has no effect because the current Wazuh API user has allow_run_as disabled.',
});
const descp5 = i18n.translate('components.security.main.wz.run.Descp5', {
  defaultMessage: 'For the role mapping to take effect, enable run_as in',
});
const descp6 = i18n.translate('components.security.main.wz.file.Descp6', {
  defaultMessage:
    'configuration file and set the current Wazuh API user allow_run_as to true. Restart the',
});
const descp7 = i18n.translate('components.security.main.wz.chase.Descp7', {
  defaultMessage: 'service and clear your browser cache and cookies.',
});
const descp8 = i18n.translate('components.security.main.wz.role.Descp8', {
  defaultMessage:
    'The role mapping has no effect because the current Wazuh API user has run_as disabled.',
});
const descp9 = i18n.translate("components.security.main.wz..descp9", {
  defaultMessage: "users",
});
const descp10 = i18n.translate("components.security.main.wz.role.descp10", {
  defaultMessage: "roles",
});
const descp11 = i18n.translate("components.security.main.wz.role.descp11", {
  defaultMessage: "policies",
});
const descp12 = i18n.translate("components.security.main.wz.role.descp12", {
  defaultMessage: "roleMapping",
});
const tabs = [
  {
    id: 'users',
    name: name2,
    disabled: false,
  },
  {
    id: 'roles',
    name: name3,
    disabled: false,
  },
  {
    id: 'policies',
    name: name4,
    disabled: false,
  },
  {
    id: 'roleMapping',
    name: name5,
    disabled: false,
  },
];

export const WzSecurity = compose(
  withErrorBoundary,
  withReduxProvider,
  withGlobalBreadcrumb([{ text: '' }, { text: 'Security' }]),
  withUserAuthorizationPrompt(null, [WAZUH_ROLE_ADMINISTRATOR_NAME])
)(() => {
  const dispatch = useDispatch();

  // Get the initial tab when the component is initiated
  const securityTabRegExp = new RegExp(`tab=(${tabs.map((tab) => tab.id).join('|')})`);
  const tab = window.location.href.match(securityTabRegExp);

  const [selectedTabId, setSelectedTabId] = useState((tab && tab[1]) || 'users');

  const listenerLocationChanged = () => {
    const tab = window.location.href.match(securityTabRegExp);
    setSelectedTabId((tab && tab[1]) || 'users');
  };

  const checkRunAsUser = async () => {
    const currentApi = AppState.getCurrentAPI();
    try {
      const ApiCheck = await GenericRequest.request('POST', '/api/check-api', currentApi);
      return ApiCheck.data.allow_run_as;
    } catch (error) {
      throw new Error(error);
    }
  };

  const [allowRunAs, setAllowRunAs] = useState();
  useEffect(() => {
    try {
      const fetchAllowRunAs = async () => {
        setAllowRunAs(await checkRunAsUser());
      };
      fetchAllowRunAs();
    } catch (error) {
      const options = {
        context: `${WzSecurity.name}.fetchAllowRunAs`,
        level: UI_LOGGER_LEVELS.ERROR,
        severity: UI_ERROR_SEVERITIES.BUSINESS,
        store: true,
        error: {
          error: error,
          message: error.message || error,
          title: error.name || error,
        },
      };
      getErrorOrchestrator().handleError(options);
    }
  }, []);

  // This allows to redirect to a Security tab if you click a Security link in menu when you're already in a Security section
  useEffect(() => {
    window.addEventListener('popstate', listenerLocationChanged);
    return () => window.removeEventListener('popstate', listenerLocationChanged);
  });

  useEffect(() => {
    dispatch(updateSecuritySection(selectedTabId));
  });

  const onSelectedTabChanged = (id) => {
    window.location.href = window.location.href.replace(`tab=${selectedTabId}`, `tab=${id}`);
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        {...(tab.href && { href: tab.href, target: '_blank' })}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  const isNotRunAs = (allowRunAs) => {
    let runAsWarningTxt = '';
    switch (allowRunAs) {
      case API_USER_STATUS_RUN_AS.HOST_DISABLED:
        runAsWarningTxt = `${descp1} ${getPluginDataPath(
          'config/wazuh.yml',
        )} ${descp2} ${PLUGIN_PLATFORM_NAME} ${descp3}`;
        break;
      case API_USER_STATUS_RUN_AS.USER_NOT_ALLOWED:
        runAsWarningTxt = descp4;
        break;
      case API_USER_STATUS_RUN_AS.ALL_DISABLED:
        runAsWarningTxt = `${descp5} ${getPluginDataPath(
          'config/wazuh.yml',
        )} ${descp6}${PLUGIN_PLATFORM_NAME} ${descp7}`;
        break;
      default:
        runAsWarningTxt =descp8;
        break;
    }

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiCallOut title={runAsWarningTxt} color="warning" iconType="alert"></EuiCallOut>
          <EuiSpacer></EuiSpacer>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  return (
    <EuiPage>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTabs>{renderTabs()}</EuiTabs>
          <EuiSpacer size="m"></EuiSpacer>
          {selectedTabId === ${descp9} && <Users></Users>}
          {selectedTabId === ${descp10} && <Roles></Roles>}
          {selectedTabId === ${descp11} && <Policies></Policies>}
          {selectedTabId === ${descp12} && (
            <>
              {allowRunAs !== undefined &&
                allowRunAs !== API_USER_STATUS_RUN_AS.ENABLED &&
                isNotRunAs(allowRunAs)}
              <RolesMapping></RolesMapping>
            </>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPage>
  );
});
