import React from 'react';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  // if the input is empty, then we set the value to nothing otherwise we set the value to
  return PatchEvent.from(value === '' ? unset() : set(Number(value)))
}

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>{type.title} - {value ? formatMoney(value / 100) : ''}</h2>
      <p>{type.description}</p>
      <input type={type.name} value={value} onChange={event => onChange(createPatchFrom(event.target.value))} ref={inputComponent} />
    </div>
  )
}

PriceInput.focus = function() {
  //without this we can not modify the value of the field
  this._inputElement.focus();
}

export default PriceInput
