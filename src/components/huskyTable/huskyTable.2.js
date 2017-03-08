/**
 * 已完成功能：edit
 * 未完成：delete,editCancle，add。search
 * editCancle.可调不同的check事件
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './huskyTable.less';

import SearchBox from './searchBox';
import EditableCell from './editableCell';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
const Search = Input.Search;

function HuskyTable({dispatch,huskyTableM, }) {
    const me = this;
    const {columns, } = huskyTableM;
    
    var newColumns = columns.map(
        (item, key) => {
            var render;
            if (item.dataIndex == 'operation') {
                render = (text, record, index) => {
                    return (
                        huskyTableM.dataSource.length > 1 ?
                            (
                                <div>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                        <Button type="danger" icon="minus"></Button>
                                    </Popconfirm>
                                    {record.editable ? <span><Icon
                                        type="check"
                                        className="editable-cell-icon-check"
                                        onClick={() => {checkConfim(record.key)}}
                                        /><Icon
                                        type="close"
                                        className="editable-cell-icon-checkCancle"
                                        onClick={() => {checkCancle(record.key)}}
                                        />
                                        </span>
                                        : <Icon
                                            type="edit"
                                            className="editable-cell-icon"
                                            onClick={() => {
                                                if(!huskyTableM.isEditLock)
                                                {
                                                    edit(record.key);
                                                }
                                                
                                            }} />
                                    }
                                </div>
                            ) : null
                    );
                };
            }
            else {
                render = (text, record, index) => {
                  
                    return (
                        <EditableCell
                            value={text}
                            onChange={onCellChange(index, item.dataIndex)}//()=>onCellChange(index, item.dataIndex)
                            editable={record.editable} />
                    );
                }
            }

            return { ...item, render: render };
        }
    )

    /*** 编辑时触发函数
     * 参数：key，key是datasourcs
     * 功能：将model的dataSource的editable更新，整个dataSource更新。
     */
    const edit = (editKey) => {
        // dispatch({ type: 'huskyTableM/updateState', payload: { onCellCanCleDataSource: onCellCanCleDataSource }});
                
        // var onCellCanCleDataSource= huskyTableM.dataSource.map((item, key) => {
        //     if (editKey == key) {
        //         return { ...item, editable: true }
        //     }
        //     else {
        //         return { ...item };
        //     }
        // });
        // dispatch({ type: 'huskyTableM/updateState', payload: { onCellCanCleDataSource: onCellCanCleDataSource }});


        /**
         * 将可编辑isEditLock锁住
         * */ 
        console.log('123',editKey);

        //将具体的item条目的editable的值修改一下。
        let newDataSource = huskyTableM.dataSource.map((item, key) => {
            if (editKey == key) {
                return { ...item, editable: true}
            }
            else {
                return { ...item };
            }
        });
        
        
        dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource,dataSourceBuffer:newDataSource,isEditLock: true}});
        // dispatch({ type: 'huskyTableM/updateState', payload: { onCellCanCleDataSource: huskyTableM.dataSource }});
        // dispatch({ type: 'huskyTableM/updateState', payload: { onCellCanCleDataSource: newDataSource }});
        
    };


    /***编辑成功的确认事件
     * 参数是点击成功按钮的key
     * 功能：将model的dataSource的整个值更新为onCellChangeDataSource缓存,将isEditChange改为false
     */
    const checkConfim = (checkKey) => {

        // isEditChange = isEditChange !=undefined ?isEditChange:huskyTableM.isEditChange;


        // //判断是否发生改变修改了，是走if,不是走else
        // if (isEditChange) {
        //     let newDataSource = huskyTableM.onCellChangeDataSource.map((item, key) => {
        //         if (checkKey == key) {
        //             return { ...item, editable: false }
        //         }
        //         else {
        //             return { ...item };
        //         }
        //     });
        //     dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource ,onCellChangeDataSource:newDataSource, isEditChange: false } });
        // }
        // else {
        //     let newDataSource = huskyTableM.dataSource.map((item, key) => {
        //         if (checkKey == key) {
        //             return { ...item, editable: false }
        //         }
        //         else {
        //             return { ...item };
        //         }
        //     });
        //     dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource, onCellChangeDataSource:newDataSource, isEditChange: false } });
        // }
            console.log("huskyTableM.dataSource",huskyTableM.dataSource[0].age);
            console.log("huskyTableM.dataSourceBuffer",huskyTableM.dataSourceBuffer[0].age);
        
            let newDataSource = huskyTableM.dataSourceBuffer.map((item, key) => {
                if (checkKey == key) {
                    return { ...item, editable: false }
                }
                else {
                    return { ...item };
                }
            });
            dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource , dataSourceBuffer:newDataSource,isEditLock: false,} });
    };


    /***编辑取消事件 */
    const checkCancle = (checkKey) => {

        // // let newItem= {...huskyTableM.onCellCanCleDataSource,editable:false};
        // // console.log('newItem12312312313213',newItem);
        // // console.log('newItem12312312313213',newItem);
        // // console.log('newItem12312312313213',newItem);
        // // console.log('newItem12312312313213',newItem);
        // // newItem = {...newItem, editable: !newItem.editable};
        // var newDataSource = huskyTableM.onCellCanCleDataSource.map((item, key) => {
        //         if (checkKey == key) {
        //             return { ...item,editable:false}
        //         }
        //         else {
        //             return { ...item };
        //         }
        // });
        // // check (checkKey,false);
        // // console.log()
        // dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource,onCellCanCleDataSource:newDataSource,isEditChange: false }});
        let newDataSource = huskyTableM.dataSource.map((item, key) => {
                if (checkKey == key) {
                    return { ...item, editable: false }
                }
                else {
                    return { ...item };
                }
            }
        );
        dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource , dataSourceBuffer:newDataSource,isEditLock: false, } });
    };


    const onCellChange = (index, key) => {
        if (!index && !key) {
            // console.log('123123');
            let dataSourceBuffer = [...huskyTableM.dataSource];
            dispatch({ type: 'huskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer } });
        }
        else {
            return (value) => {
                /*===============深拷贝，浅拷贝的bug==============*/
                // console.log('onCellChangeonCellChangeonCellChangehuskyTableM1111111.dataSource',huskyTableM.dataSource[0].age)        
                // debugger            
                // let dataSourceBuffer = [...huskyTableM.dataSource];
                // debugger
                // dataSourceBuffer[index][key] = value;
                // debugger      
                // console.log('onCellChangeonCellChangeonCellChangehuskyTableM1111111.dataSource',huskyTableM.dataSource[0].age)
                /*===============深拷贝，浅拷贝的bug==============*/
                
                var dataSourceBuffer = huskyTableM.dataSource.map(
                    (item,key) => {
                        return {...item};
                    }
                )
                dataSourceBuffer[index][key] = value;
                dispatch({ type: 'huskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer,} });
            };
        }
    }

    const onDelete = (index) => {
        const newDataSource = [...huskyTableM.dataSource];
        newDataSource.splice(index, 1);
        //   this.setState({ huskyTableM.newDataSource:newDataSource });
    }
    const handleAdd = () => {

        const newData = {
            key: huskyTableM.count,
            name: `Edward King ${huskyTableM.count}`,
            age: 32,
            address: `London, Park Lane no. ${huskyTableM.count}`,
        };

        const newDataSource = [...huskyTableM.dataSource, newData];
        // this.setState({
        //   huskyTableM.dataSource:newDataSource,
        //   huskyTableM.count: huskyTableM.count + 1,
        // });
    }
    return (
        <div className={styles["huskyTable"]}>
            <div className={styles["top"]}>
                <div className={styles["addBtn"]}><Button type="primary" icon="plus"></Button></div>
                <div className={styles["searchBox"]}><SearchBox /></div>
            </div>
            <Table bordered dataSource={huskyTableM.dataSourceBuffer} columns={newColumns} />
        </div>
    );
}

HuskyTable.propTypes = {
};

export default connect(({huskyTableM}) => ({huskyTableM}))(HuskyTable);


  