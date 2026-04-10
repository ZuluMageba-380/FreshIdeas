import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import ScrollToTop from "./ScrollToTop";
import { useState, useEffect } from "react";

export default function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}