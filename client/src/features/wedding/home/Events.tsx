import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'

const Events = () => {
  useTitle('Wedding - Events')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 px-6 py-4">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          Weekend Events
        </h1>
        <aside>
          All events are at{' '}
          <a
            className="text-primary text-primary font-semibold underline-offset-2 hover:underline"
            href="https://maps.app.goo.gl/Vhj2q61LGrpQNjSE8"
            target="_blank"
          >
            Sky Valley Chateau
          </a>{' '}
          (aka "the lodge") unless otherwise noted.
        </aside>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-start gap-12">
        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Thursday - Arrival
            </h2>
            <h3 className="font-birthstone text-center text-2xl text-neutral-500">
              October 9<sup className="ml-1">th</sup> 2025
            </h3>
          </section>

          <section className="flex flex-col gap-2">
            <p>
              <span className="text-primary font-semibold">3pm:</span> Check-in
              at Sky Valley Chateau.
            </p>
            <p>
              <span className="text-primary font-semibold">6pm:</span> Eat
              dinner out in Steamboat, then hang out at the lodge.
            </p>
            <p>
              If you're in town already, let us know! You're welcome to join us
              for dinner or just come hang out at the lodge with us.
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Friday - Welcome Party
            </h2>
            <h3 className="font-birthstone text-center text-2xl text-neutral-500">
              October 10<sup className="ml-1">th</sup> 2025
            </h3>
          </section>

          <section className="flex flex-col gap-2">
            <p>
              <span className="text-primary font-semibold">Time:</span> 3pm to
              10pm
            </p>
            <p>
              <span className="text-primary font-semibold">Attire:</span> Casual
            </p>
            <p>
              <span className="text-primary font-semibold">Details:</span> Come
              kick off the weekend with tacos and drinks at the lodge. There
              will be an assortment of meat, vegan, and gluten-free dinner
              options. We'll be serving up Matt's Margaritas™ and a variety of
              other alcoholic and NA beverages. This will be a very casual
              evening, so feel free to swing by as it fits your schedule. Bring
              a swimsuit if you want to use the hot tub! Please note that a
              shuttle will not be provided.
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Saturday - Wedding Day!
            </h2>
            <h3 className="font-birthstone text-center text-2xl text-neutral-500">
              October 11<sup className="ml-1">th</sup> 2025
            </h3>
          </section>

          <section className="flex flex-col gap-2">
            <p>
              <span className="text-primary font-semibold">Attire:</span>{' '}
              Semi-formal or Cocktail
            </p>
            <p>
              <span className="text-primary font-semibold">Details:</span>
              <ul className="flex w-full flex-col gap-1 pt-2">
                <li>
                  <span className="inline-block w-20">6:00am</span>Group run for
                  anyone who wants to join!
                </li>
                <li>
                  <span className="inline-block w-20">1:00pm</span>Shuttle
                  pickup in town at the{' '}
                  <a
                    className="text-primary text-primary font-semibold underline-offset-2 hover:underline"
                    href="https://maps.app.goo.gl/uobUuCu8N18rNNVi7"
                    target="_blank"
                  >
                    Residence Inn Steamboat Springs
                  </a>
                </li>
                <li>
                  <span className="inline-block w-20">1:20pm</span>Shuttle
                  arrives at Sky Valley Chateau
                </li>
                <li>
                  <span className="inline-block w-20">2:00pm</span>Ceremony on
                  the lawn
                </li>
                <li>
                  <span className="inline-block w-20">2:30pm</span>Pictures with
                  all guests
                </li>
                <li>
                  <span className="inline-block w-20">3:00pm</span>Cocktail hour
                </li>
                <li>
                  <span className="inline-block w-20">4:30pm</span>Seated for
                  dinner
                </li>
                <li>
                  <span className="inline-block w-20">4:40pm</span>Champagne
                  toasts
                </li>
                <li>
                  <span className="inline-block w-20">5:00pm</span>Dinner
                </li>
                <li>
                  <span className="inline-block w-20">6:00pm</span>Reception
                </li>
                <li>
                  <span className="inline-block w-20">9:45pm</span>Shuttle
                  arrives
                </li>
                <li>
                  <span className="inline-block w-20">10:00pm</span>Shuttle
                  departs - all non-lodging guests must depart
                </li>
                <li>
                  <span className="inline-block w-20">10:15pm</span>Shuttle
                  arrives back at the{' '}
                  <a
                    className="text-primary text-primary font-semibold underline-offset-2 hover:underline"
                    href="https://maps.app.goo.gl/uobUuCu8N18rNNVi7"
                    target="_blank"
                  >
                    Residence Inn Steamboat Springs
                  </a>
                </li>
              </ul>
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Sunday - Recovery
            </h2>
            <h3 className="font-birthstone text-center text-2xl text-neutral-500">
              October 12<sup className="ml-1">th</sup> 2025
            </h3>
          </section>

          <section className="flex flex-col gap-2">
            <p>
              <span className="text-primary font-semibold">11am:</span> Brunch
              at the lodge.
            </p>
            <p>
              <span className="text-primary font-semibold">2pm:</span> Visit{' '}
              <a
                className="text-primary text-primary font-semibold underline-offset-2 hover:underline"
                href="https://strawberryhotsprings.com/"
                target="_blank"
              >
                Strawberry Park Hot Springs
              </a>
            </p>
            <p>
              <span className="text-primary font-semibold">Details:</span> We'll
              be hanging out at the hot springs for a couple of hours. If you'd
              like to join, we'll be scheduling a shuttle for all of us to go in
              one group - more details to come.{' '}
              <span className="text-primary font-semibold">
                Please text Hilary and Matt to RSVP.
              </span>
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col items-center pb-4">
          <Link to="/wedding">
            <Button variant="link">Wedding Home</Button>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Events
