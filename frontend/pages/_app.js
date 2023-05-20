// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

import "@fontsource/jost/400.css";
import "@fontsource/jost/600.css";
import "@fontsource/jost/300.css";

import { useUserData } from "lib/hooks";
import { UserContext } from "lib/context";

import Script from "next/script";

import "@styles/globals.css";

const colors = {
    brand: {
        50: "#E7EDFE",
        100: "#BBCCFB",
        200: "#90ACF9",
        300: "#648BF7",
        400: "#396AF4",
        500: "#0D4AF2",
        600: "#0A3BC2",
        700: "#082C91",
        800: "#051E61",
        900: "#030F30",
    },
    glassWhite: "#ffffffaa",
    glassBlack: "#000000aa",
};

const fonts = {
    heading: "Jost, system-ui, sans-serif",
};

const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

const theme = extendTheme({ colors, fonts, config });

function MyApp({ Component, pageProps }) {
    const userData = useUserData();

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-10963449035" />
            <Script>
                {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-10963449035');`}
            </Script>
            <UserContext.Provider value={userData}>
                <ChakraProvider theme={theme}>
                    {getLayout(<Component {...pageProps} />)}
                </ChakraProvider>
            </UserContext.Provider>
        </>
    );
}

export default MyApp;
