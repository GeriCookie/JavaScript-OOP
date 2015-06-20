/* Task Description */
/* 
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */
function solve() {
	var library = (function () {
		var books = [];
		var categories = {},
			lastCategoryID = 0;

		function listBooks(options) {
			if (typeof (options) === 'undefined') {
				return books.sort(function (a, b) {
					return a.ID - b.ID;
				});
			}
			return books.filter(function (book) {
					return (options.category ? (book.category === options.category) : true) && (options.author ? (book.author === options.author) : true);
				})
				.sort(function (a, b) {
					return a.ID - b.ID;
				});
		}

		function addBook(book) {
			if (typeof (book.title) === 'undefined' || typeof (book.category) === 'undefined' || typeof (book.author) === 'undefined' ||
				typeof (book.isbn) === 'undefined') {
				throw new Error('Title, autor, category or ISBN is missing');
			}
			if (book.title.length < 2 || book.title.length > 100) {
				throw new Error('Title must be between 2 and 100 symbols');
			}
			if (book.isbn.length !== 10 && book.isbn.length !== 13) {
				throw new Error('ISBN must be 10 or 13 digits');
			}
			if (books.some(function (b) {
					return b.title === book.title;
				})) {
				throw new Error('Book with same title already exists');
			}
			if (books.some(function (b) {
					return b.isbn === book.isbn;
				})) {
				throw new Error('Book with same ISBN already exists');
			}
			book.ID = books.length + 1;
			if (!categories.hasOwnProperty(book.category)) {
				categories[book.category] = lastCategoryID += 1;
			}
			books.push(book);
			return book;
		}

		function listCategories() {
			return Object.keys(categories);
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());
	return library;
}
module.exports = solve;