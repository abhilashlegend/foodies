import classes from './page.module.css'
import Image from 'next/image';
import { getMeal } from '../../../lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const meal = getMeal(params.slug);
    if(!meal) {
        return {
            title: 'Meal Not Found',
            description: 'The meal you are looking for does not exist.',
        };
    }
    return {
        title: `NextLevel Food - ${meal.title}`,
        description: meal.summary,
    };
}

export default function slug({ params }) {
    const meal = getMeal(params.slug);
    if(!meal) {
        notFound();
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br/>');
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                     <h1>
                        {meal.title}
                    </h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <div className={classes.summary}>{meal.summary}</div>
                </div>
            </header>
            <main className={classes.main}>
              <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions, }}></p>
            </main>
        </>
        
    )
}