import '@/styles/globals.css'

import { Architects_Daughter } from '@next/font/google'

const architectsDaughter = Architects_Daughter({ 
  subsets: ['latin'],
  weight: "400",
  variable: "--font-architectsDaughter",

})


export default function App({ Component, pageProps }) {
  return(
  
  <main className={`${architectsDaughter.variable}`}>
    <Component {...pageProps} />
  </main>
  
  )
  
 
}
