
export function filter(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      // noinspection EqualityComparisonWithCoercionJS
      if (arr[i].value == val) {
        return arr[i].label;
      }
    }
    return val;
}

export function DateFormat(val){
    var date=new Date(val);
    return ''
}

export function sex() {
    return [{
      label: '男',
      value: '1'
    }, {
      label: '女',
      value: '2'
    }]
  }
  