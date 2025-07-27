export default function Footer() {
  const currentYear = new Date().getFullYear()
  const appName = import.meta.env.VITE_APP_NAME || "FitTrack"
  const appVersion = import.meta.env.VITE_APP_VERSION || "1.0.0"

  return (
    <footer className="dashboard-footer">
      <p>
        &copy; {currentYear} {appName} v{appVersion}. All rights reserved.
      </p>
    </footer>
  )
}
