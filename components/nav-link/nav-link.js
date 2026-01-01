'use client';
import classes from './nav-link.module.css';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
    const path = usePathname();

    return (
        <a href={href} className={path === href ? `${classes.link} ${classes.active}` : classes.link}>
            {children}
        </a>
    );
}