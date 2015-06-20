/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {
		function Person(firstname, lastname, age) {
			//here `this` means concrete object instance
			this.init.apply(this, arguments);
		}

		function isChar(ch) {
			return ch.length === 1 &&
				(('a' <= ch && ch <= 'z') ||
					('A' <= ch && ch <= 'Z'))
		}

		function validateName(value) {
			if (typeof (value) !== 'string' ||
				value.length < 3 ||
				value.length > 20) {
				throw new Error('Invalid name')
			}
			if (!(value.split('')
					.every(isChar))) {
				throw new Error('Invalid characters in name');
			}
		}

		Person.prototype = {
			init: function (firstname, lastname, age) {
				this.firstname = firstname;
				this.lastname = lastname;
				this.age = age;
			},
			get firstname() {
				return this._firstname;
			},
			set firstname(value) {
				validateName(value);
				this._firstname = value;
				return this;
			},
			introduce: function () {
				return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
			}
		};

		Object.defineProperty(Person.prototype, 'lastname', {
			get: function () {
				return this._lastname;
			},
			set: function (value) {
				validateName(value);
				this._lastname = value
				return this;
			},
			enumerable: true
		});

		Object.defineProperty(Person.prototype, 'age', {
			get: function () {
				return this._age;
			},
			set: function (value) {
				value = +value;
				if (isNaN(value) ||
					value < 0 ||
					value > 150) {
					throw new Error(value + ' is invalid age');
				}
				this._age = value;
				return this;
			}
		});

		Object.defineProperty(Person.prototype, 'fullname', {
			get: function () {
				return this.firstname + ' ' + this.lastname;
			},
			set: function (value) {
				value = value.split(' ');
				this.firstname = value[0];
				this.lastname = value[1];
				return this;
			}
		});

		return Person;
	}());
	return Person;
}
module.exports = solve;