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

    // DRIVER API
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
        },
        "/drivers/{custId}": {
            information: {
                cust_id?: number;
                display_name?: string;
                club_name?: string;
                country_code?: string;
                oval_rating?: number;
                road_rating?: number;
                dirt_oval_rating?: number;
                dirt_road_rating?: number;
                sports_car_rating?: number;
                formula_car_rating?: number;
            },
            wins: {
                total_wins: number;
                oval_wins: number;
                road_wins: number;
                dirt_oval_wins: number;
                dirt_road_wins: number;
                sports_car_wins: number;
                formula_car_wins: number;
            },
            rival: {
                cust_id: number;
                name: string;
                times_beaten: number;
                club_name: string;
                country_code: string;
                oval_rating: number;
                road_rating: number;
                dirt_oval_rating: number;
                dirt_road_rating: number;
                sports_car_rating: number;
                formula_car_rating: number;
            }
        },
        "/drivers/{custId}/win-rate": {
            all_time: {
                categories: {
                    license_category: string;
                    total_events: number;
                    wins: number;
                    win_rate: number;
                    top_3: number;
                    top_5: number;
                    avg_finishing_position: number;
                }[];
                all: {
                    total_events: number;
                    wins: number;
                    win_rate: number;
                    top_3: number;
                    top_5: number;
                    avg_finishing_position: number;
                }
            },
        },
        "/drivers/{custId}/events": {
            data: {
                cust_id: number;
                display_name: string;
                subsession_id: number;
                start_time: string;
                end_time: string;
                num_drivers: number;
                event_laps_complete: number;
                winner_group_id: number;
                winner_name: string;
                license_category: string;
                track: string[];
                season_id: number;
                season_year: number;
                season_quarter: number;
                event_type: number;
                event_type_name: string;
                event_strength_of_field: number;
                event_average_lap: number;
                event_best_lap_time: number;
                simsession_number: number;
                simsession_name: string;
                simsession_type: number;
                simsession_type_name: string;
                finish_position_in_class: number;
                starting_position_in_class: number;
                oldi_rating: number;
                newi_rating: number;
            }[];
        },
        "/drivers/{custId}/irating": {
            data: {
                cust_id: number;
                newi_rating: number;
                oval_ir: number;
                road_ir: number;
                dirtoval_ir: number;
                dirtroad_ir: number;
                sportscar_ir: number;
                formulacar_ir: number;
            }[];
        }
    }

    // SESSION API
    interface $_RequestSchema {
        "/sessions/{sessionId}": {
            data: {
                session_id: number;
                subsession_id: number;
                start_time: string;
                end_time: string;
                license_category: string;
                num_drivers: number;
                num_cautions: number;
                num_caution_laps: number;
                num_lead_changes: number;
                event_laps_complete: number;
                driver_changes: boolean;
                winner_group_id: number;
                winner_name: string;
                track_config: string;
                track_name: string;
                official_session: boolean;
                season_id: number;
                season_year: number;
                season_quarter: number;
                event_type: number;
                event_type_name: string;
                series_id: number;
                series_name: string;
                series_short_name: string;
                race_week_num: number;
                event_strength_of_field: number;
                event_average_lap: number;
                event_best_lap_time: number;
            }
        }
    }

}