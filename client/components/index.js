/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllTamagotchis} from './AllTamagotchis'
export {default as SingleTamagotchi} from './SingleTamagotchi'
export {default as CartOrder} from './CartOrder'
export {default as CheckoutDraft} from './CheckoutDraft'
export {default as CheckoutComplete} from './CheckoutComplete'
