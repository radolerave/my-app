import { mainPage } from './components/pages/main-page.js'
// import { myAccount } from './components/pages/my-account.js'
import { signInOrSignUp } from './components/pages/sign-in-or-sign-up.js'
import { signIn } from './components/pages/sign-in.js'
import { signUp } from './components/pages/sign-up.js'
import { sellerDetails } from './components/pages/seller-details.js'
import { mediasOrPublicationsChoice } from './components/pages/medias-or-publications-choice.js'
import { sellerMediasManagement } from './components/pages/seller-medias-management.js'
import { sellerPublicationsManagement } from './components/pages/seller-publications-management.js'
import { mediaPublication } from './components/pages/media-publication.js'
import { sellerSettings } from './components/pages/seller-settings.js'
import { sellerPreferences } from './components/pages/seller-preferences.js'
import { sellerSearch } from './components/pages/seller-search.js'
import { buyFsTokens } from './components/pages/buy-fs-tokens.js'

let components = {}

components.mainPage = mainPage
// components.myAccount = myAccount
components.signInOrSignUp = signInOrSignUp
components.signIn = signIn
components.signUp = signUp
components.sellerDetails = sellerDetails
components.mediasOrPublicationsChoice = mediasOrPublicationsChoice
components.sellerMediasManagement = sellerMediasManagement
components.sellerPublicationsManagement = sellerPublicationsManagement
components.mediaPublication = mediaPublication
components.sellerSettings = sellerSettings
components.sellerPreferences = sellerPreferences
components.sellerSearch = sellerSearch
components.buyFsTokens = buyFsTokens

export { components }