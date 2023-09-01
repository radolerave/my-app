import { mainPage } from './components/main-page.js'
import { myAccount } from './components/my-account.js'
import { signInOrSignUp } from './components/signInOrSignUp.js'
import { signIn } from './components/signIn.js'
import { signUp } from './components/signUp.js'

let components = {}

components.mainPage = mainPage
components.myAccount = myAccount
components.signInOrSignUp = signInOrSignUp
components.signIn = signIn
components.signUp = signUp

export { components }