export interface AiDatasourceDTO {
    aiDatasourceId?: number;
    aiDatasourceCompanyId: string;
    aiDatasourceCompanyCode: string;
    aiDatasourceName: string;
    aiDatasourceSourceService: string;
    aiDatasourceKafkaTopic: string;
    aiDatasourceIsActive: boolean;
    aiDatasourceTotalIngestedRecords: number;
    aiDatasourceCreatedAt?: string;
    aiDatasourceUpdateAt?: string;
}

export interface AiDatasourcePageDTO {
    aiDatasourceData: AiDatasourceDTO[];
    aiDatasourceTotalItems: number;
    aiDatasourcePage: number;
    aiDatasourceSize: number;
}
