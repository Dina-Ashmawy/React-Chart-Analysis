import { screen } from '@testing-library/react';
import * as mockData from '../mocks/mock-props'
import { renderWrapper } from "../wrapper";
import ChartAndLessonsSummary  from "../../components/dashboard/chartAndLessonsSummary/chartAndLessonsSummary";

describe("Test Chat and Lessons summary", () => {
    it("should include 'Lessons' as a static data",  () => {
      renderWrapper(<ChartAndLessonsSummary {...mockData.filterStateprops} />);
      const lessonsNumberText = screen.getByText(/No Data Found/);
      expect(lessonsNumberText).toBeInTheDocument();
    });
  });
  
  