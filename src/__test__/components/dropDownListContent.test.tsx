import { screen } from '@testing-library/react';
import { DropDownListContent, mapStateToProps } from '@/components/dashboard/dropDownListContent';
import { renderWrapper } from '../wrapper';
import { droDownListContentProps } from '../mocks/mock-props';
import { initialState } from '../mocks/mock-data';

describe('Test Drop down list content', () => {
  it('should include label title for country', () => {
    renderWrapper(<DropDownListContent {...droDownListContentProps} />);
    const countryLabelText = screen.getByText(/Select Country/i);
    expect(countryLabelText).toBeInTheDocument();
  });

  it('should include label title for camp', () => {
    renderWrapper(<DropDownListContent {...droDownListContentProps} />);
    const campLabelText = screen.getByText(/Select Camp/i);
    expect(campLabelText).toBeInTheDocument();
  });

  it('should include label title for school', () => {
    renderWrapper(<DropDownListContent {...droDownListContentProps} />);
    const schoolLabelText = screen.getByText(/Select School/i);
    expect(schoolLabelText).toBeInTheDocument();
  });

  it('mapStateToProps should return the right value', () => {
    const state = mapStateToProps(initialState);
    expect(state.filterState?.camp?.value).toBe('Omaka');
    expect(state.filterState?.country?.value).toBe('Egypt');
    expect(state.allAnalysis?.length).toBe(0);
    expect(state.allCountries?.length).toBe(0);
    expect(state.allCamps?.length).toBe(0);
  });

  it('mapStateToProps should return the right value', () => {
    const state = mapStateToProps(initialState);
    expect(state.filterState?.camp?.value).toBe('Omaka');
    expect(state.filterState?.country?.value).toBe('Egypt');
    expect(state.allAnalysis?.length).toBe(0);
    expect(state.allCountries?.length).toBe(0);
    expect(state.allCamps?.length).toBe(0);
  });
});
