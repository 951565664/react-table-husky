import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './searchBox.less';
import { Input, Icon,Button,Tooltip } from 'antd';




function SearchBox({dispatch,location,huskyTableM,onSearchClick}) {

    /***
     * 清空search的键值
     */
    const emitEmpty = () => {
        document.getElementById('userNameInput').focus();
        dispatch({type: 'huskyTableM/updateState',payload: {searchValue: '' ,} })
    }
            
    /**
     * @description input的onChange回调
     * @name onChangeSearchValue
     * @param
     * @returns
     */     
    const onChangeSearchValue = (e) => {
        let value  = e.target.value;
        formatValue(value) && dispatch({type: 'huskyTableM/updateState',payload: {searchValue: value ,}});
    }


    const formatValue = (value) => {
       var reg=/^[0-9]*$/;
       return reg.test(value);
    }


    const suffix = huskyTableM.searchValue ? <Icon type="close-circle" onClick={emitEmpty}/> : null;
    return (
        <div className={styles.searchBox}>
            <div className={styles['earchBox-input']}>
            <Input
                placeholder="任意匹配key"
                // prefix={<Icon type="user" />}
                suffix={suffix}
                value={huskyTableM.searchValue}
                onChange={onChangeSearchValue}
                id="userNameInput"
                /></div>
            <div className={styles['earchBox-btn']}><Button type="primary" icon="search" onClick={()=>onSearchClick(huskyTableM.searchValue)}></Button></div>
        </div>
    );
}

SearchBox.propTypes = {
};

export default connect( ({huskyTableM}) => ({huskyTableM}) )(SearchBox);





// class NumericInput extends React.Component {
        
    
//   onChange = (e) => {
//     const { value } = e.target;
//     const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
//     if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
//       this.props.onChange(value);
//     }
//   }
//   // '.' at the end or only '-' in the input box.
//   onBlur = () => {
//     const { value, onBlur, onChange } = this.props;
//     if (value.charAt(value.length - 1) === '.' || value === '-') {
//       onChange({ value: value.slice(0, -1) });
//     }
//     if (onBlur) {
//       onBlur();
//     }
//   }
//   render() {
//     const { value } = this.props;
//     const title = value ? (
//       <span className="numeric-input-title">
//         {value !== '-' ? formatNumber(value) : '-'}
//       </span>
//     ) : 'Input a number';
//     return (
//       <Tooltip
//         trigger={['focus']}
//         title={title}
//         placement="topLeft"
//         overlayClassName="numeric-input"
//       >
//         <Input
//           {...this.props}
//           onChange={this.onChange}
//           onBlur={this.onBlur}
//           placeholder="Input a number"
//           maxLength="25"
//         />
//       </Tooltip>
//     );
//   }
// }

// class NumericInputDemo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: '' };
//   }
//   onChange = (value) => {
//     this.setState({ value });
//   }
//   render() {
//     return <NumericInput style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />;
//   }
// }

// ReactDOM.render(<NumericInputDemo />, mountNode);
