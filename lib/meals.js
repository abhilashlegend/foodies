import sql from 'better-sqlite3';

const db = sql('meals.db');

export function getAllMeals() {
    const stmt = db.prepare('SELECT * FROM meals');
    return stmt.all();
}