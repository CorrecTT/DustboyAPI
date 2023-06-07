import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { DustboyDataSourceOptions, DustboyQuery } from '../types';

type Props = QueryEditorProps<DataSource, DustboyQuery, DustboyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery }: Props) {
  const onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, dustboyid: event.target.value });
  };

  const { dustboyid } = query;

  return (
    <div className="gf-form">
      <InlineField label="Dustboy ID" labelWidth={16}>
        <Input onChange={onQueryTextChange} value={dustboyid || ''} />
      </InlineField>
    </div>
  );
}
