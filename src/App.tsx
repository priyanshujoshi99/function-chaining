import FunctionCard from './components/FunctionCard';

const App = () => {
  return (
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
  );
};

export default App;
