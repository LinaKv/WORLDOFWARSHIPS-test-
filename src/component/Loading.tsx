import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type Props = {};

function Loading({}: Props) {
    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
    return <Spin indicator={antIcon} />;
}

export default Loading;
