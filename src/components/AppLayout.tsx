import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("kb_splash_seen")) {
      sessionStorage.setItem("kb_splash_seen", "1");
      navigate("/splash", { replace: true });
    }
  }, [navigate]);
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
