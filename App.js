import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import PageContent from "./layouts/PageContent";
import SideBar from "./layouts/SideBar";

function App({children}) {
  return (
    <div className="wrapper vertical-layout navbar-floating footer-static vertical-menu-modern menu-expanded">
      <SideBar />
      <Header />
      <PageContent children={children} />
      <Footer />
    </div>
  );
}

export default App;
