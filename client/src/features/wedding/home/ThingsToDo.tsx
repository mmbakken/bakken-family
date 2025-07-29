import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'

const ThingsToDo = () => {
  useTitle('Wedding - Things to Do')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 px-6 py-4">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          Things to Do
        </h1>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-start gap-12">
        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Downtown Steamboat Springs
            </h2>
          </section>

          <section className="flex flex-col gap-4">
            <p>
              Steamboat Springs has a great downtown area. Take a stroll along
              Lincoln Ave (Hwy 40) and wander into the many shops. There are
              also plenty of restaurants and bars in the area.
            </p>
            <p>
              The Yampa River runs parallel to the main part of downtown
              Steamboat Springs. Check out the river trail while you're
              downtown.
            </p>
            <p>
              Visit the{' '}
              <a
                href="https://www.yampariverbotanicpark.org/visit/"
                className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                target="_blank"
              >
                Yampa River Botanic Park
              </a>
              .
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Hiking
            </h2>
          </section>

          <section className="flex flex-col gap-4">
            <p>
              We love hiking in Colorado, and Steamboat has many scenic trails
              to offer. Here's a few day hikes that we think look fun.
            </p>

            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/fish-creek-falls-trail"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Fish Creek Falls trail
                </a>
              </li>
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/fish-creek-falls-overlook-trail--2"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Fish Creek Falls overlook trail
                </a>
              </li>
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/spring-creek"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Spring Creek Trail / Spring Creek Pond
                </a>
              </li>
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/thunderhead-hiking-trail--3"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Thunderhead Hiking trail (Steamboat Ski Area hike)
                </a>
              </li>
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/flash-of-gold-trail"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Flash of Gold trail
                </a>
              </li>
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/rabbit-ears-peak-trail--3"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Rabbit Ears Peak trail
                </a>
              </li>
              <li>
                <a
                  href="https://www.alltrails.com/trail/us/colorado/ferndale-trail--2"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Ferndale trail - very close to the lodge!
                </a>
              </li>
            </ul>

            <p>
              If you're looking for other hikes around Colorado, let us know.
              We'd be happy to share our favorites in whatever part of the state
              you're visiting!
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Fall Color
            </h2>
          </section>

          <section className="flex flex-col gap-4">
            <p>
              In addition to hiking, there are many scenic drives in the area as
              well. Here's a few suggestions for general areas to explore. We've
              heard these are good areas to see some fall folliage, but haven't
              seen it for ourselves yet - let us know what you find! Make sure
              to check the road conditions before you head out, since not all of
              these roads are paved or accessible for 2WD cars.
            </p>

            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://maps.app.goo.gl/2yeAwsJBtPXyJoHYA"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Steamboat Lake State Park
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/tTPEtEvdLUuswANR9"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Pearl Lake State Park
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/prnXN6iY5S9JZSBH9"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Rabbit Ears Pass
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/t5iyiFoXN9Fe34cP6"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Buffalo Pass (rough dirt road to the top)
                </a>
              </li>
            </ul>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Rocky Mountain National Park
            </h2>
          </section>

          <section className="flex flex-col gap-4">
            <p>
              This one is further out from Steamboat Springs, but could be a fun
              stop on the way to Steamboat or on your way back to Denver. There
              are so many beautiful hikes as well as a scenic drive along Trail
              Ridge Road!
            </p>
            <p>
              Timed Entry permits (plus a park pass/entrance fee) are required
              if you are entering the park between 9am-2pm, but having an entry
              permit does not guarantee you will find parking. Timed Entry
              permits for the weekend of our wedding will be available for a $2
              fee starting at **8am MDT on September 1, 2025**. Check out the
              park's{' '}
              <a
                href="https://www.nps.gov/romo/planyourvisit/timed-entry-permit-system.htm"
                className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                target="_blank"
              >
                Timed Entry Permit System
              </a>{' '}
              page for more information.
            </p>
          </section>
        </section>

        <section className="flex w-full flex-col gap-4">
          <section className="flex w-full flex-col items-center">
            <h2 className="font-birthstone text-primary text-center text-4xl">
              Cycling
            </h2>
          </section>

          <section className="flex flex-col gap-4">
            <p>
              Yampa Valley Core Trail: 7.5-mile paved multi-use trail that runs
              through the heart of Steamboat Springs and along the Yampa River.
            </p>
            <p>
              There are also many mountain biking trails in the Steamboat area.
              Admittedly, we're not big mountain bikers, so look into this more
              if you're interested.
            </p>
          </section>
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

export default ThingsToDo
