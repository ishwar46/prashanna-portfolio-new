import { ImageResponse } from "next/og";

export const alt = "Prashanna Sangroula - Mortgage Loan Officer & Realtor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1f4e",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Prashanna Sangroula
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 24,
              gap: 16,
            }}
          >
            <div
              style={{
                width: 60,
                height: 2,
                backgroundColor: "#c4a535",
              }}
            />
            <div
              style={{
                fontSize: 28,
                color: "#c4a535",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Mortgage Loan Officer | Realtor
            </div>
            <div
              style={{
                width: 60,
                height: 2,
                backgroundColor: "#c4a535",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#d1d5db",
            }}
          >
            (571) 222-5555
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#9ca3af",
            }}
          >
            NMLS #2528620
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
