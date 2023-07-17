// import "@fontsource/montserrat";
// import "@fontsource/montserrat/400.css";
// import "@fontsource/montserrat/400-italic.css";
// import "@fontsource/titillium-web";
// import "@fontsource/titillium-web/400.css";
// import "@fontsource/titillium-web/400-italic.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.scss'
import {Provider} from 'react-redux'
// import type { AppProps } from 'next/app'
import store from '../store'
import Head from "next/head";

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                        <link
                            href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&family=Montserrat:wght@400;600;700&family=Titillium+Web&display=swap"
                            rel="stylesheet"/>


            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>

    )
}
