import React from 'react';
import Modal, { ModalProps } from 'styled-react-modal';
import { ConnectionSelector } from '~/components/Common/ConnectionSelector/ConnectionSelector';
import * as S from './OfflineModal.styles';

export interface OfflineModalProps extends ModalProps {}

export const OfflineModal: React.FC<OfflineModalProps> = ({ ...rest }) => (
  <Modal {...rest}>
    <S.OfflineModal>
      <h2>You are offline</h2>
      <p>You are not connected or you are connected to the wrong network.</p>
      <ConnectionSelector />
    </S.OfflineModal>
  </Modal>
);
