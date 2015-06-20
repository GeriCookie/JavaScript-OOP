/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(arr) {
	if (arr.length === 0) {
		return null;
	}
	return arr.reduce(function (s, n) {
		if (isNaN(n)) {
			throw new Error('Element must be a number');
		}
		n = +n;
		return s + +n;
	}, 0);
}

module.exports = sum;