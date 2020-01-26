import styled from 'styled-components';
import { Flex } from './components/globals';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  margin: 10px;
`;

export const SelectedDatesPreview = styled(Flex)`
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const FakeInput = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  margin-right: 10px;
`;

export const DoubleCalendar = styled(Flex)`
  cursor: default;
  user-select: none;
  border: 1px solid #ccc;
`;

export const CalendarWrapper = styled(Flex)`
  flex-direction: column;
  padding: 0 10px 10px 10px;
`;

export const Toolbar = styled(Flex)`
  align-items: center;
  font-size: 20px;
  justify-content: center;
  padding: 10px;
  position: relative;
`;

export const Button = styled.button.attrs({
  type: 'button',
})<{ [key: string]: any }>`
  position: absolute;
  left: ${({ left }) => left && left};
  right: ${({ right }) => right && right};
  cursor: pointer;
`;

export const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: repeat(7, auto);
  grid-template-columns: repeat(7, auto);
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;

export const GridItem = styled(Flex)<{ [key: string]: any }>`
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ darker }) => (darker && '#777') || '#333'};
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  &:nth-child(-n + 7) {
    padding: 5px;
    color: black;
  }
`;

export const Day = styled(Flex)<{ [key: string]: any }>`
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: ${({ hoverable, future }) => !future && hoverable && 'pointer'};
  width: 40px;
  height: 40px;
  background: ${({ current, selected }) =>
    (current && '#4286f4') || (selected && '#777')};
  color: ${({ current, future }) => (current && 'white') || (future && '#ccc')};
  color: ${({ selected }) => selected && 'white'};
  &:hover {
    background: ${({ current, future, hoverable }) =>
      !future && hoverable && !current && '#eee'};
  }
`;
