/**
 * 已完成功能：editdelete,editCancle，add。search
 * 未完成：
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


    /*
    *columns的假数据,增加了底部事件栏的渲染
    */
    const {columns, } = huskyTableM;
    var newColumns = columns.map(
        (item, key) => {
            var render;
            if (item.dataIndex == 'operation') {
                render = (text, record, index) => {
                    return (
                        huskyTableM.dataSource.length > 0 ?
                            (
                                <div>
                                    <Popconfirm title="Sure to delete?" onConfirm={() =>onDelete(record.key)}>
                                        <Button type="danger" icon="minus"></Button>
                                    </Popconfirm>
                                    {record.editable ? <span><Icon
                                        type="check"
                                        className="editable-cell-icon-check"
                                        onClick={() => checkConfim(record.key)}
                                        /><Icon
                                        type="close"
                                        className="editable-cell-icon-checkCancle"
                                        onClick={() => checkCancle(record.key)}
                                        />
                                        </span>
                                        : <Icon
                                            type="edit"
                                            className="editable-cell-icon"
                                            onClick={() =>edit(record.key)} />
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
        /**
         * 将可编辑isEditLock锁住
         * */ 
        
        if(!huskyTableM.isEditLock){
            //将具体的item条目的editable的值修改一下。
            let newDataSource = huskyTableM.dataSource.map((item, key) => {
                if (editKey == item.key) {
                    return { ...item, editable: true}
                }
                else {
                    return { ...item };
                }
            });
            dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource,dataSourceBuffer:newDataSource,isEditLock: true}});
        }
    };


    /***编辑成功的确认事件
     * 参数是点击确认按钮的key
     * 功能：将model的dataSource，dataSourceBuffer的整个值更新为dataSourceBuffer缓存,将isEditLock改为false，释放
     */
    const checkConfim = (checkKey) => {

        for (let [index, elem] of huskyTableM.dataSourceBuffer.entries()) {
            
            if(elem.key == checkKey)
            {
                 var bufferItem = elem;
                //  break;
            }
        }
        var arr = Object.keys(bufferItem)
        var isNull = false;
        
        for(let [index,elem] of arr.entries() )
        {
            if(bufferItem[elem]=='')
            {
                isNull = true;
            }

        }
        
        if(!isNull)
        {
            let newDataSource = huskyTableM.dataSourceBuffer.map((item, key) => {
                if (checkKey == item.key) {
                    return { ...item, editable: false }
                }
                else {
                    return { ...item };
                }
            });
            dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource , dataSourceBuffer:newDataSource,isEditLock: false,isNewItem: false} });
        }
        else{
            alert('请填入数据')
        }
    };


    /***
     * 编辑取消事件 
     * 参数是点击取消按钮的key
     * 功能：将model的dataSource，dataSourceBuffer的整个值更新为回退为实际的值,将isEditLock改为false，释放
     */
    const checkCancle = (checkKey) => {
        // console.log('huskyTableM.isNewItem',huskyTableM.isNewItem)
        if(!huskyTableM.isNewItem){
            let newDataSource = huskyTableM.dataSource.map((item, key) => {
                    if (checkKey == item.key) {
                        return { ...item, editable: false }
                    }
                    else {
                        return { ...item };
                    }
                }
            );
            dispatch({ type: 'huskyTableM/updateState', payload: { dataSource: newDataSource , dataSourceBuffer:newDataSource,isEditLock: false, } });
        }
        else{
            dispatch({ type: 'huskyTableM/updateState', payload: { isNewItem: false,isEditLock: false } });
            onDelete(checkKey);
        }
    };


    /***
     * 当input改变时
     */
    const onCellChange = (index, key) => {
        if (!index && !key) {
            let dataSourceBuffer = [...huskyTableM.dataSource];
            dispatch({ type: 'huskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer} });
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
                
                /*===============新的buffer要等于老的buffer==============*/
                // var dataSourceBuffer = huskyTableM.dataSource.map(
                //                     (item,key) => {
                //         return {...item};
                //     }
                // )
                /*===============深拷贝，浅拷贝的bug==============*/

                var dataSourceBuffer = huskyTableM.dataSourceBuffer.map(
                    (item,key) => {
                        return {...item};
                    }
                )

                var indexInGolabel = index+((huskyTableM.paginationCurrent-1)*huskyTableM.paginationPageSize);
                // console.log('indexInGolabel',indexInGolabel);
                // console.log('dataSourceBuffer[indexInGolabel-1]',dataSourceBuffer[indexInGolabel]);

                dataSourceBuffer[indexInGolabel][key] = value;
                dispatch({ type: 'huskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer,} });
            };
        }
    }

    /**
     * 删除表格中的条目
     */
    const onDelete = (checkKey) => {        
        var dataSourceBuffer = huskyTableM.dataSourceBuffer.map(
            (item, key) => {
                return { ...item };
            }
        )
        for (let [index, elem] of dataSourceBuffer.entries()) {
            if (elem.key == checkKey) {
                dataSourceBuffer.splice(index, 1);
                //  break;
            }
        }
        dispatch({ type: 'huskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer, dataSource: dataSourceBuffer, isEditLock: false } });
    }

    
    /***
     * 增加表格事件
     */
    const handleAdd = () => {
        //判断当前是否锁住了，如果锁住提示请先保存
        if (!huskyTableM.isEditLock) {
            
            // 新增一个item,初始化全为空
            const newDataItem = {
                key: huskyTableM.dataSourceLength.toString(),
                name: '',
                age: '',
                address: ``,
                editable: true,
            };
            var newDataSource = huskyTableM.dataSource.map(
                (item, key) => {
                    return { ...item };
                }
            )

            newDataSource = [...huskyTableM.dataSource, newDataItem];

            /***
             * dataSourceBuffer(当前修改后的值（非实际值）更新
             * dataSource(当前tabal的dataSource）更新
             * dataSourceLength(当前tabal的dataSource长度）更新
             * isEditLock(是否在增加和修改，）更新true，锁住
             * isNewItem(是否是新增的值，如果是修改不能为空）更新为true
             * paginationCurrent(当前table的分页值）更新为最后一页
             */
            dispatch(
                {
                    type: 'huskyTableM/updateState',
                    payload: {
                        dataSourceBuffer: newDataSource,
                        dataSource: newDataSource,
                        dataSourceLength: huskyTableM.dataSourceLength + 1,
                        isEditLock: true,
                        isNewItem: true,
                        paginationCurrent: parseInt(huskyTableM.dataSourceLength / huskyTableM.paginationPageSize) + 1
                    }
                });
        }
        else {
            alert("请先保存");
        }
    }

    /***
     * 搜索表格事件，传入搜索的字段
     */




    const onSearchClick = (searchNum) => {


        if (!huskyTableM.isEditLock) {
            if (!searchNum && searchNum != ' ') {

            }

            /***
             * 新建一空的buffer数组
             */
            var newDataSource=[];
            
            //循环真实的数据
            for (let [index, elem] of huskyTableM.dataSource.entries()) {

                //将匹配的searchNum进行匹配
                var reg = new RegExp(searchNum);
                // 如果匹配。将匹配的放到新的数组
                if (reg.test(elem.key)) {
                    newDataSource.push(huskyTableM.dataSource[index]);
                }
            }

            dispatch({ type: 'huskyTableM/updateState', payload: { dataSourceBuffer: newDataSource,} });
        }
    }
    

    const onChangeTable=(pagination, filters, sorter)=>{
        dispatch({ type: 'huskyTableM/updateState', payload: { paginationCurrent: pagination.current,} })
    }
    return (
        <div className={styles["huskyTable"]}>
            <div className={styles["top"]}>
                <div className={styles["addBtn"]}><Button type="primary" icon="plus" onClick={handleAdd}></Button></div>
                <div className={styles["searchBox"]}><SearchBox onSearchClick={onSearchClick}/></div>
            </div>
            <Table bordered dataSource={huskyTableM.dataSourceBuffer} columns={newColumns}  onChange={onChangeTable} pagination={{current:huskyTableM.paginationCurrent,defaultPageSize:huskyTableM.paginationPageSize}}/>
        </div>
    );
}

HuskyTable.propTypes = {
};

export default connect(({huskyTableM}) => ({huskyTableM}))(HuskyTable);


  