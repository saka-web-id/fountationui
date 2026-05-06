export interface CountryStateDTO {
    registryCountryStateId?: number;
    registryCountryId: number;
    registryCountryStateCode: string;
    registryCountryStateName: string;
}

export interface CountryStatePageDTO {
    repoCountryStateData: CountryStateDTO[];
    repoCountryStateTotalItems: number;
    repoCountryStatePage: number;
    repoCountryStateSize: number;
}

export interface CountryDTO {
    repoCountryId?: number;
    repoCountryCode: string;
    repoCountryName: string;
    repoCountryPhoneCode: string;
    repoCountryActive: boolean;
}

export interface CountryPageDTO {
    repoCountryData: CountryDTO[];
    repoCountryTotalItems: number;
    repoCountryPage: number;
    repoCountrySize: number;
}

export interface CurrencyDTO {
    repoCurrencyId?: number;
    repoCurrencyName: string;
    repoCurrencySymbol: string;
    repoCurrencyPosition: string;
    repoCurrencyActive: boolean;
}

export interface CurrencyPageDTO {
    repoCurrencyData: CurrencyDTO[];
    repoCurrencyTotalItems: number;
    repoCurrencyPage: number;
    repoCurrencySize: number;
}

export interface LanguageDTO {
    repoLanguageId?: number;
    repoLanguageName: string;
    repoLanguageCode: string;
    repoLanguageIsoCode: string;
    repoLanguageActive: boolean;
    repoLanguageDirection: string;
}

export interface LanguagePageDTO {
    repoLanguageData: LanguageDTO[];
    repoLanguageTotalItems: number;
    repoLanguagePage: number;
    repoLanguageSize: number;
}
