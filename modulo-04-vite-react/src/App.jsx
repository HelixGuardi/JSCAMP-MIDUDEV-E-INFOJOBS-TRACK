import { useNetworkStatus } from "./hooks/useNetworkStatus.jsx";

import { Route } from "./components/Route.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { Contact } from "./pages/Contact.jsx";
import { NotFoundPage } from "./pages/404.jsx";
import { NetworkToastCard } from "./components/NetworkToastCard.jsx";

function App() {
  const { isOnline, isShown, isMounted } = useNetworkStatus();

  return (
    <>
      {isMounted && <NetworkToastCard isOnline={isOnline} isShown={isShown} />}

      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/notFoundPage" component={NotFoundPage} />
      <Footer />
    </>
  );
}

export default App;

/* function App() {

    cosnt { currentPath } = useRouter()

    let page = <NotFoundPage />

    if (currentPath === "/"){
      page = <HomePage />
    } else if (currentPath === "/search"){
      page = <SearchPage /> 
    }
 

  return (
    <>
      <Header />
      { page }
      <Footer />
    </>
  );
} */
