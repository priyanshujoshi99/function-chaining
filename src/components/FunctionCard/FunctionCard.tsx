import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateFunctionInput } from '../../helpers/functionUtil';
import { useDebounce } from '../../hooks/useDebounce';
import { getFunction, saveFunctionValue } from '../../slice/functionSlice';
import styles from './FunctionCard.module.css';

interface IFunctionCardProps {
  cardTitle: string;
  nextFunction: string;
}

const FunctionCard = ({ cardTitle, nextFunction }: IFunctionCardProps) => {
  const dispatch = useDispatch();
  const { value: reduxValue } = useSelector(getFunction(cardTitle));
  const [localValue, setLocalValue] = useState(reduxValue);

  useEffect(() => {
    setLocalValue(reduxValue);
  }, [reduxValue]);

  const handleDebouncedInputChange = useDebounce((newValue: string) => {
    if (newValue !== reduxValue) {
      dispatch(
        saveFunctionValue({
          functionKey: cardTitle,
          functionValue: newValue,
          nextFn: nextFunction
        })
      );
    }
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!validateFunctionInput(value)) return;
    setLocalValue(value);
    handleDebouncedInputChange(value);
  };

  return (
    <article className={styles.body}>
      <header className={styles.header}>
        <div className={styles.icon} aria-hidden="true" />
        <h3 className={styles.cardTitle}>{cardTitle}</h3>
      </header>

      <section className={styles.content}>
        <div className={styles.equation}>
          <label className={styles.label} htmlFor="equationInput">
            Equation
          </label>
          <input
            type="text"
            id="equationInput"
            className={styles.input}
            value={localValue}
            onChange={handleInputChange}
            onBlur={() => handleDebouncedInputChange(localValue)}
          />
        </div>
        <div className={styles.nextFn}>
          <label className={styles.label} htmlFor="nextFunctionSelect">
            Next function
          </label>
          <select id="nextFunctionSelect" className={styles.select} disabled>
            <option value={nextFunction}>{nextFunction}</option>
          </select>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.item}>
          <div className={styles.circle} aria-hidden="true"></div>
          <span className={styles.text}>input</span>
        </div>
        <div className={styles.item}>
          <span className={styles.text}>output</span>
          <div className={styles.circle} aria-hidden="true"></div>
        </div>
      </footer>
    </article>
  );
};

export default FunctionCard;
