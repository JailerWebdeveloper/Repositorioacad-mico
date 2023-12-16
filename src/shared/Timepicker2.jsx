import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';


const onDateChange = (date, dateString) => {
  if (date) {
    console.log('Selected Date: ', date);
    console.log('Formatted Date: ', dateString);
  } else {
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

const Timepicker2 = ({ Settime }) => {
    const onDateChange = (date, dateString) => {
      if (date) {
        Settime(date);  // Llama a la función Settime con la fecha seleccionada
      } else {
        console.log('Clear');
      }
    };
  
    return (
      <Space direction="vertical" size={12}>
        <DatePicker className="w-full" onChange={onDateChange} />
      </Space>
    );
  };
  
  export default Timepicker2;