const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', //This _should_ be your username, as it's the default one Postgres uses
  host: 'localhost',
  database: 'Movie_Rental', //This should be changed to reflect your actual database
  password: '44Aust1n##', //This should be changed to reflect the password you used when setting up Postgres
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  // TODO: Add code to create Movies, Customers, and Rentals tables
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Movies (
        movie_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        year_released INTEGER NOT NULL,
        genre TEXT NOT NULL,
        director TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS Customers (
        customer_id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS Rentals (
        rental_id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES Customers(customer_id) ON DELETE CASCADE,
        movie_id INTEGER NOT NULL REFERENCES Movies(movie_id) ON DELETE CASCADE,
        rental_date DATE NOT NULL,
        return_date DATE
      );
    `);
    console.log('Table was created successfully!');
  } catch (error) {
    console.error('Error creating the tables: ', error);
  }
}

/**
 * Inserts a new movie into the Movies table.
 *
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  // TODO: Add code to insert a new movie into the Movies table
  try {
    await pool.query(
      `
      INSERT INTO Movies (title, year_released, genre, director)
      VALUES ($1, $2, $3, $4)
    `,
      [title, year, genre, director]
    );
    console.log(`Movie "${title}" inserted successfully.`);
  } catch (error) {
    console.error('Error inserting movie: ', error);
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  // TODO: Add code to retrieve and print all movies from the Movies table
  try {
    const result = await pool.query('SELECT * FROM Movies');
    if (result.rows.length === 0) {
      console.log('No movies were found.');
    } else {
      console.table(result.rows);
    }
  } catch (error) {
    console.error('Error retrieving movies: ', error);
  }
}

/**
 * Updates a customer's email address.
 *
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  // TODO: Add code to update a customer's email address
  try {
    const res = await pool.query(
      `
      UPDATE Customers
      SET email = $1
      WHERE customer_id = $2
    `,
      [newEmail, customerId]
    );

    if (res.rowCount === 0) {
      console.log('No customer with that ID.');
    } else {
      console.log(`Customer ${customerId}'s email updated to ${newEmail}.`);
    }
  } catch (error) {
    console.error('Error updating customer email: ', error);
  }
}

/**
 * Removes a customer from the database along with their rental history.
 *
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  // TODO: Add code to remove a customer and their rental history
  try {
    const res = await pool.query(
      'DELETE FROM Customers WHERE customer_id = $1',
      [customerId]
    );
    if (res.rowCount === 0) {
      console.log('No customer with that ID.');
    } else {
      console.log(
        `Customer ${customerId} and their rental history were removed.`
      );
    }
  } catch (error) {
    console.error('Error removing customer: ', error);
  }
}

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert <title> <year> <genre> <director> - Insert a movie');
  console.log('  show - Show all movies');
  console.log("  update <customer_id> <new_email> - Update a customer's email");
  console.log('  remove <customer_id> - Remove a customer from the database');
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case 'insert':
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case 'show':
      await displayMovies();
      break;
    case 'update':
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case 'remove':
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
}

runCLI();
