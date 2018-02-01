module.exports = {
  SchemaValidation: function(schema, data) {
    return new Promise(function (resolve){
      try {
        let dataArr = Object.entries(data);
        let getFailedDataType = [];

        for(var i=0; i<dataArr.length; i++) {
          if(typeof schema[dataArr[i][0]] === 'undefined') {
            getFailedDataType.push({
              status: 'failed',
              reason: 'Field '+ dataArr[i][0] + ' does not exist in the schema. Please be informed that the schema is case sensitive. Please add the field or insure that field is in its proper case.'
            });
          } else {
            if(typeof(dataArr[i][1]) !== schema[dataArr[i][0]].type) {
              getFailedDataType.push({
                status: 'failed',
                reason: 'The data type of the field -->'+dataArr[i][0]+'<-- ('+typeof(dataArr[i][1])+') does not match to the data type specified in your schema ('+schema[dataArr[i][0]].type+').'
              });
            }
          }
        }

        if(getFailedDataType.length > 0) {
          resolve({
            success: false,
            reasons: getFailedDataType
          });
        } else {
          resolve({
            success: true,
            reasons: []
          });
        }
      } catch(e) {
        resolve({
          success: false,
          reasons: e
        });
      }
    });
  }
}
