import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

// Operator stuff
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

// Observable stuff
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/merge';

// constants that are used as pointers to random json-data
const BOOKS: string   = 'assets/data/books.json';
const AUTHORS: string = 'assets/data/authors.json';

@Injectable()
export class DataService {

	constructor(private http: Http) {
	}

	/**
	 * concat-operator
	 * With .concat(), the second (and third, and so on) operator cannot start until the previous completed.
	 * This means that the results are always delivered in order. Use this operator when order matters.
	 *
	 * @returns {Observable<any>}
	 */
	getConcatData(): Observable<any> {
		// First call. Simulate delay of 1 second
		const authors = this.http.get(AUTHORS)
			.delay(1000)
			.map(res => res.json());

		// Second call. Simulate delay of 2 seconds
		const books = this.http.get(BOOKS)
			.delay(2000)
			.map(res => res.json());

		// return the concatenated observable. It will always deliver first the results of the first call. No matter how long the delay.
		return Observable.concat(authors, books);
	}

	/** merge-operator
	 *
	 * The .merge() operator turns multiple observables into a single observable. The results are delivered
	 * to the subscriber as soon as one of the observables completes. Use this operator if order is not important.
	 *
	 * @returns {Observable<any>}
	 */
	getMergeData(): Observable<any> {
		// First call. Simulate delay of 3 seconds, so this observable will emit last.
		const authors = this.http.get(AUTHORS)
			.delay(3000)
			.map(res => res.json());

		// Second call. Simulate delay of 1 seconds, so this observable will emit first.
		const books = this.http.get(BOOKS)
			.delay(1000)
			.map(res => res.json());

		// return the merged observable.
		return Observable.merge(authors, books);
	}

	/** mergeMap-operator
	 *
	 * The .mergeMap() operator merges the value of an inner observable into an outer observable. You use it
	 * for example if you need to find values, based on the output of the first observable.
	 *
	 * Here we ask for authors, based on an authorId. When we find the author, we ask for books by that specific
	 * author. In this case we need the inner arraymethods like .find() and .filter() in order to retrieve the
	 * results from an http-blob of data (the authors and books are all delivered in one array. Not on an
	 * author-by-author base). Note: the .find() and .filter() are actually arraymethods. Not RxJS-methods.
	 *
	 *  - The .mergeMap() operator is an alias of the .flatMap() operator.
	 *  - If you need only one inner subscription to be active at a time, use .switchMap().
	 *  - If the order of emission an subscription of inner observables is important, use .concatMap().
	 *
	 * @param authorID
	 * @returns {Observable<any>}
	 */
	getMergeMapData(authorID: number = 0): Observable<any> {
		// first http-call, outer observable.
		return this.http.get(AUTHORS)
			.map(res => res.json())
			.map(authors => {
				// find the correct author, using the array .find() method
				return authors.find((author: any) => author.id === authorID)
			})
			.mergeMap((author: any) => {
				if (author) {
					// second http-call, inner observable
					return this.http.get(BOOKS)
						.map(books => books.json())
						.map(books => {
							// filter books, bases on authorname we found earlier.
							return books.filter((book: any) => book.author === author.name)
						})
				}else{
					// nothing found. Return empty array
					return Observable.of([]);
				}
			})
	}


	/** forkJoin-operator
	 * With .forkJoin(), you can make multiple (http) calls and return a combined
	 * response once all calls are completed. You can compose the return value as you wish.
	 *
	 * Operator forkJoin() acts as the $q.all() method for observables. It lets you
	 * execute two or more Observables in parallel.
	 *
	 * The results are passed as an array to the mapping function next in line.
	 *
	 * @returns {Observable<any>}
	 */
	getForkJoinData(): Observable<any> {
		return Observable.forkJoin(
			// first call
			this.http.get(AUTHORS)
				.map(res => res.json()),
			// second call
			this.http.get(BOOKS)
				.map(res => res.json()),
		).map((data: any[]) => {
			// data is now an array with 2 objects, b/c we did 2 http-calls.
			// First result, from the http-call to AUTHORS
			let author: any = data[0][0]; // Get just first author from file. We could do more sophisticated search/filter here.

			// Second result, from the http-call to BOOKS
			let books: any[] = data[1];

			// Compose result, in this case adding the books to the extracted author.
			author.books = books.filter(book => book.author === author.name);
			return author;
		})
	}


}