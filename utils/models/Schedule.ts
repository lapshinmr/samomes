export class Schedule {
  dosing: InstanceType<typeof Dosing>;
  // TODO: change string to Date type
  startDate: string;
  waterChangeDay: DayType = {
    date: '',
    fertilizers: {},
  };
  days: DayType[] = [];

  constructor(dosing: InstanceType<typeof Dosing>) {
    this.dosing = dosing;
  }

  get daysAmountTotal() {
    const result = {};
    this.days.forEach((day: DayType) => {
      typedEntries(day.fertilizers).forEach(([fertilizerName, data]) => {
        if (!(fertilizerName in result)) {
          result[fertilizerName] = 0;
        }
        result[fertilizerName] += data.amount;
      });
    });
    return result;
  }

  get daysSelectedTotal() {
    const result = {};
    this.days.forEach((day: DayType) => {
      typedKeys(day.fertilizers).forEach((fertilizerName) => {
        if (!(fertilizerName in result)) {
          result[fertilizerName] = 0;
        }
        if (day.fertilizers[fertilizerName].selected) {
          result[fertilizerName] += 1;
        }
      });
    });
    return result;
  }

  initWaterChangeDay() {
    this.waterChangeDay.date = this.startDate;
    this.dosing.doses.forEach((dose) => {
      if (dose.amountWaterChange) {
        this.waterChangeDay.fertilizers[dose.fertilizer.name] = {
          amount: dose.amountWaterChange,
          status: AmountStatus.ACTIVE,
        };
      }
    });
  }

  initDays() {
    let startDateObject = new Date(this.startDate);
    [...Array(this.dosing.daysTotal)].forEach(() => {
      const date = startDateObject.toISOString().split('T')[0];
      const fertilizers = {};
      this.dosing.doses.forEach((dose) => {
        if (dose.amountDay) {
          fertilizers[dose.fertilizer.name] = {
            amount: dose.amountDay,
            status: AmountStatus.ACTIVE,
            selected: true,
          };
        }
      });
      this.days.push({
        date,
        fertilizers,
      });
      startDateObject = new Date(startDateObject.setDate(startDateObject.getDate() + 1));
    });
  }

  spreadDayAmounts(fertilizerName: string) {
    this.days.forEach((day) => {
      this.dosing.doses.forEach((dose) => {
        if (fertilizerName === dose.fertilizer.name && dose.amountDay && day.fertilizers[fertilizerName].selected) {
          day.fertilizers[fertilizerName].amount = format(dose.amount / this.daysSelectedTotal[fertilizerName]);
        }
      });
    });
  }

  toJson(): ScheduleType {
    return {
      dosing: this.dosing.toJson(),
      startDate: this.startDate,
      waterChangeDay: this.waterChangeDay,
      days: this.days,
    };
  }
}
