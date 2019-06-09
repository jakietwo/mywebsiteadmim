/**
 * author:jakietwo
 * time: 2019/6/9
 */

/**
 * 此函数可以实现对象以及对象数组、数组的深拷贝， 但无法处理循环引用以及symbol
 * @param sourceObj
 */
function deepClone(sourceObj) {
  if (!isObject(sourceObj)) return sourceObj;
  let target = Array.isArray(sourceObj) ? [] : {};
  for (let key in sourceObj) {
    if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
      if (isObject(sourceObj[key])) {
        target[key] = deepClone(sourceObj[key]);
      } else {
        target[key] = sourceObj[key];
      }
    }
  }
  return target;
}

function isObject(obj) {
  return typeof obj === "object" && obj != null;
}

export { deepClone };
