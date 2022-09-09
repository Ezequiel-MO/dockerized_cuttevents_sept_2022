import {
  Footer,
  MainSection,
  Sidebar,
  SidebarModals,
  SidebarSmall,
} from "../components";

const MainPage = () => {
  return (
    <div className="flex flex-col">
      <SidebarSmall />
      <div className="grid grid-cols-12 m-8">
        <Sidebar />
        <MainSection />
        <SidebarModals />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
