// core
import Handstand from './src/js/core/Handstand.js';
import HandstandModel from './src/js/core/HandstandModel.js';

//elements
import HandstandButton from './src/js/ui-elements/HandstandButton.js';
import HandstandCheckbox from './src/js/ui-elements/HandstandCheckbox.js';
import HandstandContainer from './src/js/ui-elements/HandstandContainer.js';
import HandstandLabel from './src/js/ui-elements/HandstandLabel.js';
import HandstandList from './src/js/ui-elements/HandstandList.js';
import HandstandTextInput from './src/js/ui-elements/HandstandTextInput.js';
import HandstandTextarea from './src/js/ui-elements/HandstandTextarea.js';
import HandstandMask from './src/js/ui-elements/HandstandMask.js';
import HandstandSwitch from './src/js/ui-elements/HandstandSwitch.js';

// components
import MutableLabel from './src/js/ui-components/MutableLabel.js';
import WaitingMask from './src/js/ui-components/WaitingMask.js';

// worker
import HandstandWorker from './src/js/worker/HandstandWorker.js';

// make us famous
global.Handstand = Handstand;
global.HandstandButton = HandstandButton;
global.HandstandCheckbox = HandstandCheckbox;
global.HandstandContainer = HandstandContainer;
global.HandstandLabel = HandstandLabel;
global.HandstandList = HandstandList;
global.HandstandTextInput = HandstandTextInput;
global.HandstandTextarea = HandstandTextarea
global.HandstandMask = HandstandMask;
global.HandstandSwitch = HandstandSwitch;
global.HandstandWorker = HandstandWorker;
global.WaitingMask = WaitingMask;
global.MutableLabel = MutableLabel;