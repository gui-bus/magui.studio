import { ImageResponse } from "next/og"

import { siteConfig } from "@/src/config/site"

export const runtime = "edge"

export async function GET(req: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") || siteConfig.name
  const description = searchParams.get("description") || siteConfig.shortName

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #18181b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181b 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#6366f1",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          {siteConfig.shortName}
        </div>
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "30px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#a1a1aa",
            maxWidth: "800px",
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "60px",
          display: "flex",
          alignItems: "center",
          color: "#71717a",
          fontSize: "24px",
        }}
      >
        {siteConfig.url}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
