"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function StudioClient() {
  "use no memo";

  return <NextStudio config={config} />;
}
