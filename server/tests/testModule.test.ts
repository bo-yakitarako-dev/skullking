import { add, addRandom } from '../testModule';

describe.each([
  [1, 1, 2],
  [4, -2, 2],
  [-12, -34, -46],
])('add(%i, %i)', (a, b, expected) => {
  test(`足したら${expected}になるはずだぞぉ？`, () => {
    expect(add(a, b)).toBe(expected);
  });
});

test('randomモックしてやるやつ', () => {
  // Math.random()をモックする
  const mockRandom = jest.spyOn(Math, 'random');
  // Math.random()を返す値を設定するけど、1回目が0.1で2回目が0.5になる
  mockRandom.mockReturnValueOnce(0.1).mockReturnValue(0.5);
  // addRandom()を呼び出して、返り値の結果を確認
  // Math.random()のモックにより、今回は12になるはず
  expect(addRandom()).toBe(12);
  // Math.random()が呼ばれた回数を確認する
  // toHaveBeenCalledWithで引数が正しく入ってるかも確認できる
  expect(mockRandom).toHaveBeenCalledTimes(2);
  // Math.random()のモックを解除して、これ以降のテストではモックされないようにする
  mockRandom.mockRestore();
});
