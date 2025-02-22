import { CartProvider } from "@/context/CartContext"

import "./globals.css"

export const metadata = {
  title: "انگلیسی پلاس",
  description: "English Plus",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
