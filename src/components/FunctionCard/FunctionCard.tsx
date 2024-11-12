import { useDispatch, useSelector } from 'react-redux';
import { getFunctionValue, saveFunctionValue } from '../../slice/functionSlice';
import styles from './FunctionCard.module.css';

interface IFunctionCarProps {
  cardTitle: string;
  nextFunction: string;
}

const FunctionCard = ({ cardTitle, nextFunction }: IFunctionCarProps) => {
  const dispatch = useDispatch();
  const { value } = useSelector(getFunctionValue(cardTitle));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      saveFunctionValue({
        functionKey: cardTitle,
        functionValue: event.target.value,
        nextFn: nextFunction
      })
    );
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
            value={value}
            onChange={handleInputChange}
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
