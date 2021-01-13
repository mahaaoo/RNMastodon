// @ts-ignore
import { Overlay } from 'teaset'

export default class BaseModal {
  _show: boolean = false;
  _modal: React.FC<{}> | undefined = undefined;
  overlayView: React.FC<{}> | any = undefined;
  renderComponent: Function = () => {};

  /**
   * 初始化
   */
  init () {
    this._show = false;
    this._modal = this.renderComponent();
  }

  /**
   * 开启
   */
  open() {
    console.log("触发");
    if (this._show === false) {
      console.log("xianshi");
      Overlay.show(this._modal);
      this._setShow(true);
    }
  }

  /**
   * 关闭
   */
  close() {
    if (this._show === true) {
      this.overlayView && this.overlayView.close();
      this._setShow(false);
    }
  }

  /**
   * 设置是否显示
   * @param show true: 显示; false: 不显示 
   */
  _setShow(show: boolean) {
    this._show = show;
  }

  /**
   * 获取是否显示
   */
  getShow() { return this._show };

  /**
   * 获取组件
   */
  getModal() { return this._modal};

  /**
   * 获取悬浮层
   */
  getOverlay() {return this.overlayView};
}