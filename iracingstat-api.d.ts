declare namespace iRacingStatAPI {

    type ListResponse<T> = { data: T[] }

    type SuccessfulResponse<T> = { success: true } & T;

    type Error = {
        success: false;
        detail: string | { type: "missing", loc: string[] }[];
    };

    type Response<T> = SuccessfulResponse<T> | Error;

    interface $_RequestSchema {
        
        [key: string]: unknown

        "/health": { version: string }
    
    }

    interface $_RequestSchema {
        "/drivers/search": {
            data: {
                cust_id: number;
                display_name: string;
                club_name: string;
                country_code: string;
                oval_rating: number;
                road_rating: number;
                dirt_oval_rating: number;
                dirt_road_rating: number;
                sports_car_rating: number;
                formula_car_rating: number;
            }[];
        }
    }

}