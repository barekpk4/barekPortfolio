import { Routes } from '@angular/router';
import { Home } from '../component/home/home';
import { About } from '../component/about/about';
import { Contact } from '../component/contact/contact';
import { Education } from '../component/education/education';
import { Experience } from '../component/experience/experience';
import { Footer } from '../component/footer/footer';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'myhome',
        pathMatch: 'full'
    },
    {
        path: 'myabout',
        component: About
    },
    {
        path: 'mycontact',
        component: Contact
    },
    {
        path: 'myfooter',
        component: Footer
    },
    {
        path: "myeducation",
        component: Education
    },
    {
        path: 'myhome',
        component: Home
    },
    {
        path: 'myexperience',
        component: Experience
    }
];
