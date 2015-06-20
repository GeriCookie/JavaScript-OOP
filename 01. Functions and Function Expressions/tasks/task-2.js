/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(from, to) {
	var n,
		divisor,
		maxDivisor,
		isPrime,
		primes = [];
	if (typeof (from) === 'undefined' || typeof (to) === 'undefined') {
		throw new Error('Invalid range');
	}
	from = +from,
		to = +to;
	for (n = Math.max(from, 2); n <= to; n += 1) {
		isPrime = true;
		maxDivisor = Math.sqrt(n);
		for (divisor = 2; divisor <= maxDivisor; divisor += 1) {
			if (!(n % divisor)) {
				isPrime = false;
				break;
			}
		}
		if (isPrime) {
			primes.push(n);
		}
	}
	return primes;
}

module.exports = findPrimes;