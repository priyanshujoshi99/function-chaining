import FunctionCard from './components/FunctionCard';
import InputNumber from './components/InputNumber';

const App = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FunctionCard
          cardTitle="Function: 1"
          equation="2x+4"
          nextFunction="Function 2"
        />
      </div>

      <InputNumber type="output" value={21} />

      <InputNumber type="input" />
    </>
  );
};

export default App;
