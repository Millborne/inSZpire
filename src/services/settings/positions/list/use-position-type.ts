



// Position Type-specific interfaces based on API documentation
export interface PositionTypeData {
    position_type_ID?: string;
    type_name: string;
    position_type_description?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreatePositionTypeRequest {
    position_type_name: string;
    position_type_description?: string;
    is_archived?: number;
}

export interface UpdatePositionTypeRequest {
    position_type_ID: string;
    position_type_name?: string;
    position_type_description?: string;
    is_archived?: number;
}

export interface ViewPositionTypesRequest {
    search?: string;
    is_archived?: number;
}

export interface GetPositionTypeRequest {
    position_type_ID: string;
}


