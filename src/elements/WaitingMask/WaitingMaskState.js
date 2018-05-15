import AbstractEnum from '../../abstracts/AbstractEnum.js';
export default class WaitingMaskState extends AbstractEnum {
  /**
   * @return {WaitingMaskState} indicates the state of a WaitingMask
   * @property {Hidden} WaitingMaskState indicates WaitingMask is hidden
   * @property {Shown} WaitingMaskState indicates WaitingMask is shown
   */
  constructor(nume) {
    super(nume);
  }
}
WaitingMaskState.Hidden = new WaitingMaskState('HIDDEN');
WaitingMaskState.Shown = new WaitingMaskState('SHOWN');
