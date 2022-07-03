import { screen } from '@testing-library/react';
import { PointData, mapStateToProps } from '@/components/pointData/pointData';
import { renderWrapper } from '../wrapper';
import { filterStateprops } from '../mocks/mock-props';
import { initialState } from '../mocks/mock-data';

describe('Test Point detail Page title', () => {
  it('should the point details render', () => {
    renderWrapper(<PointData {...filterStateprops} />);
    const headerTitle = screen.getByText(/Point details/i);
    expect(headerTitle).toBeInTheDocument();
  });

  it('mapStateToProps should return the filterState data', () => {
    const state = mapStateToProps(initialState);
    expect(state.filterstate.camp?.value).toBe('Omaka');
    expect(state.filterstate.country?.value).toBe('Egypt');
    expect(state.filterstate.school?.value).toBe('Burke High School');
  });
});
