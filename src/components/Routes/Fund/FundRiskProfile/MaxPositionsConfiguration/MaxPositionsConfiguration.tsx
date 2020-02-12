import React from 'react';
import * as Yup from 'yup';
import { useForm, FormContext } from 'react-hook-form';
import { useEnvironment } from '~/hooks/useEnvironment';
import { MaxPositions, Deployment, PolicyDefinition } from '@melonproject/melonjs';
import { MaxPositionsBytecode } from '@melonproject/melonjs/abis/MaxPositions.bin';
import { useAccount } from '~/hooks/useAccount';
import { Button } from '~/storybook/components/Button/Button';
import { Input } from '~/storybook/components/Input/Input';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { BlockActions } from '~/storybook/components/Block/Block';

interface MaxPositionsConfigurationForm {
  maxPositions: number;
}

export interface MaxPositionsConfigurationProps {
  policyManager: string;
  policy: PolicyDefinition;
  startTransaction: (tx: Deployment<MaxPositions>, name: string) => void;
}

export const MaxPositionsConfiguration: React.FC<MaxPositionsConfigurationProps> = props => {
  const environment = useEnvironment()!;
  const account = useAccount();

  const validationSchema = Yup.object().shape({
    maxPositions: Yup.number()
      .label('Maximum number of positions')
      .required()
      .min(0)
      .integer(),
  });

  const defaultValues = {
    maxPositions: 10,
  };

  const form = useForm<MaxPositionsConfigurationForm>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const submit = form.handleSubmit(async data => {
    const tx = MaxPositions.deploy(environment, MaxPositionsBytecode, account.address!, data.maxPositions!);
    props.startTransaction(tx, 'Deploy MaxPositions Contract');
  });

  return (
    <>
      <SectionTitle>Configure max positions policy</SectionTitle>

      <FormContext {...form}>
        <form onSubmit={submit}>
          <Input name="maxPositions" label="Maximum number of positions" type="number" step={1} id="maxPositions" />
          <BlockActions>
            <Button type="submit">Add max positions policy</Button>
          </BlockActions>
        </form>
      </FormContext>
    </>
  );
};

export default MaxPositionsConfiguration;