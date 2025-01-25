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
            }[];
        },
        "/drivers/top/wins": {
            data: {
                cust_id: number;
                display_name: number;
                wins: number;
                oval_wins: number;
                dirt_oval_wins: number;
                dirt_road_wins: number;
                sportscar_wins: number;
                formulacar_wins: number
            }[];
        }, 

        "/drivers/{custId}": {
            information: {
                cust_id: number;
                display_name: string;
                club_name: string;
                country_code: string;
                total_events: number;
                total_races: number;
                total_wins: number;
                podiums: number;
                top_5: number;
                irating_events_avg_laps_completed: number;
                avg_finish_position_in_class: number;
                avg_start_position_in_class: number;
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
        "/drivers/{custId}/stats": {
            seasons_rollup: {
                season_year?: number;
                season_quarter?: number;
                total_events: number;
                total_races: number;
                total_wins: number;
                podiums: number;
                top_5: number;
                irating_events_avg_laps_completed: number;
                avg_finish_position_in_class: number;
                avg_start_position_in_class: number;
            }[];
        }
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
        },
        "/drivers/{custId}/tracks": {
            data: {
                track: string;
                raced: number;
                ir_change: number;
                cpi_change: number;
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
        },
        "/sessions/{sessionId}/results": {
            data: {
                cust_id: number;
                display_name: string;
                car_name: string;
                large_car_image: string;
                small_car_image: string;
                car_class_short_name: string;
                starting_position: number;
                starting_position_in_class: number;
                finish_position: number;
                finish_position_in_class: number;
                incidents: number;
                interval: number;
                class_interval: number;
                oldi_rating: number;
                newi_rating: number;
                ir_change: number;
                old_cpi: number;
                new_cpi: number;
                cpi_change: number;
                laps_complete: number;
                laps_lead: number;
            }[];
        }
    }

    // IRATING API
    interface $_RequestSchema {
        "/irating/filters": {
            distribution: {
                license_category: string;
                period: string;
            }[];
        }

        "/irating/distribution": {
            distribution: {
                irating_group: number;
                count_in_group: number;
                percentile: number;
            }[];
            kpis: {
                license_category: string;
                season_year: number;
                season_quarter: number;
                median_irating: number;
                yago_median_irating: number;
                top_1_percent: number;
                yago_top_1_percent: number;
                top_5_percent: number;
                yago_top_5_percent: number;
                top_10_percent: number;
                yago_top_10_percent: number;
                rating_std_dev: number;
                yago_rating_std_dev: number;
                avg_irating: number;
                yago_avg_irating: number;
                active_drivers: number;
            }
        };
    }

    interface $_RequestSchema {
        "/series/this_week": {
            data: {
                series_id: number;
                series_name: string;
                series_short_name: string;
                license_category: string;
                race_week_num: number;
                event_count: number;
            }[];
        },

        "/series/{seriesId}": {
            seasons: {
                season_id: number;
                series_id: number;
                season_name: string;
                active: boolean;
                car_class_ids: number[];
                car_switching: boolean;
                car_types: string[][];
                caution_laps_do_not_count: boolean;
                complete: boolean;
                cross_license: boolean;
                distributed_matchmaking: boolean;
                driver_change_rule: number;
                driver_changes: boolean;
                drops: number;
                enable_pitlane_collisions: boolean;
                fixed_setup: boolean;
                green_white_checkered_limit: number;
                grid_by_class: boolean;
                hardcore_level: number;
                has_supersessions: boolean;
                ignore_license_for_practice: boolean;
                incident_limit: number;
                incident_warn_mode: number;
                is_heat_racing: boolean;
                lucky_dog: boolean;
                max_team_drivers: number;
                max_weeks: number;
                min_team_drivers: number;
                multiclass: boolean;
                official: boolean;
                op_duration: number;
                race_week: number;
                schedule_description: number;
                season_year: number;
                season_quarter: number;
                season_short_name: string;
                track_types: string[][];
            }[];
        },


        "/series/{seriesId}/seasons": {
            seasons: {
                season_id: number;
                season_year: number;
                season_quarter: number;
                season_title: string;
                min_st: string;
                max_st: string;
                is_active_season: boolean;
                practice_sessions: number;
                race_sessions: number;
                time_trial_sessions: number;
                total_sessions: number;
            }[];
        },
        "/series/{seriesId}/seasons/{seasonId}/weeks": {
            weeks: {
                race_week_num: number;
                track_name: string;
                config_name: string;
                small_track_image: string;
                cars: {
                    car_name: string;
                    car_image: string;
                }[];
                car_class_names: string[];
                splits_this_week: number;
            }[];
        },
        "/seasons/{seasonId}/weeks/{weekNum}/avg_irating_laptime": {
            chart: {
                irating_group: number;
                avg_best_lap_time: number;
                avg_avg_lap_time: number;
                participants: number;
            }[];
        }
    }
}