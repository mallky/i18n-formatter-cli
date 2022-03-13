import React, { FC, useCallback } from 'react';

interface TabProps {
  id: string | number;
  name: string;
  isActive?: boolean;
  onPress?: (id: string | number) => void;
}

const Tab: FC<TabProps> = ({ id, name, isActive, onPress }) => {
  const handleClick = useCallback(() => {
    onPress && onPress(id);
  }, [id, onPress]);

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isActive ? 'red' : 'white',
        borderWidth: 1,
        borderColor: 'black',
      }}
    >
      {name}
    </button>
  );
};

export default Tab;
