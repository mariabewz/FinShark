import React from "react";

interface Props {
  icon: string;
  title: string;
  onItemClicked: () => void;
  isActive: boolean;
}

const SidebarItem = ({ icon, title, onItemClicked, isActive }: Props) => {
  return (
    <button
      type="button"
      className={`md:min-w-full text-left text-xs uppercase font-bold block pt-1 pb-4 no-underline ${
        isActive ? "text-lightBlue-500" : "text-blueGray-500"
      }`}
      onClick={onItemClicked}
    >
      <i className={`${icon} mr-2`}></i>
      {title}
    </button>
  );
};

export default SidebarItem;
