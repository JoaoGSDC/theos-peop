import styled from 'styled-components';

export const CalendarContainer = styled.div`
  display: flex;
  width: 100% !important;
  height: 100%;
  font-size: 1.5rem !important;

  .react-calendar {
    margin: 0px;
    background-color: var(--background-complement);
    border: none;
    border-radius: 8px;

    button {
      color: var(--text-primary);
      border-radius: 8px;
      transition: 0.2s;
      font-size: 1.5rem !important;

      &:hover {
        background-color: var(--background-extra) !important;
      }

      &:active {
        background-color: var(--primary) !important;
      }
    }

    .react-calendar__month-view__weekdays__weekday {
      color: var(--text-tertiary);
    }

    .react-calendar__month-view__days__day--weekend {
      color: var(--quiternary) !important;
    }

    .react-calendar__tile--now {
      background-color: var(--secondary) !important;
      color: var(--text-primary) !important;
    }

    .react-calendar__tile--active {
      color: var(--text-primary) !important;
      background-color: var(--primary);
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      color: var(--background-extra) !important;
    }

    abbr {
      text-decoration: none;
    }
  }

  div {
    width: 100% !important;
  }
`;
