import { screen } from "@testing-library/react";
import {
  LessonsSummary,
  mapStateToProps
} from "../../components/dashboard/chartAndLessonsSummary/lessonsSummary";
import { renderWrapper } from "../wrapper";
import{lessonsSummaryprops} from '../mocks/mock-props'
import{initialState} from '../mocks/mock-data'



describe("Test lessons summary", () => {
  it("should include 'Lessons' as a static data",  () => {
    renderWrapper(<LessonsSummary {...lessonsSummaryprops} />);
    const lessonsNumberText = screen.getByText(/112 Lessons/);
    expect(lessonsNumberText).toBeInTheDocument();
  });
  it("mapStateToProps should return the right value",  () => {
    const state = mapStateToProps(initialState);
    expect(state.filterstate?.camp?.value).toBe('Omaka');
    expect(state.lessonsByCampData[0].id).toBe(1);
    expect(state.lessonsByCampData[1].id).toBe(2);
    expect(state.lessonsByCampData.length).toBe(2);
  });
});

