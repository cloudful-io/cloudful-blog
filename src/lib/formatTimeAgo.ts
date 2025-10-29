// formatTimeAgo.ts
export type FormatTimeAgoOptions = {
  locale?: string; // e.g. "en", "en-US", "fr"
  numeric?: "auto" | "always"; // passed to Intl.RelativeTimeFormat
  style?: "long" | "short" | "narrow"; // passed to Intl.RelativeTimeFormat
};

/**
 * Format a date/timestamp as a human-friendly relative time string.
 * Examples: "2 minutes ago", "in 3 days", "yesterday" (when numeric: "auto").
 */
export function formatTimeAgo(
  input: Date | number,
  options: FormatTimeAgoOptions = {}
): string {
  if (input === null || input === undefined) {
    throw new Error("formatTimeAgo: input must be a Date or timestamp.");
  }

  const { locale = "en", numeric = "auto", style = "long" } =
    options;

  const time = input instanceof Date ? input.getTime() : Number(input);
  const now = Date.now();

  const diffSeconds = (time - now) / 1000;
  const absSeconds = Math.abs(diffSeconds);

  const SECS = {
    SECOND: 1,
    MINUTE: 60,
    HOUR: 60 * 60,
    DAY: 24 * 60 * 60,
    WEEK: 7 * 24 * 60 * 60,
    MONTH: 30.44 * 24 * 60 * 60,
    YEAR: 365.25 * 24 * 60 * 60,
  };

  // If more than ~1 month difference, return the actual date instead of relative time
  if (absSeconds > SECS.MONTH) {
    const date = new Date(time);

    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Continue with relative formatting below
  type UnitName = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

  let unit: UnitName = "second";
  let value = 0;

  if (absSeconds < 45) {
    unit = "second";
    value = Math.round(diffSeconds);
  } else if (absSeconds < 90) {
    unit = "minute";
    value = Math.round(diffSeconds / SECS.MINUTE);
  } else if (absSeconds < 45 * SECS.MINUTE) {
    unit = "minute";
    value = Math.round(diffSeconds / SECS.MINUTE);
  } else if (absSeconds < 90 * SECS.MINUTE) {
    unit = "hour";
    value = Math.round(diffSeconds / SECS.HOUR);
  } else if (absSeconds < 22 * SECS.HOUR) {
    unit = "hour";
    value = Math.round(diffSeconds / SECS.HOUR);
  } else if (absSeconds < 36 * SECS.HOUR) {
    unit = "day";
    value = Math.round(diffSeconds / SECS.DAY);
  } else if (absSeconds < 25 * SECS.DAY) {
    unit = "day";
    value = Math.round(diffSeconds / SECS.DAY);
  } else if (absSeconds < 45 * SECS.DAY) {
    unit = "month";
    value = Math.round(diffSeconds / SECS.MONTH);
  } else if (absSeconds < 345 * SECS.DAY) {
    unit = "month";
    value = Math.round(diffSeconds / SECS.MONTH);
  } else {
    unit = "year";
    value = Math.round(diffSeconds / SECS.YEAR);
  }

  const rtfSupported = typeof Intl !== "undefined" && (Intl as any).RelativeTimeFormat;
  if (rtfSupported) {
    try {
      const rtf = new (Intl as any).RelativeTimeFormat(locale, {
        numeric,
        style,
      });
      return rtf.format(value, unit);
    } catch (e) {}
  }

  const absValue = Math.abs(value);
  const plural = absValue === 1 ? unit : unit + "s";
  if (value === 0) {
    return "just now";
  } else if (value < 0) {
    return `${absValue} ${plural} ago`;
  } else {
    return `in ${absValue} ${plural}`;
  }
}


export default formatTimeAgo;
