import React from 'react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineShopping,
  AiOutlineDatabase,
} from 'react-icons/ai';
import {
  MdOutlineSupportAgent,
  MdOutlinePeopleAlt,
  MdOutlineArticle,
  MdOutlineManageAccounts,
  MdOutlineCategory,
} from 'react-icons/md';

import { RiLuggageDepositLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

const itemsSider = [
  { label: 'Home', key: 'home', icon: <AiOutlineHome /> }, // remember to pass the key prop
  {
    label: 'Management',
    key: 'management',
    icon: <MdOutlineManageAccounts />,
    children: [
      {
        label: 'Customers',
        key: 'management-customers',
        icon: <MdOutlinePeopleAlt />,
      },
      {
        label: 'Employees',
        key: 'management-employees',
        icon: <MdOutlineSupportAgent />,
      },
      {
        label: 'Categories',
        key: 'management-categories',
        icon: <MdOutlineCategory />,
      },
      {
        label: 'Products',
        key: 'management-products',
        icon: <AiOutlineShopping />,
      },
      { label: 'Orders', key: 'sales-orders', icon: <MdOutlineArticle /> },
      {
        label: 'Suppliers',
        key: 'management-suppliers',
        icon: <RiLuggageDepositLine />,
      },
    ],
  },
  {
    label: 'Sales Management',
    key: 'sales',
    icon: <AiOutlineDatabase />,
    children: [
      {
        label: 'Orders',
        key: 'sales-orders',
        icon: <MdOutlineArticle />,
        children: [
          {
            label: 'Order statistics by status',
            key: 'orders-status',
          },
          {
            label: 'Statistics by payment method',
            key: 'orders-payment',
          },
          {
            label: 'Order statistics by revenue',
            key: 'orders-revenue',
            children: [
              {
                label: 'Revenue statistics over time',
                key: 'orders-revenue-overtime',
              },
            ],
          },
        ],
      },
    ],
  },
  { label: 'Settings', key: 'settings', icon: <AiOutlineSetting /> }, // which is required
];

export default function SiderMenu() {
  const navigate = useNavigate();
  return (
    <div>
      <Menu
        theme="light"
        mode="vertical"
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={itemsSider}
        onClick={({ key, keyPath, domEvent }) => {
          navigate('/' + key.split('-').join('/'));
          console.log(key);
        }}
      />
    </div>
  );
}
