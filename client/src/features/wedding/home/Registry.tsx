import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'

const Registry = () => {
  useTitle('Wedding - Registry')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 px-6 py-4">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          Registry
        </h1>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-start gap-8">
        <p>
          We're incredibly grateful to be able to celebrate our marriage with
          you, so please don't feel obligated to purchase us a gift. Your time
          and presence is all we want.
        </p>
        <p>
          <span>
            If you still want to give us a wedding gift, please see our{' '}
            <a
              href="https://www.crateandbarrel.com/gift-registry/matthew-bakken-and-hilary-lohman/r7344128"
              className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
              target="_blank"
            >
              wedding registry
            </a>{' '}
            at Crate & Barrel.
          </span>
        </p>
      </main>

      <footer className="pb-2">
        <Link to="/wedding">
          <Button variant="link" className="text-base">
            Home
          </Button>
        </Link>
      </footer>
    </div>
  )
}

export default Registry
