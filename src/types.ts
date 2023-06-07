import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface DustboyQuery extends DataQuery {
  dustboyid: string;
  
}



/**
 * These are options configured for each DataSource instance
 */
export interface DustboyDataSourceOptions extends DataSourceJsonData {
  // https://www.cmuccdc.org
  url: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface DustboySecureJsonData {
  apiKey?: string;
}

export interface DustboyStatus{
  status: boolean;
  message: string;
}

export interface AirQualityData {
  id: string;
  dustboy_id: string;
  dustboy_uri: string;
  dustboy_name: string;
  dustboy_name_en: string;
  dustboy_lat: string;
  dustboy_lon: string;
  pm10: number;
  pm25: number;
  wind_speed: number | null;
  wind_direction: number | null;
  atmospheric: number | null;
  pm10_th_aqi: string;
  pm10_us_aqi: string;
  pm25_th_aqi: string;
  pm25_us_aqi: string;
  temp: string;
  humid: string;
  us_aqi: string;
  us_color: string;
  us_dustboy_icon: string;
  us_title: string;
  us_title_en: string;
  us_caption: string;
  us_caption_en: string;
  th_aqi: string;
  th_color: string;
  th_dustboy_icon: string;
  th_title: string;
  th_title_en: string;
  th_caption: string;
  th_caption_en: string;
  daily_pm10: number;
  daily_pm10_th_aqi: string;
  daily_pm10_us_aqi: string;
  daily_pm25: number;
  daily_pm25_th_aqi: string;
  daily_pm25_us_aqi: string;
  daily_th_title: string;
  daily_th_title_en: string;
  daily_us_title: string;
  daily_us_title_en: string;
  daily_th_caption: string;
  daily_th_caption_en: string;
  daily_us_caption: string;
  daily_us_caption_en: string;
  daily_th_color: string;
  daily_us_color: string;
  daily_th_dustboy_icon: string;
  daily_us_dustboy_icon: string;
  daily_temp: string;
  daily_humid: string;
  daily_wind_speed: number | null;
  daily_wind_direction: number | null;
  daily_atmospheric: number | null;
  province_id: string;
  province_code: string;
  log_datetime: string;
}

