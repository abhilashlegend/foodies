import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

export async function getAllMeals() {
    await new Promise(resolve => setTimeout(resolve, 5000));   
    const stmt = db.prepare('SELECT * FROM meals');
    return stmt.all();
  
}

export function getMeal(slug) {
    const stmt = db.prepare('SELECT * FROM meals WHERE slug = ?');
    return stmt.get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    // Create the uploads directory if it doesn't exist (outside public folder)
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bufferedImage = await meal.image.arrayBuffer();
    
    // Write the file synchronously to ensure it's saved before continuing
    fs.writeFileSync(`${uploadDir}/${fileName}`, Buffer.from(bufferedImage));

    meal.image = `/api/images/${fileName}`;

    db.prepare(`
            INSERT INTO meals
            (title, summary, instructions, image, slug, creator, creator_email)
            VALUES (
                @title,
                @summary,
                @instructions,
                @image,
                @slug,
                @creator,
                @creator_email
            )
        `).run(meal);
}

