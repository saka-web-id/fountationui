export interface CompanyLogSetting {
  companyId: number;
  companyName: string;
  companyEmail: string;
}

export interface LogSetting {
  logSettingId: number;
  logSettingEndpoint: string;
  logSettingMethod: string;
  logSettingLogFormat: string;
  logSettingEnabled: boolean;
}
