
/**
 * @description function to convert camelCase string co Usual String
 * in example camelCase will become Camel Case.
 * @param {*camelCase string} str 
 */
var toUsualText = (str) => {
	var newStr = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
	var result = newStr.charAt(0).toUpperCase() + newStr.substr(1);
	return result;
}

export default toUsualText;