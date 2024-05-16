import React from 'react';
import { Button, notification, Space } from 'antd';

export const showNotiSuccess = (message:string, descript: string) => {
    notification.success({
        message: message,
        description: descript,
        placement: 'topRight'
      });
};

export const showNotInfo = (message:string, descript: string) => {
  notification.info({
      message: message,
      description: descript,
      placement: 'topRight'
    });
};

export const showNotiError = (message:string, descript: string) => {
  notification.error({
      message: message,
      description: descript,
      placement: 'topRight'
    });
};

export const showNotiWarning = (message:string, descript: string) => {
  notification.warning({
      message: message,
      description: descript,
      placement: 'topRight'
    });
};
