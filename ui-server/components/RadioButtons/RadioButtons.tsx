import React, { FC } from 'react';

interface RadioItem {
  id: string;
  name: string;
}

interface RadioButtonsProps {
  title: string;
  items: RadioItem[];
  onSelect: (itemName: string) => void;
}

const RadioButtons: FC<RadioButtonsProps> = ({ title, items, onSelect }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>{title}</h3>
      {items.map((item) => (
        <p key={item.id}>
          <input
            type="radio"
            id={item.id}
            name="radio"
            onChange={() => onSelect(item.name)}
          />
          <label htmlFor={item.id}>{item.name}</label>
        </p>
      ))}
    </div>
  );
};

export default RadioButtons;
