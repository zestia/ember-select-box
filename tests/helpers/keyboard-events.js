import jQuery from 'jquery';

export default {
  backspace() { return jQuery.Event('keydown', { which: 8 }); },
  tab()       { return jQuery.Event('keydown', { which: 9 }); },
  enter()     { return jQuery.Event('keydown', { which: 13 }); },
  escape()    { return jQuery.Event('keydown', { which: 27 }); },
  left()      { return jQuery.Event('keydown', { which: 37 }); },
  up()        { return jQuery.Event('keydown', { which: 38 }); },
  right()     { return jQuery.Event('keydown', { which: 39 }); },
  down()      { return jQuery.Event('keydown', { which: 40 }); }
};
