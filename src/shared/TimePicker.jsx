import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
import { useFiltro } from '../Filtrocontext.jsx';

const { RangePicker } = DatePicker;

const Timepicker = ({ Settime }) => {
  const { filtrofecha, setFiltrofecha } = useFiltro();

  const onChange = (date) => {
    if (date) {
      console.log('Date: ', date);
    } else {
      console.log('Clear');
    }
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From (formatted): ', dateStrings[0], ', to (formatted): ', dateStrings[1]);
      setFiltrofecha(dateStrings);
    } else {
      setFiltrofecha(null);
      console.log('Clear');
    }
  };
  

  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
  ];

  return (
    <Space direction="vertical" size={12}>
      <RangePicker presets={rangePresets} onChange={onRangeChange} />
    </Space>
  );
};

export default Timepicker;
