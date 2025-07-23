import Route from 'ember-route-template';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import '../styles/app.scss';

const handleSubmit = (event) => {
  event.preventDefault();

  console.log('Form submitted', event); // eslint-disable-line no-console
};

export default Route(
  <template>
    <h1>
      @zestia/ember-select-box
    </h1>

    <p>
      <LinkTo @route="example1">
        Single listbox
      </LinkTo>
      |
      <LinkTo @route="example2">
        Multiple listbox
      </LinkTo>
      |
      <LinkTo @route="example3">
        Single Combobox
      </LinkTo>
      |
      <LinkTo @route="example4">
        Multiple Combobox
      </LinkTo>
      |
      <LinkTo @route="example5">
        Multiple Combobox with input
      </LinkTo>
      |
      <LinkTo @route="example6">
        Combobox with input inside
      </LinkTo>
      |
      <LinkTo @route="example7">
        Combobox with input outside
      </LinkTo>
      |
      <LinkTo @route="dropdown">
        Dropdown
      </LinkTo>
    </p>

    <p>
      <strong>Please note</strong>
      These select boxes do not come with the addon. The addon provides the
      tools to create them, and many more variations. Check out the
      <a
        href="https://github.com/zestia/ember-select-box/tree/main/tests/demo/components"
      >
        templates
      </a>.
    </p>

    <form {{on "submit" handleSubmit}}>
      {{outlet}}
    </form>

    {{! template-lint-disable no-inline-styles }}
    <a href="https://github.com/zestia/ember-select-box">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
  </template>
);
