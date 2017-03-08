
/***
 * 2017.3.2
 * 耿鹏
 * 这个组件用来存table发生修改时候出现的input框。
 * 用得modle：无
 */


import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './searchBox.less';
import { Input, Icon, Button } from 'antd';


function EditableCell({dispatch, value, editable, onChange, }) {

  /**
   * input的change事件，此处用了onChange的回调函数，
   * onChange是Props的函数，返回值为匿名函数，形参：value
   */
  const handleChange = (e) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="editable-cell">
      {
        /**
         * editalbe是否显示input
         */
        editable ?
          <div className="editable-cell-input-wrapper">
            <Input
              value={value}
              onChange={handleChange}
              onPressEnter={handleChange}
              />

          </div>
          :
          <div className="editable-cell-text-wrapper">
            {value || ' '}
          </div>
      }
    </div>
  );
}
export default EditableCell;
