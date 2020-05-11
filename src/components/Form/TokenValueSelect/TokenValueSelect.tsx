import React from 'react';
import BigNumber from 'bignumber.js';
import { TokenDefinition, sameAddress } from '@melonproject/melonjs';
import { ValueType, components } from 'react-select';
import { NumberFormatValues } from 'react-number-format';
import { BigNumberInputField } from '~/components/Form/BigNumberInput/BigNumberInput';
import { SelectField, SelectOption, SelectLabel } from '~/components/Form/Select/Select';
import { useField, Wrapper, Error, Label } from '~/components/Form/Form';
import { TokenValue } from '~/TokenValue';
import * as S from './TokenValueSelect.style';

export interface TokenValueSelectProps {
  name: string;
  label?: string;
  tokens: TokenDefinition[];
  disabled?: boolean;
  placeholder?: string;
  onChange?: (after: TokenValue, before?: TokenValue) => void;
}

export interface TokenValueSelectOptions extends SelectOption {
  value: string;
}

export const TokenValueSelect: React.FC<TokenValueSelectProps> = ({
  tokens,
  label,
  disabled,
  onChange: onChangeFeedback,
  ...props
}) => {
  const [{ onChange, ...field }, meta, { setValue, setTouched }] = useField<TokenValue | undefined>(props.name);
  const inputRef = React.useRef<undefined | HTMLInputElement>();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setOpen(!open), [open, setOpen]);

  const options = React.useMemo<TokenValueSelectOptions[]>(() => {
    return tokens.map((item) => ({
      value: item.address,
      label: item.symbol,
      description: item.name,
      icon: item.symbol,
      token: item,
    }));
  }, [tokens]);

  const selection = React.useMemo(() => {
    return options.find((option) => sameAddress(option.value, field.value?.token.address));
  }, [options, field.value]);

  const number = React.useMemo(() => {
    if (!field.value) {
      return;
    }

    const value = field.value.value;

    return (BigNumber.isBigNumber(value) ? value.toFixed() : value) as string;
  }, [field.value]);

  const onSelectChange = React.useCallback(
    (option: ValueType<SelectOption>) => {
      if (Array.isArray(option)) {
        return;
      }

      const value = new TokenValue((option as SelectOption).token as TokenDefinition, field.value?.value);
      const before = field.value;

      setValue(value);
      setTouched(true);
      setOpen(false);
      onChangeFeedback?.(value, before);

      // Focus the big number input field after selecting a token.
      setTimeout(() => {
        inputRef.current?.focus();
      });
    },
    [field.value, setValue, setOpen, onChangeFeedback]
  );

  const isAllowed = React.useCallback(() => !!field.value, [field.value]);

  const onValueChange = React.useCallback(
    (values: NumberFormatValues) => {
      if (!field.value) {
        return;
      }

      const before = field.value;
      const value = field.value!.setValue(values.value);

      if (before?.value?.comparedTo(value.value ?? '') === 0) {
        return;
      }

      setValue(value);
      onChangeFeedback?.(value, before);
    },
    [field.value, setValue, onChangeFeedback]
  );

  return (
    <Wrapper>
      <Label>{label}</Label>
      <S.InputContainer>
        <BigNumberInputField
          {...meta}
          {...field}
          {...props}
          getInputRef={inputRef}
          value={number}
          decimalScale={selection?.token.decimals}
          onValueChange={onValueChange}
          isAllowed={isAllowed}
          disabled={!field.value || disabled}
          placeholder={field.value ? (props.placeholder ? props.placeholder : 'Enter a value ...') : undefined}
        />

        <S.SelectTrigger disabled={disabled} onClick={toggleOpen}>
          {selection ? <SelectLabel icon={selection.icon} label={selection.label} /> : 'Select a token ...'}{' '}
          <S.Dropdown>
            <components.DownChevron />
          </S.Dropdown>
        </S.SelectTrigger>
      </S.InputContainer>

      {open && !disabled ? (
        <S.SelectField>
          <SelectField
            {...meta}
            {...field}
            {...props}
            autoFocus={true}
            backspaceRemovesValue={false}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isClearable={false}
            isSearchable={true}
            isDisabled={disabled}
            menuIsOpen={true}
            tabSelectsValue={false}
            components={{ IndicatorSeparator: null }}
            onChange={onSelectChange}
            options={options}
            value={selection}
            placeholder="Search ..."
          />
        </S.SelectField>
      ) : null}
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </Wrapper>
  );
};
