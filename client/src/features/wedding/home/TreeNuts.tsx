import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'

const TreeNuts = () => {
  useTitle('Wedding - Tree Nuts')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 px-6 py-4">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          The Tree Nut
        </h1>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-start gap-12">
        <section className="flex w-full flex-col gap-8">
          <p className="w-full">
            Since time immemorial, the humble tree nut has been a favorite food
            of all of God's critters: the squirrel with his stash of walnuts for
            the long winter ahead; the nuthatch, with his powerful beak, cracks
            open the fleshy sustenance of the... uh, probably also a walnut; The
            groom and his beloved candied pecans of long, long ago...
          </p>

          <p className="w-full">
            All of His critters have delighted in the tree nut. All, that is,
            except for one:
            <span className="font-birthstone text-primary flex w-full flex-col items-center pt-8 text-5xl">
              The Bride
            </span>
          </p>
        </section>

        <hr className="border-primary w-full border" />

        <section className="flex w-full flex-col gap-8">
          <p className="w-full">
            Due to her severe tree nut allergy and her very important role in
            the wedding:
            <span className="text-primary flex w-full flex-col items-center pt-8 text-center text-2xl">
              Please: Do not bring tree nuts to the wedding venue.
            </span>
          </p>

          <p className="w-full">
            We kindly ask that you let us feed you and leave all your nutty
            treats at home.
          </p>

          <p className="w-full">
            If you are going to bring <span className="font-semibold">any</span>{' '}
            food to the lodge, please read the nutritional facts and allergens
            list first, and reach out to Hilary with any concerns you might
            have.
          </p>

          <p className="w-full">
            And even though there is a wood-burning fireplace at the lodge,
            please do not roast your chestnuts over the open fire.
          </p>
        </section>

        <hr className="border-primary w-full border" />

        <section className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-2">
            <span className="">Here's a list of tree nuts:</span>
            <ul className="flex list-disc flex-col gap-2 px-4 text-sm">
              <li>Almonds</li>
              <li>Walnuts</li>
              <li>Pistachios</li>
              <li>Pecans</li>
              <li>Cashews</li>
              <li>Hazelnuts</li>
              <li>Chestnuts</li>
              <li>Brazil nuts</li>
              <li>Macadamia nuts</li>
              <li>Pine nuts</li>
            </ul>
          </div>

          <div className="flex w-full flex-col gap-2">
            <span className="">
              And here's a list of common nut-containing products:
            </span>
            <ul className="flex list-disc flex-col gap-2 px-4 text-sm">
              <li>Almond milk (and other nut milks)</li>
              <li>Almond flour (macarons, cupcakes)</li>
              <li>Almond extract</li>
              <li>Granola / granola bars</li>
              <li>Bread</li>
              <li>Nutella or chocolate from Europe (hazelnuts / hazelnusse)</li>
              <li>Candy bars with nuts (Heath, Toblerone)</li>
              <li>
                Homemade desserts (cross-contamination is the big concern here,
                even if the dessert doesn't have nuts in it)
              </li>
            </ul>
          </div>

          <div className="flex w-full flex-col gap-2">
            <span className="">
              And here's a list of things that are not tree nuts:
            </span>
            <ul className="flex list-disc flex-col gap-2 px-4 text-sm">
              <li>Peanuts (it's a legume)</li>
              <li>Coconuts (it's a fruit)</li>
              <li>Nutmeg (it's a spice, from the seeds of a tropical tree)</li>
              <li>Sesame, pumpkin, sunflower seeds (they're... seeds!)</li>
              <li>
                Garbanzo beans, Chickpeas (they're beans, but people get
                confused on this one sometimes)
              </li>
              <li className="hidden" aria-hidden="true">
                Deez nuts (boffa)
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="pb-2">
        <Link to="/wedding">
          <Button variant="link">Home</Button>
        </Link>
      </footer>
    </div>
  )
}

export default TreeNuts
