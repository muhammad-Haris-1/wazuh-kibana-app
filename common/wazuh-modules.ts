/*
 * Wazuh app - Simple description for each App tabs
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { i18n } from '@kbn/i18n';

export const WAZUH_MODULES = {
  general: {
    title: i18n.translate('wazuhModules.securityEventsTitle', {
      defaultMessage: 'Security events',
    }),
    description: i18n.translate('wazuhModules.securityEventsDescription', {
      defaultMessage: 'Browse through your security alerts, identifying issues and threats in your environment.'
    })
  },
  fim: {
    title: i18n.translate('wazuhModules.integrityMonitoringTitle', {
      defaultMessage: 'Integrity monitoring',
    }),
    description: i18n.translate('wazuhModules.integrityMonitoringDescription', {
      defaultMessage: 'Alerts related to file changes, including permissions, content, ownership and attributes.'
    })
  },
  pm: {
    title: i18n.translate('wazuhModules.policyMonitoringTitle', {
      defaultMessage: 'Policy monitoring',
    }),
    description: i18n.translate('wazuhModules.policyMonitoringDescription', {
      defaultMessage: 'Verify that your systems are configured according to your security policies baseline.'
    })
  },
  vuls: {
    title:  i18n.translate('wazuhModules.vulnerabilityTitle', {
      defaultMessage: 'Vulnerabilities',
    }),
    description: i18n.translate('wazuhModules.vulnerabilityDescription', {
      defaultMessage: 'Discover what applications in your environment are affected by well-known vulnerabilities.'
    })
  },
  oscap: {
    title: i18n.translate('wazuhModules.openSCAPTitle', {
      defaultMessage: 'OpenSCAP',
    }),
    description: i18n.translate('wazuhModules.openSCAPDescription', {
      defaultMessage: 'Configuration assessment and automation of compliance monitoring using SCAP checks.'
    })
  },
  audit: {
    title: i18n.translate('wazuhModules.systemAuditingTitle', {
      defaultMessage: 'System auditing',
    }),
    description: i18n.translate('wazuhModules.systemAuditingDescription', {
      defaultMessage: 'Audit users behavior, monitoring command execution and alerting on access to critical files.'
    })
  },
  pci: {
    title: i18n.translate('wazuhModules.pciTitle', {
      defaultMessage: 'PCI DSS',
    }),
    description: i18n.translate('wazuhModules.pciDescription', {
      defaultMessage: 'Global security standard for entities that process, store or transmit payment cardholder data.'
    })
  },
  gdpr: {
    title: i18n.translate('wazuhModules.gdprTitle', {
      defaultMessage: 'GDPR',
    }),
    description: i18n.translate('wazuhModules.gdprDescription', {
      defaultMessage: 'General Data Protection Regulation (GDPR) sets guidelines for processing of personal data.'
    })
  },
  hipaa: {
    title: i18n.translate('wazuhModules.hipaaTitle', {
      defaultMessage: 'HIPAA',
    }),
    description: i18n.translate('wazuhModules.hipaaDescription', {
      defaultMessage: 'Health Insurance Portability and Accountability Act of 1996 (HIPAA) provides data privacy and security provisions for safeguarding medical information.'
    })
  },
  nist: {
    title: i18n.translate('wazuhModules.nistTitle', {
      defaultMessage: 'NIST 800-53',
    }),
    description: i18n.translate('wazuhModules.nistDescription', {
      defaultMessage: 'National Institute of Standards and Technology Special Publication 800-53 (NIST 800-53) sets guidelines for federal information systems.'
    })
  },
  tsc: {
    title: i18n.translate('wazuhModules.tscTitle', {
      defaultMessage: 'TSC',
    }),
    description: i18n.translate('wazuhModules.tscDescription', {
      defaultMessage: 'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy'
    })
  },
  ciscat: {
    title: i18n.translate('wazuhModules.ciscatTitle', {
      defaultMessage: 'CIS-CAT',
    }),
    description: i18n.translate('wazuhModules.ciscatDescription', {
      defaultMessage: 'Configuration assessment using Center of Internet Security scanner and SCAP checks.'
    })
  },
  aws: {
    title: i18n.translate('wazuhModules.awsTitle', {
      defaultMessage: 'Amazon AWS',
    }),
    description: i18n.translate('wazuhModules.awsDescription', {
      defaultMessage: 'Security events related to your Amazon AWS services, collected directly via AWS API.'
    })
  },
  office: {
    title: i18n.translate('wazuhModules.officeTitle', {
      defaultMessage: 'Office 365',
    }),
    description: i18n.translate('wazuhModules.officeDescription', {
      defaultMessage: 'Security events related to your Office 365 services.'
    })
  },
  gcp: {
    title: i18n.translate('wazuhModules.gcpTitle', {
      defaultMessage: 'Google Cloud Platform',
    }),
    description: i18n.translate('wazuhModules.gcpDescription', {
      defaultMessage: 'Security events related to your Google Cloud Platform services, collected directly via GCP API.' // TODO GCP
    })
  },
  virustotal: {
    title: i18n.translate('wazuhModules.virustotalTitle', {
      defaultMessage: 'VirusTotal',
    }),
    description: i18n.translate('wazuhModules.virustotalDescription', {
      defaultMessage: 'Alerts resulting from VirusTotal analysis of suspicious files via an integration with their API.'
    })
  },
  mitre: {
    title: i18n.translate('wazuhModules.mitreTitle', {
      defaultMessage: 'MITRE ATT&CK',
    }),
    description: i18n.translate('wazuhModules.mitreDescription', {
      defaultMessage: 'Security events from the knowledge base of adversary tactics and techniques based on real-world observations'
    })
  },
  syscollector: {
    title: i18n.translate('wazuhModules.syscollectorTitle', {
      defaultMessage: 'Inventory data',
    }),
    description: i18n.translate('wazuhModules.syscollectorDescription', {
      defaultMessage: 'Applications, network configuration, open ports and processes running on your monitored systems.'
    })
  },
  stats: {
    title: i18n.translate('wazuhModules.statsTitle', {
      defaultMessage: 'Stats',
    }),
    description: i18n.translate('wazuhModules.statsDescription', {
      defaultMessage: 'Stats for agent and logcollector'
    })
  },
  configuration: {
    title: i18n.translate('wazuhModules.configurationTitle', {
      defaultMessage: 'Configuration',
    }),
    description: i18n.translate('wazuhModules.configurationDescription', {
      defaultMessage: 'Check the current agent configuration remotely applied by its group.'
    })
  },
  osquery: {
    title: i18n.translate('wazuhModules.osqueryTitle', {
      defaultMessage: 'Osquery',
    }),
    description: i18n.translate('wazuhModules.osqueryDescription', {
      defaultMessage: 'Osquery can be used to expose an operating system as a high-performance relational database.'
    })
  },
  sca: {
    title: i18n.translate('wazuhModules.scaTitle', {
      defaultMessage: 'Security configuration assessment',
    }),
    description: i18n.translate('wazuhModules.scaDescription', {
      defaultMessage: 'Scan your assets as part of a configuration assessment audit.'
    })
  },
  docker: {
    title: i18n.translate('wazuhModules.dockerTitle', {
      defaultMessage: 'Docker listener',
    }),
    description: i18n.translate('wazuhModules.dockerDescription', {
      defaultMessage: 'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events.'
    })
  },
  github: {
    title: i18n.translate('wazuhModules.githubTitle', {
      defaultMessage: 'GitHub',
    }),
    description: i18n.translate('wazuhModules.githubDescription', {
      defaultMessage: 'Monitoring events from audit logs of your GitHub organizations.'
    })
  },
  devTools: {
    title: i18n.translate('wazuhModules.devToolsTitle', {
      defaultMessage: 'API console',
    }),
    description: i18n.translate('wazuhModules.devToolsDescription', {
      defaultMessage: 'Test the Wazuh API endpoints.'
    })
  },
  logtest: {
    title: i18n.translate('wazuhModules.logtestTitle', {
      defaultMessage: 'Test your logs',
    }),
    description: i18n.translate('wazuhModules.logtestDescription', {
      defaultMessage: 'Check your ruleset testing logs.'
    })
  },
  testConfiguration: {
    title: i18n.translate('wazuhModules.testConfigurationTitle', {
      defaultMessage: 'Test your configurations',
    }),
    description: i18n.translate('wazuhModules.testConfigurationDescription', {
      defaultMessage: 'Check configurations before applying them'
    })
  }
};
