# UI Layout Audit Report

Generated: 2026-11-19T03:05:54.091Z
Base URL: http://localhost:3000
Routes Audited: 7
Viewports: 360x740, 390x844, 768x1024, 1024x768, 1440x900
Screenshots saved to: `docs/ui-audit/<route>-<width>.png`

## Executive Summary

- **Total Issues Detected**: 35
- **Critical (Page Overflow / Uncontained Element Overflow / Clipped Content)**: 0
- **Info (Unequal Card Heights / Content Wrapping / Contained Elements)**: 35

### Breakdown per Viewport

| Viewport | Device Type | Critical Issues | Info Issues | Total |
|---|---|---|---|---|
| `360x740` | mobile | **0** | 8 | 8 |
| `390x844` | mobile | **0** | 8 | 8 |
| `768x1024` | tablet | **0** | 2 | 2 |
| `1024x768` | desktop-sm | **0** | 8 | 8 |
| `1440x900` | desktop-lg | **0** | 9 | 9 |

## Detailed Findings (Ranked by Severity & Mobile First)

| Route | Viewport | Severity | Selector | Problem | Likely CSS cause (file:line) |
|---|---|---|---|---|---|
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `div.study-hours-table-wrap > table` | Element right edge (573px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css:8089 & :8097 (.study-hours-table-wrap table min-width 500px) |
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `table > thead` | Element right edge (573px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css:4544 & :4553 (.table-responsive-wrapper table min-width 500px) |
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `thead > tr` | Element right edge (573px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `tr > th` | Element right edge (424px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `table > tbody` | Element right edge (573px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css:4544 & :4553 (.table-responsive-wrapper table min-width 500px) |
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `tbody > tr` | Element right edge (573px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/study-hours-calculator` | 360x740 | **INFO** | `tr > td` | Element right edge (424px) exceeds viewport width (360px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/weekly-study-planner` | 360x740 | **INFO** | `div.interactive-widget-card > aside` | Content horizontal overflow within container: scrollWidth (326px) > clientWidth (296px) | src/app/globals.css:4558 & src/components/tools/WeeklyStudyPlanner.js |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `div.study-hours-table-wrap > table` | Element right edge (577px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css:8089 & :8097 (.study-hours-table-wrap table min-width 500px) |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `table > thead` | Element right edge (577px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css:4544 & :4553 (.table-responsive-wrapper table min-width 500px) |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `thead > tr` | Element right edge (577px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `tr > th` | Element right edge (428px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `table > tbody` | Element right edge (577px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css:4544 & :4553 (.table-responsive-wrapper table min-width 500px) |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `tbody > tr` | Element right edge (577px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/study-hours-calculator` | 390x844 | **INFO** | `tr > td` | Element right edge (428px) exceeds viewport width (390px) inside intentional scroll/clipped container | src/app/globals.css or component inline style |
| `/tools/weekly-study-planner` | 390x844 | **INFO** | `div.interactive-widget-card > aside` | Content horizontal overflow within container: scrollWidth (356px) > clientWidth (326px) | src/app/globals.css:4558 & src/components/tools/WeeklyStudyPlanner.js |
| `/tools/study-timetable-generator` | 768x1024 | **INFO** | `div.planner-card > div > (div > span, div > h2.planner-card-title)` | Unequal card heights in the same row: height varies by 8px (min 21px vs max 29px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/weekly-study-planner` | 768x1024 | **INFO** | `div.interactive-widget-card > aside` | Content horizontal overflow within container: scrollWidth (694px) > clientWidth (664px) | src/app/globals.css:4558 & src/components/tools/WeeklyStudyPlanner.js |
| `/tools/daily-routine-generator` | 1024x768 | **INFO** | `div.daily-routine-planner-widget > div.daily-routine-main-grid > (div.daily-routine-main-grid > div.daily-routine-config-col, div.daily-routine-main-grid > div.daily-routine-dashboard-col)` | Unequal card heights in the same row: height varies by 25px (min 668px vs max 693px) | src/app/globals.css:7231 (.daily-routine-main-grid align-items: start) |
| `/tools/focus-time-calculator` | 1024x768 | **INFO** | `div.ui-card > div.ui-card-footer.p-5 > (div.ui-card-footer > a, div.ui-card-footer > div.ui-badge.inline-flex)` | Unequal card heights in the same row: height varies by 12px (min 17px vs max 28px) | src/components/ui/card.jsx:58 & tool components (differing action/badge heights) |
| `/tools/study-timetable-generator` | 1024x768 | **INFO** | `div > div.daily-routine-main-grid > (div.daily-routine-main-grid > div.daily-routine-config-col, div.daily-routine-main-grid > div.daily-routine-dashboard-col)` | Unequal card heights in the same row: height varies by 57px (min 710px vs max 767px) | src/app/globals.css:7231 (.daily-routine-main-grid align-items: start) |
| `/tools/study-timetable-generator` | 1024x768 | **INFO** | `div.planner-stepper-desktop > button.planner-step-tab.active > (button.planner-step-tab > span.planner-step-badge, button.planner-step-tab > span)` | Unequal card heights in the same row: height varies by 8px (min 14px vs max 22px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/study-timetable-generator` | 1024x768 | **INFO** | `div.planner-stepper-desktop > button.planner-step-tab > (button.planner-step-tab > span.planner-step-badge, button.planner-step-tab > span)` | Unequal card heights in the same row: height varies by 8px (min 14px vs max 22px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/study-timetable-generator` | 1024x768 | **INFO** | `div.planner-card > div > (div > span, div > h2.planner-card-title)` | Unequal card heights in the same row: height varies by 8px (min 21px vs max 29px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/weekly-study-planner` | 1024x768 | **INFO** | `div.interactive-widget-card > aside` | Content horizontal overflow within container: scrollWidth (686px) > clientWidth (656px) | src/app/globals.css:4558 & src/components/tools/WeeklyStudyPlanner.js |
| `/tools/weekly-study-planner` | 1024x768 | **INFO** | `div.ui-card > div.ui-card-footer.p-5 > (div.ui-card-footer > a, div.ui-card-footer > div.ui-badge.inline-flex)` | Unequal card heights in the same row: height varies by 12px (min 17px vs max 28px) | src/components/ui/card.jsx:58 & tool components (differing action/badge heights) |
| `/tools` | 1440x900 | **INFO** | `div.ui-card > div.ui-card-footer.p-5 > (div.ui-card-footer > a.feat-link, div.ui-card-footer > div.ui-badge.inline-flex)` | Unequal card heights in the same row: height varies by 12px (min 17px vs max 28px) | src/components/ui/card.jsx:58 & tool components (differing action/badge heights) |
| `/tools/daily-routine-generator` | 1440x900 | **INFO** | `div.daily-routine-planner-widget > div.daily-routine-main-grid > (div.daily-routine-main-grid > div.daily-routine-config-col, div.daily-routine-main-grid > div.daily-routine-dashboard-col)` | Unequal card heights in the same row: height varies by 267px (min 533px vs max 800px) | src/app/globals.css:7231 (.daily-routine-main-grid align-items: start) |
| `/tools/focus-time-calculator` | 1440x900 | **INFO** | `div.ui-card > div.ui-card-footer.p-5 > (div.ui-card-footer > a, div.ui-card-footer > div.ui-badge.inline-flex)` | Unequal card heights in the same row: height varies by 12px (min 17px vs max 28px) | src/components/ui/card.jsx:58 & tool components (differing action/badge heights) |
| `/tools/study-timetable-generator` | 1440x900 | **INFO** | `div > div.daily-routine-main-grid > (div.daily-routine-main-grid > div.daily-routine-config-col, div.daily-routine-main-grid > div.daily-routine-dashboard-col)` | Unequal card heights in the same row: height varies by 182px (min 533px vs max 715px) | src/app/globals.css:7231 (.daily-routine-main-grid align-items: start) |
| `/tools/study-timetable-generator` | 1440x900 | **INFO** | `div.planner-stepper-desktop > button.planner-step-tab.active > (button.planner-step-tab > span.planner-step-badge, button.planner-step-tab > span)` | Unequal card heights in the same row: height varies by 8px (min 14px vs max 22px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/study-timetable-generator` | 1440x900 | **INFO** | `div.planner-stepper-desktop > button.planner-step-tab > (button.planner-step-tab > span.planner-step-badge, button.planner-step-tab > span)` | Unequal card heights in the same row: height varies by 8px (min 14px vs max 22px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/study-timetable-generator` | 1440x900 | **INFO** | `div.planner-card > div > (div > span, div > h2.planner-card-title)` | Unequal card heights in the same row: height varies by 8px (min 21px vs max 29px) | src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card) |
| `/tools/weekly-study-planner` | 1440x900 | **INFO** | `div.interactive-widget-card > aside` | Content horizontal overflow within container: scrollWidth (686px) > clientWidth (656px) | src/app/globals.css:4558 & src/components/tools/WeeklyStudyPlanner.js |
| `/tools/weekly-study-planner` | 1440x900 | **INFO** | `div.ui-card > div.ui-card-footer.p-5 > (div.ui-card-footer > a, div.ui-card-footer > div.ui-badge.inline-flex)` | Unequal card heights in the same row: height varies by 12px (min 17px vs max 28px) | src/components/ui/card.jsx:58 & tool components (differing action/badge heights) |

## Code Smells & Root Cause Analysis in globals.css and Components

### 1. Fixed Pixel Width & Height Violations

- **Fixed px width occurrences in `globals.css`**: **77 occurrences**.
  - Key layout-breaking instances:
    - `src/app/globals.css:4024`: `.hero-phone-primary { width: 195px; }` and line 4033: `.hero-phone-secondary { width: 185px; }` — combined with rotation and margins, this totals 395px, exceeding 360px and 390px mobile viewports.
    - `src/app/globals.css:5194`: `.manifesto-ambient-light { width: 750px; height: 400px; }` — positioned at center with 750px fixed width, its right edge extends to 555px on a 360px screen (195px overflow).
    - `src/app/globals.css:4554`: `.table-responsive-wrapper table { min-width: 500px; }` — creates viewport protrusion without touch-scroll affordance on narrow viewports.
    - `src/app/globals.css:8098`: `.study-hours-table-wrap table { min-width: 500px; }` — 213px overflow on 360px screen.
- **Fixed px height occurrences in `globals.css`**: **83 occurrences**.
  - Key layout-breaking instances:
    - `src/app/globals.css:1056`: `.hero-phones-stage { height: 400px; }` — fixed height truncates dynamic phone scales on medium viewports.
    - `src/app/globals.css:4742`: `.fixed-showcase-section` with fixed-height stage layouts causing vertical clipping in `#tour` (`scrollHeight 998px > clientHeight 938px`).
    - `src/app/globals.css:2564`: `.tools-cloud-section { overflow: hidden; }` with fixed padding and canvas clipping content on tablet (`scrollHeight 481px > clientHeight 465px`).
- **Inline fixed widths & heights in components**: **356 occurrences** across `src/components/`.
  - `src/app/basecamp/overview/page.js` (24 inline fixed dimensions)
  - `src/components/tools/FocusRoiCalculator.js` (24 inline fixed dimensions)
  - `src/components/tools/PlannerProfileSetup.js` (17 inline fixed dimensions)
  - `src/components/tools/StudyHoursCalculator.js` (16 inline fixed dimensions)
  - `src/components/tools/routine/RoutineProfileConfig.js` (14 inline fixed dimensions)
  - `src/components/StudentProfileModal.js` (12 inline fixed dimensions)

### 2. Absolute Positioning Hazards

- **Occurrences in `globals.css`**: **18 occurrences**.
  - Key instances causing overflows:
    - `src/app/globals.css:5190`: `.manifesto-ambient-light { position: absolute; left: 50%; width: 750px; }` without viewport containment.
    - `src/app/globals.css:1050`: `.hero-phones-stage` phone positioning causing offscreen drift on narrow devices.
    - `src/app/globals.css:1159`: `.hero-phone-notch`.
    - `src/app/globals.css:2581`: `.tools-cloud-dot-mesh`.

### 3. Overuse of `!important`

- **Occurrences in `globals.css`**: **501 occurrences**.
  - Over 120 media query overrides rely on `!important` to brute-force specificity.
  - `src/app/globals.css:9098-9115`: `.related-features-grid` forces `repeat(4, minmax(0, 1fr)) !important`, squishing cards to 153px width inside 662px containers, triggering text overflow.
  - Dozens of button and card padding overrides use `!important`, preventing clean token inheritance.

### 4. Duplicated Card & Grid Classes (Lack of Single Source of Truth)

- **50 Duplicated Card Classes in `globals.css`**:
  - `.compare-card`, `.compare-card-problem`, `.compare-card-solution`, `.feat-card`, `.faq-card-container`, `.calc-results-card`, `.content-card`, `.content-card-faq`, `.planner-card`, `.planner-config-card`, `.planner-kpi-card`, `.daily-routine-config-card`, `.daily-routine-dashboard-card`, `.study-hours-config-card`, `.study-hours-output-card`, `.focus-roi-config-card`, `.focus-roi-dashboard-card`, `.interactive-widget-card`...
  - **Problem**: Each card defines its own ad-hoc `border-radius` (8px, 12px, 16px, 18px, 24px, 28px, 32px), inconsistent padding (12px to 32px), differing borders, and varying flex layouts, leading to cards in the same row having mismatched heights (>4px up to 267px difference).
- **24 Duplicated Grid Classes in `globals.css`**:
  - `.problem-comparison-grid`, `.features-grid`, `.calc-presets-grid`, `.admin-metric-grid`, `.planner-workspace-grid`, `.planner-grid-2col`, `.planner-add-commitment-grid`, `.planner-metrics-grid`, `.daily-routine-main-grid`, `.daily-routine-metrics-grid`, `.study-hours-workspace-grid`, `.study-hours-metrics-grid`, `.focus-roi-workspace-grid`, `.related-features-grid`...
  - **Problem**: Inconsistent `grid-template-columns` definitions (some with hardcoded minmax, some with fixed column counts) and `align-items: start` instead of `stretch`, which prevents sibling cards from having equal height.

## Proposed Strategy for Phase B & Phase C

1. **Phase B (Layout System)**: Establish clean design tokens in `:root`, implement unified `.container`, `.section`, `.grid`, and `.card` patterns, and apply global safety rules (`box-sizing: border-box`, `overflow-wrap: anywhere`, `min-width: 0` on flex/grid children, responsive table wrappers).
2. **Phase C (Page Group Fixes)**: Progressively refactor Home -> Features -> Exams -> Tools -> Utility/Legal -> Navbar/Footer/Modals to use the unified tokens and patterns, replacing fixed heights with min-height and ensuring full responsiveness across all 5 viewports.
