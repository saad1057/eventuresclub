export type ClubEvent = {
  slug: "corporate" | "weddings" | "private";
  title: string;
  nav: string;
  summary: string;
  lede: string;
  image: string;
  imageAlt: string;
  suits: string[];
  handles: string[];
  leaves: string[];
  sections: { heading: string; body: string }[];
};

export const events: ClubEvent[] = [
  {
    slug: "corporate",
    title: "Corporate events",
    nav: "Corporate",
    summary:
      "Offsites, dinners, launches and working sessions for Lahore teams, planned as one job rather than a stack of vendors. A northern offsite is possible. It is quoted as an event with travel attached, not as a sightseeing tour in a blazer.",
    lede: "A company hires us when someone has to be accountable for the room, the run of show, and the way people get there. We work from Lahore. The event can be in the city, in a farmhouse on the edge of it, or up in the Galiyat and Swat when the point of leaving is the leaving.",
    image: "/images/event-room.jpg",
    imageAlt: "Rows of chairs in a hall prepared for a talk",
    suits: [
      "Leadership offsites",
      "Client dinners",
      "Product and project launches",
      "Team days that should not feel like a school trip",
    ],
    handles: [
      "Venue shortlist against your headcount and the way you actually meet",
      "Run of show, suppliers, and one person who answers on the day",
      "Travel and rooms when the event leaves Lahore",
    ],
    leaves: [
      "We do not invent attendance numbers or awards.",
      "We do not sell a stage package you did not ask for.",
    ],
    sections: [
      {
        heading: "What the brief needs",
        body: "Date or a month, city, headcount, and whether people are there to work, to eat, or to be shown something. Budget can be a band. A blank cheque sounds generous and makes the plan worse. If the gathering is also a journey north, say how many hours of meeting you need. The road will take the rest.",
      },
      {
        heading: "Lahore, or the hills",
        body: "In the city we look at rooms that fit the number, the noise, and the hour you finish. A dinner for twenty is not planned like a hall for two hundred. In the Galiyat or Swat the constraint is the drive back. We will not schedule a 9 a.m. session after a Friday-night departure from Lahore unless you have slept on the ridge.",
      },
      {
        heading: "How the money is talked about",
        body: "The first reply is a shape: venue direction, what is in the room, what travel costs if any, and what we are not doing. You approve it before anyone is booked. This website does not take the payment. The invoice does, by transfer, once the plan is the plan you want.",
      },
      {
        heading: "After the email",
        body: "The form sends every answer to the desk and a copy to you. A person replies by email. If the date is impossible we say so, rather than holding a maybe. Corporate work shares nothing with the tour catalogue except the habit of writing things down.",
      },
    ],
  },
  {
    slug: "weddings",
    title: "Weddings",
    nav: "Weddings",
    summary:
      "Mehndi, barat, walima and nikah in Lahore, and the occasional nikah in the hills when the guest list can actually travel. We plan the day and the people getting to it. We do not pretend a meadow is simple because the photograph is.",
    lede: "A wedding is a sequence of rooms, meals and relatives. The useful work is unglamorous: which gate the cars use, when the food reaches the last table, who is holding the timeline when the photographer wants ten more minutes. That is the work. Flowers are part of it, not a substitute for it.",
    image: "/images/event-gathering.jpg",
    imageAlt: "Long tables dressed for a celebration",
    suits: ["Nikah", "Mehndi", "Barat and walima", "A small destination nikah"],
    handles: [
      "Venue and layout",
      "Guest flow, from arrival to the last car",
      "Coordination of décor, food and sound through people we already trust",
      "Travel and rooms for a hill nikah",
    ],
    leaves: [
      "We will not call a stock photograph one of our weddings.",
      "We will not take a mountain nikah for a hundred guests who all need to be back in Lahore the same night.",
    ],
    sections: [
      {
        heading: "Lahore first",
        body: "Most of this work is in the city and its farmhouses. Tell us the function, the season, and a honest guest count. A count that hides the cousins becomes a catering problem at 8 p.m. We would rather plan for the real number.",
      },
      {
        heading: "A nikah in the north",
        body: "Nathiagali, Swat or Hunza can hold a small ceremony. The limit is not the view. It is beds, road time, and weather. A nikah for twelve with a night on either side is a pleasure. A full barat transplanted to Karimabad is a different budget and a different week. The event planner is where that conversation starts, not the tour price list.",
      },
      {
        heading: "What you will be asked",
        body: "Date, city or 'help us find it', indoor or outdoor, guests, whether food is part of our job, and a budget band. Notes are for the thing that does not fit a field: a grandmother who should not climb, a family that wants the nikah quiet and the dinner loud, a colour you are tired of.",
      },
      {
        heading: "The reply",
        body: "You receive an email with your own answers repeated back, and so do we. The next email from us is a direction, not a contract. Nothing is held until you say the direction is right.",
      },
    ],
  },
  {
    slug: "private",
    title: "Private gatherings",
    nav: "Private",
    summary:
      "Birthdays, anniversaries, small dinners and family days, in Lahore or just far enough north to feel away. The same planner as a wedding, at a size where you can still hear the person beside you.",
    lede: "Private, here, means the guest list has a reason and the room is built around that reason. A fiftieth birthday is not a miniature wedding unless you want it to be. An anniversary dinner is not a decor project unless the decor is the gift. We start from the people and the hour.",
    image: "/images/event-table.jpg",
    imageAlt: "A dining table set for a long, unhurried meal",
    suits: ["Birthdays", "Anniversaries", "Family lunches", "A dinner that needs a room, not a restaurant queue"],
    handles: [
      "A room or a house for the number you actually have",
      "Food, if you want it handled",
      "A short northern escape when the gathering is also a trip",
    ],
    leaves: [
      "We do not add a stage, a cold spark fountain, or a hashtag.",
      "We do not take over a restaurant you already love. We will book it and leave the kitchen alone.",
    ],
    sections: [
      {
        heading: "Keep it small on purpose",
        body: "The useful range is a table of ten up to a house of eighty. Above that, the corporate or wedding desk is the better door, even if the occasion is personal. The forms are separate so the questions stay relevant.",
      },
      {
        heading: "Leaving the city",
        body: "A family day in the Galiyat, or two nights in Swat around a birthday, uses both sides of the club without mixing the paperwork. The event form carries the gathering. If the journey needs its own vehicle plan for a larger family, we will say so and open a tour brief beside it. You will not have to retype your name.",
      },
      {
        heading: "Budget without theatre",
        body: "Bands are there so we do not design a ceiling of flowers for a dinner that wanted a good table. If you are unsure, choose 'not sure yet' and write what the day is for. A clear purpose prices faster than a round number.",
      },
      {
        heading: "What happens next",
        body: "Submit the form. We email the desk every field, and we email you the same brief so you can see it left the browser. Reply on that thread. Phone is collected because plans change on the day, not because we prefer a call to a written note.",
      },
    ],
  },
];

export function getEvents() {
  return events;
}

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}
