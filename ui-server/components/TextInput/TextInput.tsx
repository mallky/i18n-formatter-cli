import React, { FunctionComponent, useCallback, useRef, useState } from 'react';

interface TextInputProps {
  text: string;
  setChangedText: (text: string) => void;

  onRemove?: () => void;
  className?: string;
}

enum EType {
  Div = 'div',
  Input = 'input',
}

const TextInput: FunctionComponent<TextInputProps> = ({
  text,
  setChangedText,
  onRemove,
  className,
}) => {
  const [currentText, setCurrentText] = useState(text);
  const [type, toggleType] = useState<EType>(EType.Div);
  const input = useRef<HTMLInputElement>(null);

  const handleToggleType = () => {
    toggleType((state) => (state === EType.Div ? EType.Input : EType.Div));
    setTimeout(() => input.current?.focus(), 300);
  };

  const handleBlur = useCallback(() => {
    toggleType(EType.Div);
    setChangedText(currentText);
  }, [setChangedText, currentText]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        toggleType(EType.Div);
        setChangedText(currentText);
      }
    },
    [setChangedText, currentText]
  );

  const renderWrapper = (component: React.ReactNode) => (
    <>
      <span className={`text-input ${className}`} onClick={handleToggleType}>
        {component}
      </span>
      {!!onRemove && <button onClick={onRemove}>Remove</button>}
    </>
  );

  return renderWrapper(
    type === EType.Div ? (
      text
    ) : (
      <input
        ref={input}
        type="text"
        value={currentText}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        onChange={(e) => setCurrentText(e.currentTarget.value)}
      />
    )
  );
};

export default TextInput;
