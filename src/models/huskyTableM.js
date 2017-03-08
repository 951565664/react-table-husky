
export default {

  namespace: 'huskyTableM',
  state: {


    // 查询的键值
    searchValue:'',
    
    columns: [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: false,
        },{
            title: 'age',
            dataIndex: 'age',
            editable: false,
        },{
            title: 'address',
            dataIndex: 'address',
            editable: false,
        },{
            title: 'operation',
            dataIndex: 'operation',
            editable: false,
        }
    ],

    //table数据数组
    dataSource : [{
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
          editable:false,
      }, {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '2',
          name: 'Edward King 2',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '3',
          name: 'Edward King 3',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      },{
          key: '4',
          name: 'Edward King 4',
          age: '32',
          address: 'London, Park Lane no. 0',
          editable:false,
      }, {
          key: '5',
          name: 'Edward King 5',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '6',
          name: 'Edward King 6',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '7',
          name: 'Edward King 7',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '8',
          name: 'Edward King 8',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '9',
          name: 'Edward King 9',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '10',
          name: 'Edward King 10',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }
    ],

    // table数据数组的缓存(保存修改的，还未确认的值)
    dataSourceBuffer:[{
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
          editable:false,
      }, {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '2',
          name: 'Edward King 2',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '3',
          name: 'Edward King 3',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      },{
          key: '4',
          name: 'Edward King 4',
          age: '32',
          address: 'London, Park Lane no. 0',
          editable:false,
      },  {
          key: '5',
          name: 'Edward King 5',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '6',
          name: 'Edward King 6',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '7',
          name: 'Edward King 7',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '8',
          name: 'Edward King 8',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '9',
          name: 'Edward King 9',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }, {
          key: '10',
          name: 'Edward King 10',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable:false,
      }
    ],
    // table当前分页值
    paginationCurrent:1,
    // 当前分页的条目数量
    paginationPageSize:4,

    // table条目的总数
    dataSourceLength:11,



    isEditLock:false,
    isNewItem:false,

    

    // editableCellValue的缓存
    // editableCellValue:'',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    
  },

}
