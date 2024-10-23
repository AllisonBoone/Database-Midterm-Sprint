INSERT INTO Movies (title, year_released, genre, director)
VALUES
('Jurassic Park', 1993, 'Adventure', 'Steven Spielberg'),
('Titanic', 1997, 'Romance', 'James Cameron'),
('The Dark Knight', 2008, 'Action', 'Christopher Nolan'),
('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis'),
('Spirited Away', 2001, 'Fantasy', 'Hayao Miyazaki');

INSERT INTO Customers(first_name, last_name, email, phone)
VALUES
('Alice', 'Miller', 'alice.miller@example.com', '678-901-2345'),
('David', 'Wilson', 'david.wilson@example.com', '789-012-3456'),
('Laura', 'Garcia', 'laura.garcia@example.com', '890-123-4567'),
('James', 'Martinez', 'james.martinez@example.com', '901-234-5678'),
('Sophia', 'Anderson', 'sophia.anderson@example.com', '012-345-6789');

INSERT INTO Rentals (customer_id, movie_id, rental_date, return_date)
VALUES
  (1, 1, '2024-01-01', '2024-01-08'),
  (1, 2, '2024-01-02', '2024-01-09'),
  (2, 3, '2024-01-03', '2024-01-10'),
  (2, 4, '2024-01-04', '2024-01-11'),
  (3, 5, '2024-01-05', NULL),
  (3, 1, '2024-01-06', NULL),
  (4, 2, '2024-01-07', '2024-01-14'),
  (4, 3, '2024-01-08', '2024-01-15'),
  (5, 4, '2024-01-09', '2024-01-16'),
  (5, 5, '2024-01-10', '2024-01-17');



