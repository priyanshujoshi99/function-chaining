import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { getVariableValue, saveVariableValue } from '../../slice/functionSlice';

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
  const dispatch = useDispatch();
  const reduxValue = useSelector(getVariableValue);

  const isOutput = type === 'output';
  const labelText = isOutput ? 'Final Output y' : 'Initial value of x';

  const handleDebouncedInputChange = useDebounce((newValue: number) => {
    if (!isOutput && newValue !== reduxValue) {
      dispatch(saveVariableValue(newValue));
    }
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    handleDebouncedInputChange(newValue);
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
            value={reduxValue}
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
