export type ClubEvent = {
  slug: "corporate" | "weddings" | "private" | "birthday" | "custom" | "government";
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
    lede: "A company hires us when someone has to be accountable for the room, the run of show, and the way people get there. We work from Lahore and Islamabad. The event can be in either city, in a farmhouse on the edge of one, or up in the Galiyat and Swat when the point of leaving is the leaving.",
    image: "/images/event-keynote.jpg",
    imageAlt: "A speaker on stage in front of a lit audience",
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
    image: "/images/event-stage.jpg",
    imageAlt: "A floral wedding stage under chandeliers",
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
      "Anniversaries, small dinners and family days, in Lahore or just far enough north to feel away. Birthdays have their own page. This one is for the gatherings that are still just the people in the room.",
    lede: "Private, here, means the guest list has a reason and the room is built around that reason. A birthday is planned on the birthday page. An anniversary dinner is not a decor project unless the decor is the gift. We start from the people and the hour.",
    image: "/images/event-banquet.jpg",
    imageAlt: "A banquet hall of round tables under chandeliers",
    suits: ["Anniversaries", "Family lunches", "A dinner that needs a room, not a restaurant queue", "A gathering that is not a wedding, a birthday, or an office"],
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
  {
    slug: "birthday",
    title: "Birthday events",
    nav: "Birthdays",
    summary:
      "Birthday events in Lahore or Islamabad, from a dinner table to a house full of family. The plan starts with who is coming and what the hour is for, not with a stage.",
    lede: "A birthday here is the guest list and the room, sized to the person. A dinner for twelve is not planned like a hall for two hundred. If the day also wants a night in the hills, that travel is written beside the event, not hidden inside a decoration quote.",
    image: "/images/event-birthday.jpg",
    imageAlt: "A balloon arch and dessert table set for a birthday",
    suits: ["A family birthday", "A milestone dinner", "A children's afternoon with a real end time", "A party that should stay in one house"],
    handles: [
      "The room or the house",
      "Food, if you want it handled",
      "The run of the afternoon or the evening, including when it actually ends",
    ],
    leaves: [
      "We do not add a cold spark fountain because a birthday is assumed to need one.",
      "We do not treat a child's party and a fiftieth dinner as the same brief.",
    ],
    sections: [
      {
        heading: "Start with the person",
        body: "Tell us the age, the city, and whether the guests are family, friends, or both. A round number of people is less useful than knowing that the grandparents stay for dinner and the cousins leave after cake.",
      },
      {
        heading: "Lahore, Islamabad, or a night away",
        body: "Most birthdays stay in the city of the head office or the branch: Lahore or Islamabad. A night in the Galiyat or Swat is possible when the guest list can travel. The event form carries the party. If the cars need their own plan, we say so.",
      },
      {
        heading: "What the reply covers",
        body: "You get your answers back by email, and so does the desk. The next note is a direction: room, food, and what we are not doing. Nothing is booked from the form.",
      },
    ],
  },
  {
    slug: "custom",
    title: "Custom events",
    nav: "Custom",
    summary:
      "Custom events for occasions that are not a wedding, a birthday, a company offsite, or a government office. You describe the hour. We write the plan.",
    lede: "Some gatherings do not fit a category, and forcing them into one produces the wrong questions. A farewell, a mehfil, a product sitting with family in the room, a dinner that is also an announcement: those come through the custom brief. The form is the same length as the others. The notes field is where the real event lives.",
    image: "/images/event-floral-hall.jpg",
    imageAlt: "A hall dressed with a hanging floral installation",
    suits: ["A farewell or a welcome", "A family announcement", "A dinner with a purpose and no standard name", "An occasion that mixes hosts who do not share one office"],
    handles: [
      "A shape for the event after we have read what it actually is",
      "Venue, food, and the order of the hour",
      "Travel if the custom event leaves the city",
    ],
    leaves: [
      "We do not rename your event to match a package we already sell.",
      "We do not invent a theme you did not ask for.",
    ],
    sections: [
      {
        heading: "Use the notes",
        body: "Choose Custom event on the planner and write the thing a dropdown cannot hold. Who speaks, who must be seated together, what would make the evening a failure. That paragraph is the brief.",
      },
      {
        heading: "Still a written plan",
        body: "Custom does not mean open-ended spending. You still get a direction by email before anyone is booked: what the room is, what is in it, and what we are refusing. You approve that, or you change it.",
      },
    ],
  },
  {
    slug: "government",
    title: "Government office events",
    nav: "Government",
    summary:
      "Government office events: briefings, inaugurations, and official programmes that need a room, a run of show, and a host who is on time. Protocol is part of the plan, not a decoration added at the door.",
    lede: "An office event fails when the sequence is vague. Who enters, who speaks, where the press stands, and when the room is clear again are the work. We plan those hours in Lahore or Islamabad. We do not describe a stock photograph of a hall as one of these programmes.",
    image: "/images/event-formal-hall.jpg",
    imageAlt: "A formal hall set with round tables and a screen",
    suits: ["Briefings and seminars", "Inaugurations", "Official dinners", "A programme with a fixed order of speakers"],
    handles: [
      "The room against the real headcount and the protocol",
      "Run of show, staging, and one person accountable on the day",
      "Coordination with the office's own staff rather than around them",
    ],
    leaves: [
      "We do not claim a government contract the desk has not been given.",
      "We do not publish attendance figures or awards.",
    ],
    sections: [
      {
        heading: "The order is the event",
        body: "Send the date, the office, the guest count, and the order of the programme if you already have one. If you do not, say what must happen and what must not. A briefing and an inauguration are not staffed the same way.",
      },
      {
        heading: "Where we work",
        body: "The head office is in Lahore and the branch is in Islamabad, and government office events are planned from those two cities. If the programme is outside either, the travel is part of the brief, not an assumption.",
      },
      {
        heading: "Approval before booking",
        body: "The form emails every field to the desk and a copy to you. The reply is a direction. Rooms and suppliers are held only after that direction is the one you want.",
      },
    ],
  },
];

export function getEvents() {
  const order = ["weddings", "birthday", "corporate", "custom", "government", "private"] as const;
  return [...events].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}
