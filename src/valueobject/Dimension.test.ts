import Dimension from './Dimension';

describe('Constructor', () => {
    test('should set height and width correctly', () => {
      const rectangle = new Dimension(10, 20);
      expect(rectangle.height).toEqual(10);
      expect(rectangle.width).toEqual(20);
    });
  });
  
  describe('Getters', () => {
    let rectangle: Dimension;
  
    beforeEach(() => {
      rectangle = new Dimension(10, 20);
    });
  
    test('should return the correct height', () => {
      expect(rectangle.height).toEqual(10);
    });
  
    test('should return the correct width', () => {
      expect(rectangle.width).toEqual(20);
    });
  });
  