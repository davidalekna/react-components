import React from 'react';
import DataBrowser from '../../../src/index';
import useData from '../../utils/useData';
import useWindowSize from '../../hooks/useWindowSize';

const columns = [
  { label: 'name', sortField: 'name', isLocked: true },
  { label: 'description', sortField: 'description' },
  { label: 'ingredients', sortField: 'ingredients' },
  { label: 'method', sortField: 'method' },
  { label: 'attenuation_level', sortField: 'attenuation_level' },
  { label: 'ebc', sortField: 'ebc' },
  { label: 'abv', sortField: 'abv' },
  { label: 'boil_volume', sortField: 'boil_volume' },
  { label: 'brewers_tips', sortField: 'brewers_tips' },
  { label: 'contributed_by', sortField: 'contributed_by' },
  { label: 'first_brewed', sortField: 'first_brewed' },
  { label: 'food_pairing', sortField: 'food_pairing' },
  { label: 'ibu', sortField: 'ibu' },
  { label: 'id', sortField: 'id' },
  { label: 'ph', sortField: 'ph' },
  { label: 'srm', sortField: 'srm' },
  { label: 'tagline', sortField: 'tagline' },
  { label: 'target_fg', sortField: 'target_fg' },
  { label: 'target_og', sortField: 'target_og' },
  { label: 'volume', sortField: 'volume' },
];

const LIST = 'LIST';
const GRID = 'GRID';
const LOADING = 'LOADING';

const views = [LIST, GRID, LOADING];

const viewSwitch = ({ viewType, data, props }) => ({
  loading: Loading = () => <div children="loading" />,
  list: List = () => <div children="list" />,
  ...rest
}) => {
  switch (viewType) {
    case 'LOADING':
      return 'LOADING COMPONENT WILL REPLACE THIS TEXT';
    case 'LIST':
      return <List data={data} {...props} {...rest} />;
    case 'GRID':
      return <div children="grid will be here" />;
    default:
      return null;
  }
};

export function BaseTable({ children, onToggleSort, ...rest }) {
  const { data, loading } = useData();
  const { width } = useWindowSize();
  const [viewType, switchViewType] = React.useState(LOADING);

  React.useEffect(() => {
    switchViewType(loading ? LOADING : LIST);
  }, [loading]);

  function generateColumnFlex() {
    switch (true) {
      case width <= 800:
        return ['0 0 25%', '1 1 75%'];
      case width >= 1200:
        return [
          '0 0 15%',
          '1 1 25%',
          '0 0 20%',
          '0 0 10%',
          '0 0 10%',
          '0 0 10%',
        ];
      default:
        return ['0 0 25%', '1 1 35%', '0 0 20%', '0 0 20%'];
    }
  }

  return (
    <DataBrowser
      columns={columns}
      totalItems={data.length}
      viewType={viewType}
      onSwitchViewType={switchViewType}
      initialColumnFlex={generateColumnFlex()}
      // on trigger log
      onToggleSort={field => onToggleSort(`${field.sortField}-${field.dir}`)}
      {...rest}
    >
      {props => {
        return children(
          viewSwitch({ viewType, data, props }),
          data,
          loading,
          props,
        );
      }}
    </DataBrowser>
  );
}
