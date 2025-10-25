// formatTimeAgo.ts
export type FormatTimeAgoOptions = {
  locale?: string; // e.g. "en", "en-US", "fr"
  now?: Date | number; // override "now" for testing
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

  const { locale = "en", now = Date.now(), numeric = "auto", style = "long" } =
    options;

  const time = input instanceof Date ? input.getTime() : Number(input);
  const nowMs = now instanceof Date ? now.getTime() : Number(now);

  // difference in seconds (positive -> input is in future; negative -> input is in past)
  const diffSeconds = (time - nowMs) / 1000;

  // absolute seconds for thresholds
  const absSeconds = Math.abs(diffSeconds);

  // unit definitions (approximate for months/years)
  const SECS = {
    SECOND: 1,
    MINUTE: 60,
    HOUR: 60 * 60,
    DAY: 24 * 60 * 60,
    WEEK: 7 * 24 * 60 * 60,
    MONTH: 30.44 * 24 * 60 * 60, // average month
    YEAR: 365.25 * 24 * 60 * 60, // average year
  };

  // choose best unit
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

  // Use Intl.RelativeTimeFormat when available
  const rtfSupported = typeof Intl !== "undefined" && (Intl as any).RelativeTimeFormat;
  if (rtfSupported) {
    try {
      const rtf = new (Intl as any).RelativeTimeFormat(locale, {
        numeric,
        style,
      });
      // Intl.RelativeTimeFormat expects the amount relative to "now".
      // It traditionally takes a number (negative = past, positive = future)
      return rtf.format(value, unit);
    } catch (e) {
      // fall through to fallback format
    }
  }

  // Fallback: English-ish formatting
  const absValue = Math.abs(value);
  const plural = absValue === 1 ? unit : unit + "s";
  if (value === 0) {
    return "just now";
  } else if (value < 0) {
    // past
    return `${absValue} ${plural} ago`;
  } else {
    // future
    return `in ${absValue} ${plural}`;
  }
}

export default formatTimeAgo;
