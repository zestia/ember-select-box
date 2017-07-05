import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('backtracking focus use-case');

// Try scenario in a Twiddle:
// https://ember-twiddle.com/2f066b448da4242c29e241a5203d8840

test('backtracking focus error', function(assert) {
  assert.expect(5);

  visit('/backtrack-select');

  andThen(() => {
    assert.equal(find('.backtrack-select-options').length, 0,
      'precondition: options not rendered when closed');

    assert.ok(!find('.backtrack-select').hasClass('is-focused'),
      'precondition: not focused');
  });

  triggerEvent('.backtrack-select', 'focus');
  click('.backtrack-select-selected-option:contains("open")');

  andThen(() => {
    assert.equal(find('.backtrack-select-options').length, 1,
      'precondition: options rendered when open');

    assert.ok(find('.backtrack-select').hasClass('is-focused'),
      'precondition: focused');
  });

  click('.backtrack-select button:contains("close")');

  andThen(() => {
    assert.equal(find('.backtrack-select-options').length, 0,
      'options destroyed successfully without throwing double render error');
  });
});
