import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'
import { Faq } from '@/features/wedding/home'

const Questions = () => {
  useTitle('Wedding - FAQs')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 px-4 py-4">
      <header className="flex flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          FAQs
        </h1>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-center gap-4">
        <Faq question="Where is the wedding ceremony? Where is the reception?">
          <span>
            Both the ceremony and reception will be held at the{' '}
            <a
              href="https://maps.app.goo.gl/spCYqVi7Gh2L8tyj6"
              className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
              target="_blank"
            >
              Sky Valley Chateau
            </a>{' '}
            in Steamboat Springs, Colorado.
          </span>
        </Faq>

        <Faq
          question="What is the venue like?"
          answer='The Sky Valley Chateau (AKA "The Lodge") is a 10-bedroom, 10-bathroom VRBO property that hosts smaller weddings and other events. It used to be a true bed-and-breakfast lodge, but was recently renovated and turned into a single rentable property.'
        />

        <Faq question="What time is ... ?">
          <span>Please see the </span>
          <Link to="/wedding/events">
            <a className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline">
              Wedding Events
            </a>
          </Link>
          <span> page for a full schedule of events.</span>
        </Faq>

        <Faq question="What are the lodging options? Is there a hotel block?">
          <ul className="flex flex-col gap-2">
            <li>
              We do not have a hotel block, but there are a variety of hotels in
              Steamboat Springs. For guests that are not staying at the lodge we
              are providing a shuttle to and from the venue for the ceremony and
              reception. This is a requirement of our contract with the venue,
              so please don't get us yelled at by the venue owners – Hilary
              isn't a big rule-breaker. Please plan on taking the shuttle.
            </li>
            <li>
              <span>Shuttle pick-up will be at the </span>
              <a
                href="https://maps.app.goo.gl/7MeWm1hKFoAAM5xy8"
                className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                target="_blank"
              >
                Residence Inn Steamboat Springs
              </a>
              <span>. We recommend staying here or nearby.</span>
            </li>
            <li>
              If you're staying at the lodge, then you're all set for the nights
              you RSVP'd for!
            </li>
          </ul>
        </Faq>

        <Faq question="How do I get to the wedding venue?">
          <ul className="flex flex-col gap-2">
            <li>
              <span>
                The address is{' '}
                <a
                  href="https://maps.app.goo.gl/spCYqVi7Gh2L8tyj6"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  33790 Sky Valley Dr, Steamboat Springs, CO 80487
                </a>
              </span>
            </li>
            <li>
              <span className="font-semibold">PLEASE NOTE: </span>There is a
              mandatory shuttle on the day of the wedding. You will not be able
              to drive yourself to the venue for the ceremony or the reception.
            </li>
            <li>
              We recommend downloading the area in Google Maps for offline use.
              Cell reception can be poor once you're in the mountains.
            </li>
            <li>
              For out-of-state guests, we recommend flying into Denver
              International Airport (DEN) and renting a car. You can also fly to
              Steamboat Springs directly, but it's more expensive and you're
              likely to have a layover in Denver anyway.
            </li>
          </ul>
        </Faq>

        <Faq
          question="Is there a shuttle to the venue for the wedding if I'm staying in Steamboat Springs?"
          answer="We have arranged a mandatory shuttle to and from the venue for the wedding ceremony and reception on Saturday. Please see the wedding events page for pick-up and drop off times. There are also taxis and ride-sharing services in Steamboat Springs, but you will need to arrange that ahead of time."
        />

        <Faq
          question="Is there a shuttle for the Welcome Party on Friday or on other days?"
          answer="No. Please drive yourself to and from the venue on any day except for Saturday, October 11."
        />

        <Faq
          question="How long does it take to drive from Denver to Steamboat?"
          answer={[
            "Depends on the weather, traffic in Denver, where you're leaving from, I-70 traffic, construction, etc., but it's about 3 hours from DEN to the lodge in ideal conditions. You should give yourself 4 hours to be safe.",
            "There is a more scenic route through Rocky Mountain National Park, if you're coming from Denver, called Trail Ridge Road. We highly recommend doing this drive, but it takes some planning. I'd give yourself most of the day to complete the drive (6 hours or so) to accommodate traffic and stops for photos. You'll also need to get a timed entry permit for this.",
            'You may also want to consider taking Berthoud or Loveland passes as alternative scenic routes.',
          ]}
        />

        <Faq
          question="Can I carpool with you?"
          answer="No (our car is going to be full) but we can probably pair you up with friends or family who are driving up!"
        />

        <Faq
          question="Can I come hang out at the lodge if I'm not staying there?"
          answer={[
            'Yes! All guests are welcome at the lodge until 10pm each night!',
            "We'd love to have you come hang out with us throughout the weekend. Come enjoy all of the fun things at the lodge like the pool table, foosball table, hot tub, fire pit, and the many hangout spots on the property.",
          ]}
        />

        <Faq
          question="What is the dress code?"
          answer={[
            'Wedding ceremony and reception: Semi-formal or Cocktail attire.',
            'There is no dress code for any other events.',
            'Bring a warm layer even if it looks like it will be warm during the day. It cools down quickly after sunset.',
          ]}
        />

        <Faq
          question="Should I bring my bathing suit?"
          answer="Yes - there's a 16-person hot tub at the lodge and we're definitely going to use it."
        ></Faq>

        <Faq
          question="What's the elevation of the wedding venue? Should I do anything to avoid elevation sickness?"
          answer={[
            'The wedding venue is at about 7,800ft',
            'You should drink a lot of water (3-4 large bottles per day) when you get to Colorado.',
            'You should not drink too much alcohol your first night at elevation.',
          ]}
        />

        <Faq
          question="What's the weather going to be like?"
          answer={[
            "Hard to say! Colorado really loves to surprise you. In October, it's usually mild during the day, highs in the 60s and sunny, with rain less likely. Check the weather leading up to the weekend, and plan on bringing something warm for when the sun goes down.",
            'Please note: It could be anything from mid-70s and sunny to a mild rain shower to a full-on snowstorm.',
          ]}
        />

        <Faq
          question="Will the wedding be indoors or outdoors?"
          answer={[
            'We plan on having the ceremony and dinner outside, unless the weather prohibits it.',
            'Guests will be able to use the indoor and outdoor space throughout the wedding weekend.',
            "We'll have blankets and one (1) gas fire pit for hanging out outside.",
          ]}
        />

        <Faq question="Do you have a registry?">
          <ul className="flex flex-col gap-2">
            <li>
              We're incredibly grateful to be able to celebrate our marriage
              with you for the weekend, so please don't feel obligated to
              purchase us a gift. Your time and presence is all we want.
            </li>
            <li>
              <span>
                If you still want to give us a wedding gift, then we do have a{' '}
                <a
                  href="https://www.crateandbarrel.com/gift-registry/registrant-list/7344128"
                  className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
                  target="_blank"
                >
                  wedding registry
                </a>{' '}
                at Crate & Barrel.
              </span>
            </li>
          </ul>
        </Faq>

        <Faq
          question="Can I bring a plus one?"
          answer={[
            'Your RSVP should list the names of the invited guests. No other plus ones are invited.',
            'Guests with babies named Ellie or Ava: your baby is welcome to attend too :)',
          ]}
        />

        <Faq
          question="Can I update my RSVP?"
          answer="Sure - just text Matt with your new RSVP status."
        />

        <Faq
          question="I'm staying at the lodge - what's the plan for food and drinks? Can I bring something?"
          answer={[
            "We've got food covered for the whole weekend. You won't go hungry or thirsty – we promise!",
            "If there's something you'd really like to have, then please get in touch! We'll try to find a way to incorporate it.",
            "If you would still like to contribute, please coordinate with Hilary & Matt before bringing anything to the lodge. We'd especially love if you want to contribute to beverages during the non-wedding part of the weekend. We'll cover drinks for Friday's Welcome Party and the reception on Saturday, but for other activities, we'd be happy if you wanted to pitch in!",
          ]}
        />

        <Faq
          question="Should I bring my bathing suit?"
          answer="Yes - there's a 16-person hot tub at the lodge and we're definitely going to use it."
        />

        <Faq
          question="I have an allergy or dietary restriction?"
          answer="
            'We gotcha. The RSVP form has a place to tell us about allergies. You can also text Hilary or Matt about your dietary concerns and we'll make sure to handle it."
        />

        <Faq question="Where can I find X in Steamboat?">
          <span>Please see the </span>
          <Link to="/wedding/events">
            <a className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline">
              Things to Do
            </a>
          </Link>
          <span> page for our suggestions of activities near Steamboat.</span>
        </Faq>

        <Faq question="I want to see Rocky Mountain National Park - how do permits work?">
          This is complicated. You should check out the park's{' '}
          <a
            className="text-primary cursor-pointer font-semibold underline-offset-2 hover:underline"
            href="https://www.nps.gov/romo/planyourvisit/timed-entry-permit-system.htm"
            target="_blank"
          >
            Timed Entry Permit System
          </a>{' '}
          page for more info on this.
        </Faq>

        <Faq
          question="Where should we go hiking? Is there good fall color anywhere we should check out?"
          answer="We'd love to suggest some trails, just text us! We also recommend using the AllTrails app to find all kinds of hikes. It really depends how much time/effort you want to spend out there and where you're coming from."
        />

        <Faq
          question="This part of the website it broken"
          answer="Text Matt about it. My bad. Also that's not a question.  Seems like we're both in the wrong here."
        />

        <Faq
          question="Why did you make your own website? Do you know about Zola or The Knot? Someone already built all of this you know."
          answer="What can I say? It seemed like a good idea at the time :)"
        />

        <Faq
          question="What's the best way to reach you guys?"
          answer={['Hilary: 309-507-0265', 'Matt: 608-333-5761']}
        />
      </main>

      <footer>
        <Link to="/wedding">
          <Button variant="link">Home</Button>
        </Link>
      </footer>
    </div>
  )
}

export default Questions
