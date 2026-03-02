import "./globals.css";

export const metadata = {
  title: "UNILAG Campus Map — Navigate the University of Lagos",
  description:
    "Interactive digital map of the University of Lagos (UNILAG) campus. Find faculties, hostels, libraries, and get walking directions.",
  keywords: ["UNILAG", "University of Lagos", "campus map", "navigation", "Akoka"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
