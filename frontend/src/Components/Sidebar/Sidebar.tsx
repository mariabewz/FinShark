import { useNavigate } from "react-router-dom";
import SidebarItem from "../SidebarItem/SidebarItem";

type Props = {
  tabItems: {
    id: number;
    title: string;
    icon: string;
    content: string;
  }[];
  setActiveSideBarItem: (id: number) => void;
  activeSidebarItem: number;
};

const Sidebar = ({
  tabItems,
  setActiveSideBarItem,
  activeSidebarItem,
}: Props) => {
  const navigate = useNavigate();

  const getRoute = (title: string) => title.toLowerCase().replaceAll(" ", "-");

  return (
    <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
        <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
          <div className="md:flex-col md:min-w-full flex flex-col list-none">
            {tabItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                isActive={activeSidebarItem === item.id}
                onItemClicked={() => {
                  setActiveSideBarItem(item.id);
                  navigate(getRoute(item.title));
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
