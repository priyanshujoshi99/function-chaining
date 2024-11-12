import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './InputNumber.module.css';

interface InputNumberProps {
  type?: 'input' | 'output';
  value?: number;
  className?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  type = 'input',
  value: propValue,
  className
}) => {
  const [value, setValue] = useState(2);

  const isOutput = type === 'output';
  const labelText = isOutput ? 'Final Output y' : 'Initial value of x';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOutput) {
      setValue(Number(event.target.value));
    }
  };

  return (
    <section
      className={classNames(styles.container, className)}
      aria-live="polite"
    >
      <label
        htmlFor="inputNumberField"
        className={classNames({
          [styles.outputLabel]: isOutput,
          [styles.inputLabel]: !isOutput
        })}
      >
        {labelText}
      </label>
      {isOutput ? (
        <div className={styles.outputContainer}>
          <div className={styles.circle} aria-hidden="true"></div>
          <input
            id="inputNumberField"
            type="number"
            value={propValue}
            onChange={handleInputChange}
            readOnly
            className={styles.output}
            aria-readonly={isOutput}
          />
        </div>
      ) : (
        <div className={styles.inputContainer}>
          <input
            id="inputNumberField"
            type="number"
            value={value}
            onChange={handleInputChange}
            className={styles.input}
          />
          <div className={styles.circle} aria-hidden="true"></div>
        </div>
      )}
    </section>
  );
};

export default InputNumber;
