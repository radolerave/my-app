import { mainPage } from './components/pages/main-page.js'
import { myAccount } from './components/pages/my-account.js'
import { signInOrSignUp } from './components/pages/sign-in-or-sign-up.js'
import { signIn } from './components/pages/sign-in.js'
import { signUp } from './components/pages/sign-up.js'
import { sellerDetails } from './components/pages/seller-details.js'
import { sellerMediaManagement } from './components/pages/seller-media-management.js'
import { mediaPublication } from './components/pages/media-publication.js'

let components = {}

components.mainPage = mainPage
components.myAccount = myAccount
components.signInOrSignUp = signInOrSignUp
components.signIn = signIn
components.signUp = signUp
components.sellerDetails = sellerDetails
components.sellerMediaManagement = sellerMediaManagement
components.mediaPublication = mediaPublication

export { components }