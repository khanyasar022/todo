import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Import global styles
import { TRPCProvider } from '../utils/TRPCProvider';

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // The TRPCProvider needs to be defined and imported correctly.
    // It wraps the application to provide tRPC context and React Query client.
    <TRPCProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div className={`${inter.className} bg-background text-foreground min-h-screen`}>
        <Component {...pageProps} />
      </div>
    </TRPCProvider>
  );
}

export default MyApp; 