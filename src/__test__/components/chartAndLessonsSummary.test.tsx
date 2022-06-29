import { screen } from "@testing-library/react";
import * as mockData from "../mocks/mock-props";
import { renderWrapper } from "../wrapper";
import ChartAndLessonsSummary from "@/components/dashboard/chartAndLessonsSummary/chartAndLessonsSummary";
import { initialOptianModel } from '@/defines';


describe("Test Chat and Lessons summary", () => {

  it("should include 'Lessons' as a static data", () => {
    mockData.filterStateprops.filterstate.country = undefined;

    renderWrapper(<ChartAndLessonsSummary {...mockData.filterStateprops.filterstate} />);
    const lessonsNumberText = screen.getByText(/No Data Found/);
    expect(lessonsNumberText).toBeInTheDocument();
  });
});
