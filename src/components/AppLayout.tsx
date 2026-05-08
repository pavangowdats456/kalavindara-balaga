import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("kb_splash_seen")) {
      sessionStorage.setItem("kb_splash_seen", "1");
      navigate("/splash", { replace: true });
      return;
    }
    // Route artists away from the customer home
    if (pathname === "/") {
      const role = localStorage.getItem("kb_role");
      if (role === "artist") {
        const hasProfile = !!localStorage.getItem("kb_artist_profile");
        navigate(hasProfile ? "/artist-home" : "/artist-app", { replace: true });
      }
    }
  }, [navigate, pathname]);

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default AppLayout;

