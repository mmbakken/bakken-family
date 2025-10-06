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
            className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
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
            <div>
              <span className="text-primary font-semibold">Details:</span>
              <ul className="flex w-full flex-col gap-1 pt-2">
                <li>
                  <span className="inline-block w-20">6:00am</span>Group run for
                  anyone who wants to join!
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
                  <span className="inline-block w-20">2:45pm</span>Cocktail hour
                </li>
                <li>
                  <span className="inline-block w-20">4:45pm</span>Champagne
                  toast
                </li>
                <li>
                  <span className="inline-block w-20">5:00pm</span>Dinner
                </li>
                <li>
                  <span className="inline-block w-20">6:00pm</span>Reception
                </li>
                <li>
                  <span className="inline-block w-20">10:00pm</span>Reception
                  ends. Non-lodging guests must start to leave at this time.
                </li>
              </ul>
            </div>
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
              <span className="text-primary font-semibold">Details:</span> We'll
              be hanging out at{' '}
              <a
                className="text-primary font-semibold underline-offset-2 hover:underline"
                href="https://strawberryhotsprings.com/"
                target="_blank"
              >
                Strawberry Park Hot Springs
              </a>{' '}
              for a couple of hours. If you RSVP'd to this (via the Google Form
              we sent out) then we have your spot saved.
            </p>
            <p>
              <span className="text-primary font-semibold">1:00pm:</span>{' '}
              Shuttle departs the lodge for the hot springs.
            </p>
            <p>
              <span className="text-primary font-semibold">1:30pm:</span> Arrive
              at the hot springs.
            </p>
            <p>
              <span className="text-primary font-semibold">3:30pm:</span>{' '}
              Shuttle departs the hot springs.
            </p>
            <p>
              <span className="text-primary font-semibold">4:00pm</span> Return
              back to the lodge.
            </p>
            <p>
              <span className="text-primary font-semibold">6:00pm</span> Sunday
              Dinner at the lodge.
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Monday - Farewell
            </h2>
            <h3 className="font-birthstone text-center text-2xl text-neutral-500">
              October 13<sup className="ml-1">th</sup> 2025
            </h3>
          </section>

          <section className="flex flex-col gap-2">
            <p>
              <span className="text-primary font-semibold">11am:</span> Check
              out of Sky Valley Chateau.
            </p>
          </section>
        </section>

        <footer className="flex w-full flex-col items-center pb-2">
          <Link to="/wedding">
            <Button variant="link">Home</Button>
          </Link>
        </footer>
      </main>
    </div>
  )
}

export default Events
