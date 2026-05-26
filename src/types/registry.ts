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

export interface UoMDTO {
    registryUomId?: number;
    registryUomCategoryId: number;
    registryUomName: string;
    registryUomType: string;
    registryUomFactor: number;
    registryUomActive: boolean;
}

export interface UoMPageDTO {
    repoUomData: UoMDTO[];
    repoUomTotalItems: number;
    repoUomPage: number;
    repoUomSize: number;
}

export interface UoMCategoryDTO {
    registryUomCategoryId?: number;
    registryUomCategoryName: string;
}

export interface UoMCategoryPageDTO {
    repoUomCategoryData: UoMCategoryDTO[];
    repoUomCategoryTotalItems: number;
    repoUomCategoryPage: number;
    repoUomCategorySize: number;
}

export interface ConfigParameterDTO {
    configParamId?: number;
    configParamKey: string;
    configParamValue: string;
}

export interface ConfigParameterPageDTO {
    repoConfigParamData: ConfigParameterDTO[];
    repoConfigParamTotalItems: number;
    repoConfigParamPage: number;
    repoConfigParamSize: number;
}

export interface RepoSequenceDTO {
    repoSequenceId?: number;
    repoSequenceCompanyId: number;
    repoSequenceCode: string;
    repoSequenceName: string;
    repoSequencePrefix: string;
    repoSequenceSuffix: string;
    repoSequencePadding: number;
    repoSequenceNextNumber: number;
}

export interface RepoSequencePageDTO {
    repoSequenceData: RepoSequenceDTO[];
    repoSequenceTotalItems: number;
    repoSequencePage: number;
    repoSequenceSize: number;
}

export interface ObjectStorageProviderDTO {
    objectStorageProviderId?: number;
    objectStorageProviderCode: string;
    objectStorageProviderType: string;
    objectStorageProviderEndpoint: string;
    objectStorageProviderRegion: string;
    objectStorageProviderAccessKey: string;
    objectStorageProviderSecretKey: string;
    objectStorageProviderIsActive: boolean;
    objectStorageProviderCreatedAt?: string;
}

export interface ObjectStorageProviderPageDTO {
    objectStorageProviderData: ObjectStorageProviderDTO[];
    objectStorageProviderTotalItems: number;
    objectStorageProviderPage: number;
    objectStorageProviderSize: number;
}

export interface ObjectBucketDTO {
    objectBucketId?: number;
    objectBucketProviderId: number;
    objectBucketCompanyId: number;
    objectBucketCode: string;
    objectBucketName: string;
    objectBucketIsExposed: boolean;
    objectBucketCreatedAt?: string;
}

export interface ObjectBucketPageDTO {
    objectBucketData: ObjectBucketDTO[];
    objectBucketTotalItems: number;
    objectBucketPage: number;
    objectBucketSize: number;
}

export interface ObjectsDTO {
    objectId?: number;
    bucketId: number;
    objectKey: string;
    objectOriginalName: string;
    objectMimeType: string;
    objectExtension: string;
    objectSizeBytes: number;
    objectCheckSum: string;
    objectStatus: string;
    objectCreatedAt?: string;
}

export interface ObjectsPageDTO {
    objectsData: ObjectsDTO[];
    objectsTotalItems: number;
    objectsPage: number;
    objectsSize: number;
}

export interface ObjectMetadataDTO {
    objectMetaId?: number;
    objectId: number;
    objectMetaKey: string;
    objectMetaValue: string;
}

export interface AiProviderDTO {
    aiProviderId?: number;
    aiProviderName: string;
    aiProviderApiKeySecret: string;
    aiProviderApiBaseUrl: string;
    aiProviderEmbeddingModel: string;
    aiProviderChatModel: string;
    aiProviderActive: boolean;
    aiProviderCreatedAt?: string;
    aiProviderUpdatedAt?: string;
}

export interface AiProviderPageDTO {
    aiProviderData: AiProviderDTO[];
    aiProviderTotalItems: number;
    aiProviderPage: number;
    aiProviderSize: number;
}
