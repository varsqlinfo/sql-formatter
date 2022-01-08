// Only removes spaces, not newlines
export const trimSpacesEnd = (str) => str.replace(/[ \t]+$/u, '');

// Last element from array
export const last = (arr) => arr[arr.length - 1];

// True array is empty, or it's not an array at all
export const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

// Escapes regex special chars
export const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

// Sorts strings by length, so that longer ones are first
// Also sorts alphabetically after sorting by length.
export const sortByLengthDesc = (strings) =>
  strings.sort((a, b) => {
    return b.length - a.length || a.localeCompare(b);
  });

export const isArray = (obj) => {
  if(Array.isArray){
		return Array.isArray(obj)
	}else{
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
}

export const isFunction = (obj) => typeof obj==='function';

export const isObject= (obj) => {
  if(isArray(obj)){
    return false;
  }else if(isFunction(obj)){
    return false;
  }

  return typeof obj==='object';
}

export const isDate = (obj) => {
	if (obj instanceof Date) return true;

	if(isObject(obj)){
		return typeof obj.toDateString === 'function'
		    && typeof obj.getDate === 'function'
		    && typeof obj.setDate === 'function';
	}

	return  false;
}

export const objectMerge =(...arg) => {
  var reval = arg[0];
  if (typeof reval !== 'object' || reval === null) {	return reval;}
  var i = 1;
  if(Object.keys(reval).length > 0){
    i = 0;
    reval = isArray(reval) ? [] :{};
  }
  var argLen = arg.length;
  for (; i < argLen; i++) {
    cloneDeep(reval, arg[i]);
  }
  return reval;
}

function cloneDeep (dst, src){
	if(isObject(src)){
		return cloneObjectDeep(dst, src);
	}else if(isArray(src)){
		return cloneArrayDeep(dst, src);
	}else{
		if (isDate(src)){
			return new src.constructor(src);
		}else{
			return src;
		}
	}
}

function cloneObjectDeep(dst, src) {
	if (typeof src === 'function') {
		return src;
	}

	for (let key in src) {

		if(!src.hasOwnProperty(key)) {continue;}

		var val = src[key];

		if (val=== undefined) {continue;}

		if ( typeof val !== 'object' || val=== null) {
			dst[key]  = val;
		} else if (typeof dst[key] !== 'object' || dst[key] === null) {
			dst[key] = cloneDeep(isArray(val) ? [] : {}, val);
		} else {
			cloneDeep(dst[key] , val);
		}
	}
	return dst;
}

function cloneArrayDeep(dst, src) {
	var isObj = isObject(dst);

	for (var i = 0; i < src.length; i++) {
		var val = src[i];
		var newVal;

		if(val == null){
			newVal = val;
		}else{
			newVal= cloneDeep(isArray(val) ? [] : {}, val);
		}

		if(isObj){
			dst[i] = newVal;
		}else{
			var addFlag =true; 
      for(var j = 0,l = dst.length; j<l; j++){
          if(dst[j] == newVal){
            addFlag = false; 
            break; 
          }
      }
      if(addFlag){
        dst.push(newVal);
      }
		}
	}
	return dst;
}