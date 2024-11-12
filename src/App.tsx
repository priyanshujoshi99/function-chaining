import FunctionCard from './components/FunctionCard';
import InputNumber from './components/InputNumber';

import styles from './App.module.css';

const App = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.row1}>
          <InputNumber type="input" className={styles.input} />
          <FunctionCard
            cardTitle="Function: 1"
            equation="2x+4"
            nextFunction="Function: 2"
          />
          <FunctionCard
            cardTitle="Function: 2"
            equation="2x+4"
            nextFunction="Function: 4"
          />
          <FunctionCard
            cardTitle="Function: 3"
            equation="2x+4"
            nextFunction="-"
          />
          <InputNumber type="output" value={21} className={styles.output} />
        </div>
        <div className={styles.row2}>
          <FunctionCard
            cardTitle="Function: 4"
            equation="2x+4"
            nextFunction="Function: 5"
          />
          <FunctionCard
            cardTitle="Function: 5"
            equation="2x+4"
            nextFunction="Function: 3"
          />
        </div>
      </div>
    </>
  );
};

export default App;
