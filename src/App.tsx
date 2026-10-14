import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { LanguageProvider, useLang } from "./i18n/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

function NotFound() {
  const { t } = useLang();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="text-8xl font-black text-navy-900/10">404</div>
      <h1 className="mt-2 text-2xl font-extrabold text-navy-900">{t.common.notFound}</h1>
      <Link to="/" className="mt-6 rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white hover:bg-navy-800">
        {t.common.backHome}
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
}
