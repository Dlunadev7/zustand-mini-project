import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import { useBearsStore } from "../../stores";

export const BearPage = () => {


  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBears />

        <PolarBears />

        <PandasBears />
        
        <BearsDisplay />

      </div>
    </>
  );
};

export const BlackBears = () => {
  const blackBears = useBearsStore((state) => state.blackBears);
  const incrementBlackBears = useBearsStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => incrementBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => incrementBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PolarBears = () => {
  const polarBears = useBearsStore((state) => state.polarBears);
  const incrementPolarBears = useBearsStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => incrementPolarBears(+1)}>+1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => incrementPolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PandasBears = () => {
  const pandasBears = useBearsStore((state) => state.pandaBears);
  const increasePolarBears = useBearsStore((state) => state.increasePandasBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandasBears} </span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  /**
   * @description useShallow te previene a que el objeto sea renderizado nuevamente si no cambio nada.
   */
  const bears = useBearsStore(useShallow((state) => state.bears));
  const doNothing = useBearsStore((state) => state.doNothing);
  const addBear = useBearsStore((state) => state.addBear);
  const clearBears = useBearsStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>

      <button onClick={() => doNothing()}>Do nothing</button>
      <button onClick={() => addBear()}>Add bear</button>
      <button onClick={() => clearBears()}>Clear Bears</button>

      <pre>
        {JSON.stringify(bears, null, 2)}
      </pre>
    </WhiteCard>
  )
}
