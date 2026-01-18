import { CalendarEvent, EventColor } from "calendar-utils";
import { colors } from "../colors";

export class ColorsHelper {

  static resolveColor(event: CalendarEvent, colorType: string): string {
    let color = event.color;

    let foundColor: EventColor = ColorsHelper.getColor(color);

    let returnValue: string | undefined = '';
    switch (colorType) {
      case 'primary':
        let primaryValue = color?.primary
        returnValue = !primaryValue ? foundColor.primary : primaryValue;
        break;
      case 'secondary':
        let secondaryValue = color?.secondary;
        returnValue = !secondaryValue ? foundColor.secondary : secondaryValue;
        break;
      case 'secondaryText':
        let secondaryTextValue = event.color?.secondaryText;
        returnValue = !secondaryTextValue ? foundColor.secondaryText : secondaryTextValue;
        break;
    }

    return returnValue === undefined ? '' : returnValue;
  }

  private static getColor(color: EventColor | undefined): EventColor {
    let foundColor: EventColor = {
      primary: '', secondary: '',
      secondaryText: ''
    };
    for (let colorKey in colors) {
      let colorValue = colors[colorKey];

      if (color?.primary === colorValue.primary) {
        foundColor = colorValue;
      }
    }

    return foundColor;
  }
}