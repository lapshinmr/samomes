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

  resetWaterChangeDay() {
    this.waterChangeDay = {
      date: '',
      fertilizers: {},
    };
  }

  resetDays() {
    this.days = [];
  }

  initWaterChangeDay() {
    this.resetWaterChangeDay();
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
    this.resetDays();
    let startDateObject = new Date(this.startDate);
    [...Array(this.dosing.daysTotal)].forEach(() => {
      const date = startDateObject.toISOString().split('T')[0];
      const fertilizers = {};
      this.dosing.doses.forEach((dose) => {
        if (dose.amountDay) {
          fertilizers[dose.fertilizer.name] = {
            amount: dose.amountDay,
            status: AmountStatus.ACTIVE,
            selected: true, // TODO: investigate is I need this
          };
        }
      });
      if (Object.entries(fertilizers).length !== 0) {
        this.days.push({
          date,
          fertilizers,
        });
      }
      startDateObject = new Date(startDateObject.setDate(startDateObject.getDate() + 1));
    });
  }

  updateDays() {
    let startDateObject = new Date(this.startDate);
    for (const day of this.days) {
      day.date = startDateObject.toISOString().split('T')[0];
      for (const fertilizerName in day.fertilizers) {
        day.fertilizers[fertilizerName].status = AmountStatus.ACTIVE;
      }
      startDateObject = new Date(startDateObject.setDate(startDateObject.getDate() + 1));
    }
  }

  spreadDayAmounts(fertilizerName: string) {
    const dose = this.dosing.doses.find((dose) => dose.fertilizer.name === fertilizerName);
    if (!dose) {
      return;
    }
    this.days.forEach((day) => {
      if (dose.amountDay && day.fertilizers[fertilizerName].selected) {
        day.fertilizers[fertilizerName].amount = format(dose.amount / this.daysSelectedTotal[fertilizerName]);
      }
    });
  }

  resetDaysAmount(fertilizerName: string) {
    const dose = this.dosing.doses.find((dose) => dose.fertilizer.name === fertilizerName);
    if (!dose) {
      return;
    }
    this.days.forEach((day) => {
      day.fertilizers[fertilizerName].amount = format(dose.amount / this.days.length);
      day.fertilizers[fertilizerName].selected = true;
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
