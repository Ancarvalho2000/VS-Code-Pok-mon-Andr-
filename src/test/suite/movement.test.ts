import * as assert from 'assert';
import { PokemonSize, PokemonSpeed } from '../../common/types';
import { BasePokemonType } from '../../panel/base-pokemon-type';
import { WalkRightState } from '../../panel/states';

class TestPokemon extends BasePokemonType {
  constructor(left: number, bottom: number) {
    super(
      document.createElement('img'),
      document.createElement('div'),
      document.createElement('img'),
      PokemonSize.medium,
      left,
      bottom,
      'pokemon',
      10,
      'test',
      PokemonSpeed.normal,
      'gen1',
      32,
    );
  }
}

suite('Pokemon movement', () => {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;

  setup(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 400,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 300,
    });
  });

  teardown(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: originalWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalHeight,
    });
  });

  test('walks diagonally', () => {
    const pokemon = new TestPokemon(50, 50);
    const initialLeft = pokemon.left;
    const initialBottom = pokemon.bottom;

    new WalkRightState(pokemon).nextFrame();

    assert.ok(pokemon.left > initialLeft);
    assert.notStrictEqual(pokemon.bottom, initialBottom);
  });

  test('stays inside the window at its edges', () => {
    const pokemon = new TestPokemon(1000, 1000);
    const maxPosition = 400 - pokemon.width;

    assert.strictEqual(pokemon.left, maxPosition);
    assert.strictEqual(pokemon.bottom, 300 - pokemon.width);

    new WalkRightState(pokemon).nextFrame();

    assert.ok(pokemon.left >= 0);
    assert.ok(pokemon.left + pokemon.width <= window.innerWidth);
    assert.ok(pokemon.bottom >= 0);
    assert.ok(pokemon.bottom + pokemon.width <= window.innerHeight);
  });
});
