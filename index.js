// core
import Handstand from './src/core/Handstand.js';
import { version } from './package.json';
Handstand.$MAJOR = version.split('.')[0];
Handstand.$MINOR = version.split('.')[1];
Handstand.$PATCH = version.split('.')[2];
Handstand.$BUILD = new Date().getTime();
// ui-elements
import HandstandButton from './src/ui-elements/HandstandButton/HandstandButton.js';
import HandstandCheckbox from './src/ui-elements/HandstandCheckbox/HandstandCheckbox.js';
import HandstandContainer from './src/ui-elements/HandstandContainer/HandstandContainer.js';
import HandstandModel from './src/ui-elements/HandstandModel/HandstandModel.js';
import HandstandLabel from './src/ui-elements/HandstandLabel/HandstandLabel.js';
import HandstandList from './src/ui-elements/HandstandList/HandstandList.js';
import HandstandTextinput from './src/ui-elements/HandstandTextinput/HandstandTextinput.js';
import HandstandTextarea from './src/ui-elements/HandstandTextarea/HandstandTextarea.js';
import HandstandMask from './src/ui-elements/HandstandMask/HandstandMask.js';
import HandstandSwitch from './src/ui-elements/HandstandSwitch/HandstandSwitch.js';
// ui-components
import MutableLabel from './src/ui-components/MutableLabel/MutableLabel.js';
import WaitingMask from './src/ui-components/WaitingMask/WaitingMask.js';

global.Handstand = Handstand;
global.HandstandModel = HandstandModel;
global.HandstandButton = HandstandButton;
global.HandstandCheckbox = HandstandCheckbox;
global.HandstandContainer = HandstandContainer;
global.HandstandLabel = HandstandLabel;
global.HandstandList = HandstandList;
global.HandstandTextinput = HandstandTextinput;
global.HandstandTextarea = HandstandTextarea;
global.HandstandMask = HandstandMask;
global.HandstandSwitch = HandstandSwitch;
global.WaitingMask = WaitingMask;
global.MutableLabel = MutableLabel;
