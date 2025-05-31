import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '22f-bscs-106', 
  database: 'uniswap',
});
