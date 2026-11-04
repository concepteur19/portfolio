// Project registry. To add a project:
// 1. create src/content/projects/<id>/index.ts (and its images) following the existing fiches;
// 2. import it below and add one line { file: "<id>/index.ts", data: <import> }.
// No display component needs to change.

export const projectEntries: { file: string; data: unknown }[] = [];
