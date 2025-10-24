declare namespace Intl {
  type DurationUnit = "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds" | "milliseconds" | "microseconds" | "nanoseconds";
  type DurationStyle = "long" | "short" | "narrow" | "digital";
  type DurationDisplay = "always" | "auto";
  type DurationSignDisplay = "auto" | "never" | "always" | "exceptZero";

  interface DurationFormatOptions {
    localeMatcher?: "lookup" | "best fit";
    style?: DurationStyle;
    years?: DurationDisplay;
    months?: DurationDisplay;
    weeks?: DurationDisplay;
    days?: DurationDisplay;
    hours?: DurationDisplay;
    minutes?: DurationDisplay;
    seconds?: DurationDisplay;
    milliseconds?: DurationDisplay;
    microseconds?: DurationDisplay;
    nanoseconds?: DurationDisplay;
    signDisplay?: DurationSignDisplay;
  }

  interface DurationFormatPart {
    type: string;
    value: string;
    // Brett: Added this to otherwise AI-generated file
    unit?: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond" | "microsecond" | "nanosecond";
  }

  interface DurationInput {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
  }

  class DurationFormat {
    constructor(locales?: string | string[], options?: DurationFormatOptions);
    format(duration: DurationInput): string;
    formatToParts(duration: DurationInput): DurationFormatPart[];
    resolvedOptions(): ResolvedDurationFormatOptions;
    static supportedLocalesOf(locales: string | string[], options?: DurationFormatOptions): string[];
  }

  interface ResolvedDurationFormatOptions extends DurationFormatOptions {
    locale: string;
    style: DurationStyle;
    signDisplay: DurationSignDisplay;
  }
}
