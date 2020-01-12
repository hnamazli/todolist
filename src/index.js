import './style.less';
import View from './View';
import Model from "./Model";

const init = () => {
    const model = new Model();
    new View(model);
};

init();