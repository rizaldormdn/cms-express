export default class Dimension {
  private _height: number;
  private _width: number;

  constructor(height: number, width: number) {
    if (height <= 0 || width <= 0) {
      throw new Error('dimension is invalid')
    }
  
    this._height = height;
    this._width = width;
  }

  public get height() {
    return this._height;
  }

  public get width() {
    return this._width;
  }
}
