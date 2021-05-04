import { getHeight, getWeight } from "../../heplers";
import { FormVals } from "../App";
import "./ValuesTable.css";

export const ValuesTable: React.FC<FormVals> = ({ weight, height, system }) => (
  <div className="data-container">
    <p className="data-container__line">
      Weight: {`${weight} ${getWeight(system)}`}
    </p>
    <p className="data-container__line">
      Heigh: {`${height} ${getHeight(system)}`}
    </p>
  </div>
);
