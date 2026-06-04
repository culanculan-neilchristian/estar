# Expectations vs. Reality - Logic & Data Flow

The Expectations & Reality section compares static expected goals with actual Nakhon Sawan data from the one CSV file.

## Expected Data

The expected/goal side is hardcoded in:

`src/components/home/ExpectationsReality.tsx`

Update that component if the goal numbers change.

## Actual Data

The actual side receives `actualData2024` from:

`src/app/(frontend)/page.tsx`

That data comes from:

`CsvDataService.getImpactTrackerStats(getThaiProvinceName('Nakhon Sawan'))`

The service reads:

`uploads/data/Studio 2 - Studio 2.csv (1).csv`

It then passes phase 1, which represents records up to 2024, into the component.

## Upload Behavior

Payload upload still exists as an admin workflow, but display data stays one-file based. When a new CSV is uploaded, `DataUploads.ts` overwrites:

`uploads/data/Studio 2 - Studio 2.csv (1).csv`

Then it revalidates the frontend pages.
