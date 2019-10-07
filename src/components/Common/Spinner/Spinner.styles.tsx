import styled, { css, keyframes } from 'styled-components';
import { Logo as BaseLogo } from '../Logo/Logo';
import { SpinnerProps } from './Spinner';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  &,
  &::after {
    border-radius: 50%;
  }

  position: absolute;
  top: 0;
  border-style: solid;
  border-top-color: ${props => props.theme.otherColors.black};
  border-right-color: ${props => props.theme.otherColors.grey};
  border-bottom-color: ${props => props.theme.otherColors.black};
  border-left-color: ${props => props.theme.otherColors.grey};
  transform: translateZ(0);
  animation: ${rotate} 2s infinite linear;
`;

export const Text = styled.div`
  margin-top: ${props => props.theme.spaceUnits.s};
  text-align: center;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
`;

export const Logo = styled(BaseLogo)``;

export const Spinner = styled.div<SpinnerProps>`
  ${props => {
    if (props.size === 'default') {
      return css`
        ${Wrapper}, ${Loader}, ${Logo} {
          width: 100px;
          height: 100px;
        }

        ${Loader} {
          border-width: 2px;
        }
      `;
    }

    if (props.size === 'large') {
      return css`
        ${Wrapper}, ${Loader}, ${Logo} {
          width: 200px;
          height: 200px;
        }

        ${Loader} {
          border-width: 8px;
        }
      `;
    }

    if (props.size === 'small') {
      return css`
        ${Wrapper}, ${Loader}, ${Logo} {
          width: 50px;
          height: 50px;
        }

        ${Loader} {
          border-width: 1px;
        }
      `;
    }

    if (props.size === 'inflated') {
      return css`
        ${Wrapper}, ${Loader}, ${Logo} {
          width: 50px;
          height: 50px;
        }

        ${Loader} {
          border-width: 4px;
        }
      `;
    }
  }}
`;

export const SpinnerPositioning = styled.div<SpinnerProps>`
  position: relative;

  ${props =>
    props.overlay &&
    css`
      background-color: ${props => props.theme.mainColors.secondary};
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;

      ${Spinner} {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top: -100px;
      }
    `}
`;
