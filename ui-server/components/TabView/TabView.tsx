import React, { useState } from 'react';
import TabPanel from './TabPanel';

export interface ITab {
  id: string | number;
  name: string;
}

interface ITabData<T> {
  id: string | number;
  data: T;
}

interface TabViewProps<T> {
  data: ITabData<T>[];
  renderItem: (item: ITabData<T>) => React.ReactNode;
}

const TabView = <T extends { name: string }>({
  data,
  renderItem,
}: TabViewProps<T>) => {
  const tabs = data.map((item) => ({
    id: item.id,
    name: item.data.name,
  }));
  const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

  return (
    <div>
      <TabPanel
        tabs={tabs}
        activeTab={activeTab || tabs[0]}
        setActiveTab={setActiveTab}
      />

      {data.map((tabData, idx) => {
        return (
          (activeTab?.id || tabs[0].id) === tabData.id && (
            <React.Fragment key={idx}>{renderItem(tabData)}</React.Fragment>
          )
        );
      })}
    </div>
  );
};

export default TabView;
