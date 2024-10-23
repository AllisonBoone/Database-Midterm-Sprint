/* Gets movie title, rental date and return date of a customer with a specific email */
SELECT m.title, r.rental_date, r.return_date
FROM Rentals r 
JOIN Customers c ON r.customer_id = c.customer_id
JOIN Movies m ON r.movies_id = m.movie_id
WHERE c.email = $1;

/* Gets the first name, last name, rental date and return date of every customer who rented a specific movie title */
SELECT c.first_name, c.last_name, r.rental_date, r.return_date
FROM Rentals r 
JOIN Customers c ON r.customer_id = c.customer_id
JOIN Movies m ON r.movie_id = m.movie_id
WHERE m.title = $1;

/* Gets full rental history of a specific movie in order of when it was rented */
SELECT c.first_name, c.last_name, r.rental_date, r.return_date
FROM Rentals r
JOIN Movies m ON r.movie_id = m.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE m.title = $1
ORDER BY r.rental_date;

/* Gets  first name, last name, rental date, return date, movie title of a movie with a specific director in order of when it was rented */
SELECT c.first_name, c.last_name, r.rental_date, m.title
FROM Rentals r
JOIN Movies m ON r.movie_id = m.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE m.director = $1
ORDER BY r.rental_date;

/* Gets movie title, first name, last name, rental date of all movies with return date of NULL in order of when it was rented */
SELECT m.title, c.first_name, c.last_name, r.rental_date
FROM Rentals r
JOIN Movies m ON r.movie_id = m.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date;
