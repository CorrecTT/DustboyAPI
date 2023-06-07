
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DustboyDataSourceOptions, } from '../types';
import { DataSourceHttpSettings } from '@grafana/ui';
import React, { } from 'react';

interface Props extends DataSourcePluginOptionsEditorProps<DustboyDataSourceOptions> { }

export function ConfigEditor(props: Props) {

  const { onOptionsChange, options } = props;

  return (
    <div className="gf-form-group">
      <DataSourceHttpSettings
        defaultUrl='https://www.cmuccdc.org'
        dataSourceConfig={options}
        onChange={onOptionsChange}
      />
    </div>
  );
}
