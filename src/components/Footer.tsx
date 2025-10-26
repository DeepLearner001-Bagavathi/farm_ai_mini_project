export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex items-center justify-center h-16">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TN Agri Mitra. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
        </p>
      </div>
    </footer>
  );
}
