import React from 'react';
import { Table, ConfigProvider } from 'antd';

import type { ColumnsType, TableProps } from 'antd/es/table';
import useGetShipsData from '../hooks/fetchShipsData';
import { Vehicle } from '../shared/types';
import { Uniq } from '../shared/types';

const onChange: TableProps<Vehicle>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

function tableForShips() {
    // get data from server
    const dataShips = useGetShipsData();

    // create object with uniq key
    const uniqData: Uniq = dataShips?.reduce(
        (acc: Uniq, cur) => {
            // create array with uniq classes
            if (!acc.nation.includes(cur.nation.title)) {
                acc.nation.push(cur.nation.title);
            }

            // create array with uniq class
            if (!acc.class.includes(cur.type.title)) {
                acc.class.push(cur.type.title);
            }

            // create array with uniq lvl
            if (!acc.lvl.includes(cur.level)) {
                acc.lvl.push(cur.level);
            }
            return acc;
        },
        { nation: [], class: [], lvl: [] },
    );

    // create filter to nation
    const uniqNationFilter = uniqData.nation.map((nation) => ({ text: nation, value: nation }));

    // create filter to class
    const uniqClassFilter = uniqData.class.map((shipClass) => ({ text: shipClass, value: shipClass }));

    // create filer to lvl
    const uniqLVLFilter = uniqData.lvl
        .sort((a, b) => {
            return a - b;
        })
        .map((lvl) => ({ text: lvl.toString(), value: lvl }));

    // settings to the table
    const columns: ColumnsType<Vehicle> = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '20%',
        },
        {
            title: 'Icons',
            dataIndex: 'icons',
            render: (icon) => (
                <div className="iconWrapper">
                    <img src={icon.large} alt="hi" className="shipsImg" />
                </div>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            filters: uniqClassFilter,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string | any, record) => record.type.title === value,
            render: (type) => <p>{type.title}</p>,
        },
        {
            title: 'LVL',
            dataIndex: 'level',
            filters: uniqLVLFilter,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string | any, record) => record.level === value,
        },
        {
            title: 'Nation',
            dataIndex: 'nation',
            filters: uniqNationFilter,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string | any, record) => record.nation.title === value,
            render: (nation) => (
                <div className="nationWrapper">
                    <div className="iconWrapper">
                        <img src={nation.icons.small} alt="" className="nationImg" />
                    </div>
                    <p>{nation.title}</p>
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        bodySortBg: '#0b344d',
                        headerBg: '#14608F',
                        borderColor: '#DBEEFA',
                        headerColor: '#ffff',
                        colorFillAlter: '#DBEEFA',
                    },
                    Pagination: {
                        colorPrimary: '#0b344d',
                        colorPrimaryHover: '#14608F',
                    },
                },
            }}
        >
            <Table
                scroll={{ y: 500 }}
                columns={columns}
                pagination={{
                    defaultPageSize: 5,
                    pageSizeOptions: [5],
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                }}
                dataSource={dataShips.map((ship) => ({ ...ship, key: ship.title }))}
                onChange={onChange}
                className="tableShips"
                style={{
                    position: 'static',
                    width: 700,
                }}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                }}
            />
        </ConfigProvider>
    );
}

export default tableForShips;
