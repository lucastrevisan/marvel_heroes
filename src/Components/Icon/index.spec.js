import React from "react";
import { render } from "enzyme";

import Icon, { icons } from "./index";

describe("Icon component", () => {
  Object.keys(icons).forEach(iconKey => {
    it(`should match snapshot with ${iconKey} icon`, () => {
      expect(render(<Icon type={iconKey} />)).toMatchSnapshot();
    });
  });
});
