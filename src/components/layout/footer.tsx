import Link from 'next/link'

const footerLinks = {
  store: [
    { label: 'Snacks', href: '/store/snacks' },
    { label: 'Drinks', href: '/store/drinks' },
    { label: 'Energy', href: '/store/energy' },
    { label: 'Trends', href: '/store/trends' },
  ],
  b2b: [
    { label: 'Products', href: '/b2b/products' },
    { label: 'Register', href: '/b2b/register' },
    { label: 'Login', href: '/b2b/login' },
  ],
  machines: [
    { label: 'Snack Machines', href: '/machines/snack' },
    { label: 'Drink Machines', href: '/machines/drink' },
    { label: 'Combi Machines', href: '/machines/combi' },
    { label: 'Smart Cooler', href: '/machines/smart-cooler' },
    { label: 'Payment Systems', href: '/machines/payment-systems' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Locations', href: '/locations' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Store */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-primary">
              SCHNAPPIX Store
            </h3>
            <ul className="space-y-2">
              {footerLinks.store.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* B2B */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-primary">
              B2B Wholesale
            </h3>
            <ul className="space-y-2">
              {footerLinks.b2b.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Machines */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-primary">
              Vending Machines
            </h3>
            <ul className="space-y-2">
              {footerLinks.machines.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-primary">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SCHNAPPIX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

