import classes from './page.module.css'
import Image from 'next/image';
import { getMeal } from '../../../lib/meals';

export default function slug({ params }) {
    const meal = getMeal(params.slug);
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
                        by <a href={`mailto:${meal.creatorEmail}`}>{meal.creatorName}</a>
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