import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  

} from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { DustboyQuery, DustboyDataSourceOptions, DustboyStatus, AirQualityData } from './types';

export class DataSource extends DataSourceApi<DustboyQuery, DustboyDataSourceOptions> {
  url: string;
  name: string;
  withCredentials: boolean;
  headers: { [key: string]: string };

  constructor(instanceSettings: DataSourceInstanceSettings<DustboyDataSourceOptions>) {
    super(instanceSettings);
    if (instanceSettings.url) { this.url = instanceSettings.url; }
    else { this.url = 'https://www.cmuccdc.org'; }
    this.name = instanceSettings.name;
    this.withCredentials = instanceSettings.withCredentials || false;
    this.headers = { 'Content-Type': 'application/json' };
  }

  async query(options: DataQueryRequest<DustboyQuery>): Promise<DataQueryResponse> {
    console.log(`dustboyid = ${options.targets[0].dustboyid}`)
    console.log(`dustboy targe length = ${options.targets.length}`)    // Return a constan;t for each query.

    const option = { method: "GET", url: `${this.url}/api/ccdc/value/${options.targets[0].dustboyid}`, headers: this.headers, withCredentials: this.withCredentials };
    const r = await lastValueFrom(getBackendSrv().fetch<AirQualityData>(option));    // get data from Dustboy API
    
    if(r.status === 200){
      console.log((r.data.dustboy_name_en));  
      const data = options.targets.map((target) => {
        return new MutableDataFrame({
          refId: target.refId,
          fields: [
            { name: 'Station Name', values: [r.data.dustboy_name_en], type: FieldType.string },
            { name: 'Time', values: [r.data.log_datetime], type: FieldType.string },
            { name: 'PM2.5', values: [r.data.daily_pm25], type: FieldType.number },
          ],
        });
      });
      return { data };
    }else{
      const data = options.targets.map((target) => {
        return new MutableDataFrame({
          refId: target.refId,
          fields: [
            { name: 'Time', values: [], type: FieldType.time },
            { name: 'Value', values: [], type: FieldType.number },
          ],
        });
      });
      return { data };
  }
  }

  async testDatasource() {
    const options = { method: "GET", url: `${this.url}/api/ccdc`, headers: this.headers, withCredentials: this.withCredentials };

    const r = await lastValueFrom(getBackendSrv().fetch<DustboyStatus>(options));
    if (r.status === 200) {
      const resp = { status: 'success', message: `Datasource is work. ${r.data.message}`, title: 'Success' };
      return resp;
    }
    const resp = { status: 'error', message: r.data, title: 'Failed' };
    return resp;
  }

  buildOptions(parms: string) {
    return { method: "GET", url: `${this.url}/${parms}`, headers: this.headers, withCredentials: this.withCredentials };
  }
};


