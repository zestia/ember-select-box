import Route from 'ember-route-template';
import { LinkTo } from '@ember/routing';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

export default Route(
  <template>
    <p>
      This addon utilises a dropdown component to create comboboxes that can
      open and close like a native single select.
    </p>

    <Dropdown class="example" as |dd|>
      <dd.Trigger>
        Click here
      </dd.Trigger>
      {{#if dd.isOpen}}
        <dd.Content>
          <div>
            Non interactive element
          </div>
          <LinkTo @route="dropdown">
            Interactive element
          </LinkTo>
        </dd.Content>
      {{/if}}
    </Dropdown>
  </template>
);
