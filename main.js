import { version } from './package.json';
import Handstand from './src/Handstand.js';
import AbstractCustomElement from './src/abstracts/AbstractCustomElement.js';
import AbstractOrchestrator from './src/abstracts/AbstractOrchestrator.js';
import Container from './src/elements/Container.js';
import Model from './src/elements/Model.js';
import List from './src/elements/List.js';
import Mask from './src/elements/Mask.js';
import Toggle from './src/elements/Toggle.js';
import MutableLabel from './src/elements/MutableLabel.js';
import WaitingMask from './src/elements/WaitingMask.js';
import WrappedElement from './src/elements/WrappedElement.js';
import ElementMutationObserver from './src/observers/ElementMutationObserver.js';
import ElementEventObserver from './src/observers/ElementEventObserver.js';

Handstand._version = version;
Handstand._customelement = AbstractCustomElement;
Handstand._wrappedelement = WrappedElement;
Handstand._orchestrator = AbstractOrchestrator;
Handstand._elements = {
  Container: Container,
  Model: Model,
  List: List,
  Mask: Mask,
  Toggle: Toggle,
  MutableLabel: MutableLabel,
  WaitingMask: WaitingMask
};
Handstand._observers = {
  ElementMutationObserver: ElementMutationObserver,
  ElementEventObserver: ElementEventObserver
};

export default Handstand;
