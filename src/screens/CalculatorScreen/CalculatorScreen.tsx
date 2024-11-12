import FunctionCard from '../../components/FunctionCard';
import InputNumber from '../../components/InputNumber';
import { useCalculateValue } from '../../hooks/useCalculateValue';

import styles from './CalculatorScreen.module.css';

const CalculatorScreen = () => {
  const value = useCalculateValue();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          <InputNumber type="input" className={styles.input} />
          <div className={styles.cardRow}>
            <FunctionCard cardTitle="Function: 1" nextFunction="Function: 2" />
            <FunctionCard cardTitle="Function: 2" nextFunction="Function: 4" />
            <FunctionCard cardTitle="Function: 3" nextFunction="-" />
          </div>
          <InputNumber type="output" value={value} className={styles.output} />
        </div>

        <div className={styles.row}>
          <div className={styles.cardRow}>
            <FunctionCard cardTitle="Function: 4" nextFunction="Function: 5" />
            <FunctionCard cardTitle="Function: 5" nextFunction="Function: 3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorScreen;
