import { NextResponse, after, type NextRequest } from "next/server";

import { buildTrackedHref } from "@/lib/tracking/build-href";
import {
  extractTrackingParams,
  SHORT_LINK_SOURCE,
} from "@/lib/tracking/params";
import { sendConversionEvent } from "@/lib/meta-conversions";
import { hasMarketingConsent } from "@/lib/consent/server";
import { getLinkByShortSlug } from "@/sanity/lib/queries";

function clientIpFrom(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");

  if (!forwarded) {
    return request.headers.get("x-real-ip");
  }

  const parts = forwarded.split(",").map((part) => part.trim());
  return parts[parts.length - 1] || null;
}

function fbcFrom(fbclid: string | undefined, cookieFbc: string | undefined) {
  if (cookieFbc) {
    return cookieFbc;
  }
  if (!fbclid) {
    return undefined;
  }
  return `fb.1.${Date.now()}.${fbclid}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const link = await getLinkByShortSlug(slug);

  if (!link) {
    return NextResponse.redirect(new URL("/links", request.url), 307);
  }

  const trackingParams = extractTrackingParams(request.nextUrl.searchParams);
  const destination = buildTrackedHref(link.href, trackingParams, link.utmContent, {
    defaultSource: SHORT_LINK_SOURCE,
  });

  const eventPayload = {
    eventName: link.trackingEvent ?? "ClickLink",
    eventId: crypto.randomUUID(),
    eventSourceUrl: request.url,
    userAgent: request.headers.get("user-agent"),
    clientIp: clientIpFrom(request),
    fbc: fbcFrom(trackingParams.fbclid, request.cookies.get("_fbc")?.value),
    fbp: request.cookies.get("_fbp")?.value,
    customData: { link_label: link.label, short_slug: slug },
  };

  if (hasMarketingConsent(request)) {
    after(() => sendConversionEvent(eventPayload));
  }

  const isNonBrowsableScheme = /^(mailto:|tel:)/i.test(destination);

  if (isNonBrowsableScheme) {
    return NextResponse.redirect(new URL("/links", request.url), 307);
  }

  try {
    const destinationUrl = new URL(destination, request.url);
    return NextResponse.redirect(destinationUrl, 307);
  } catch {
    return NextResponse.redirect(new URL("/links", request.url), 307);
  }
}
