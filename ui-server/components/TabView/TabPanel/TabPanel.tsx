import React, { FC, useCallback, useState } from 'react';
import { ITab } from '../TabView';
import Tab from './Tab';

interface TabPanelProps {
  tabs: ITab[];
  activeTab: ITab;
  setActiveTab: (tab: ITab) => void;
}

const TabPanel: FC<TabPanelProps> = ({ tabs, activeTab, setActiveTab }) => {
  const handleTabClick = useCallback(
    (id: string | number) => {
      const selectedTab = tabs.find((tab) => tab.id === id);
      setActiveTab(selectedTab || tabs[0]);
    },
    [setActiveTab, tabs]
  );

  return (
    <div>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          {...tab}
          isActive={activeTab?.id === tab.id}
          onPress={handleTabClick}
        />
      ))}
    </div>
  );
};

export default TabPanel;
