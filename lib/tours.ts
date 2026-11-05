import { destinationLabel, type DestinationId } from "@/lib/options";

export type Tour = {
  slug: string;
  title: string;
  region: "Galiyat" | "Khyber Pakhtunkhwa" | "Gilgit-Baltistan";
  days: number;
  nights: number;
  priceFrom: number;
  season: string;
  altitude: string;
  destinationIds: DestinationId[];
  summary: string;
  lede: string;
  road: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  highlights: string[];
  itinerary: { title: string; body: string }[];
  included: string[];
  excluded: string[];
  goodToKnow: string[];
};

const baseIncluded = [
  "Private vehicle and driver from Lahore and back",
  "Standard hotel, twin or double share, on a breakfast basis",
  "Tolls, parking and the driver's stay",
  "A written plan before you leave, with the driving days named honestly",
];

const baseExcluded = [
  "Lunches and dinners",
  "Fort tickets, chairlifts and personal shopping",
  "Travel insurance and anything weather forces us to replace",
  "A second vehicle if the group no longer fits in one",
];

export const tours: Tour[] = [
  {
    slug: "galiyat-nathiagali",
    title: "Galiyat and Nathiagali",
    region: "Galiyat",
    days: 3,
    nights: 2,
    priceFrom: 38000,
    season: "March to November, and a quieter winter if you want snow",
    altitude: "Murree and Nathiagali sit around 2,000–2,500 metres. The walk toward Mushkpuri goes a little higher.",
    destinationIds: ["galiyat"],
    summary:
      "A three-day climb out of Lahore into the Galiyat: the Murree ridge, then Nathiagali's pine walks. Two nights, built as a first northern weekend rather than a long road. From PKR 38,000 a person for four travellers in a standard room.",
    lede: "This is the short northern trip. You leave Lahore after breakfast, gain the ridge by afternoon, and sleep where the mall noise drops away. It suits a family, a couple who want a test of the road, or a desk that needs two nights out of the city without a ten-hour drive.",
    road: "The Islamabad–Murree road is the whole difficulty. Fridays and public holidays stack the traffic. We leave Lahore early enough to clear the choke points, and we do not pretend a Sunday return is quick if the weather has turned the ridge to fog.",
    image: "/images/nathiagali.jpg",
    imageAlt: "A walker on a snowy slope at Nathiagali",
    gallery: [
      { src: "/images/pines.jpg", alt: "Pine forest with snow peaks beyond, in the hills of Pakistan" },
      { src: "/images/murree.jpg", alt: "A river and snow-dusted hills near Murree" },
      { src: "/images/pine-road.jpg", alt: "A sunny mountain road lined with pine in Khyber Pakhtunkhwa" },
    ],
    highlights: ["Nathiagali ridge walk", "Mushkpuri if the cloud lifts", "Murree only as a pass-through, not the point"],
    itinerary: [
      {
        title: "Day 1 — Lahore to the ridge",
        body: "Out of Lahore toward the motorway and up through the Galiyat. We stop once for tea where the air has actually changed, then settle in Nathiagali rather than on the Mall. The evening is a walk under the pines, not a checklist.",
      },
      {
        title: "Day 2 — Nathiagali on foot",
        body: "The pipeline track or the path toward Mushkpuri, chosen by weather and who is walking. Children and older parents get the ridge and the viewpoints. People who want the top get an early start and a turnaround time that still leaves daylight for the walk down.",
      },
      {
        title: "Day 3 — Back to Lahore",
        body: "A slow morning, then the descent. If Sunday traffic is stacked we take the earlier window. You are back in Lahore in time for a late dinner, unless fog has closed the upper road, in which case we say so before you are sitting in it.",
      },
    ],
    included: baseIncluded,
    excluded: baseExcluded,
    goodToKnow: [
      "Winter weekends are cold and often icy. Pack a real coat even if Lahore is warm.",
      "This price assumes four people. A couple pays more per person because the vehicle does not shrink.",
    ],
  },
  {
    slug: "naran-kaghan",
    title: "Naran and Kaghan",
    region: "Khyber Pakhtunkhwa",
    days: 3,
    nights: 2,
    priceFrom: 32000,
    season: "Late May to September, when Saif-ul-Malook and Babusar are usually open",
    altitude: "Naran is about 2,400 metres. The jeep to Saif-ul-Malook climbs toward 3,200 metres.",
    destinationIds: ["naran"],
    summary:
      "Three days from Lahore up the Kunhar to Naran, with the dawn jeep to Lake Saif-ul-Malook and a look toward Lulusar or Babusar if the pass is open. A fast weekend, from PKR 32,000 a person for a group of four in a standard hotel.",
    lede: "Naran in three days from Lahore is a sprint, and we describe it that way. Two of the days are mostly road. The middle day is the lake. People who want a softer pace should add a night. The published price is for the tight version, which is what most Lahore weekends actually are.",
    road: "You leave before dawn. Balakot to Kaghan is slow in July and August, and the jeep track to the lake has its own queue at sunrise. We book the jeep for the group rather than leaving you to negotiate it in the dark.",
    image: "/images/saif.jpg",
    imageAlt: "Lake Saif-ul-Malook with snow on the surrounding peaks",
    gallery: [
      { src: "/images/pines.jpg", alt: "Pines in front of a snow ridge on the way north" },
      { src: "/images/pine-road.jpg", alt: "Pine-lined mountain road in Khyber Pakhtunkhwa" },
      { src: "/images/murree.jpg", alt: "Hill river on the approach out of the plains" },
    ],
    highlights: ["Saif-ul-Malook at first light", "Lulusar if the day still has hours", "Babusar viewpoint only when the road is open"],
    itinerary: [
      {
        title: "Day 1 — Lahore to Naran",
        body: "A long day up the Kunhar. Breakfast is a roadside stop, not a hotel buffet. If the valley is moving slowly we sleep in Kaghan and finish the last stretch in the morning rather than driving a tired group into Naran after dark.",
      },
      {
        title: "Day 2 — The lake",
        body: "Jeep to Saif-ul-Malook before the track fills. Time at the water, then back to the valley. If everyone still has legs and the road is clear, the afternoon goes toward Lulusar. If not, the afternoon is rest. Both are a successful day.",
      },
      {
        title: "Day 3 — The pass, or the road home",
        body: "Babusar Top is a gift of the season, not a promise of the brochure. When it is open and the group wants it, we go up and turn around with enough daylight to reach Lahore at night. When it is shut, we start home earlier and do not invent a substitute spectacle.",
      },
    ],
    included: [...baseIncluded, "One jeep for the group to Saif-ul-Malook"],
    excluded: baseExcluded,
    goodToKnow: [
      "June to August is busy. September is kinder if your dates can move.",
      "The lake is cold even in July. A layer in the jeep bag matters more than another shirt.",
    ],
  },
  {
    slug: "swat-kalam",
    title: "Swat and Kalam",
    region: "Khyber Pakhtunkhwa",
    days: 4,
    nights: 3,
    priceFrom: 48000,
    season: "April to October",
    altitude: "Mingora is low. Kalam sits near 2,000 metres, and the Mahodand track climbs past that.",
    destinationIds: ["swat"],
    summary:
      "Four days from Lahore into Swat: Malam Jabba, the river road through Bahrain, and Kalam with a jeep toward Mahodand. Forest, water, and one proper mountain day. From PKR 48,000 a person, group of four, standard stay.",
    lede: "Swat is the green trip. You are in orchards before you are in pine, and the river stays beside the road for most of the way to Kalam. Four days is enough to sleep twice in the upper valley and still see Malam Jabba without turning the drive into a blur.",
    road: "The road from Mingora to Kalam is scenic and narrow. We do not stack Malam Jabba, Kalam and Mahodand into one day. That version exists on other sites. It is how people come home tired of a place they barely entered.",
    image: "/images/swat.jpg",
    imageAlt: "Green slopes and a high ridge in Swat Valley",
    gallery: [
      { src: "/images/kandol.jpg", alt: "Kandol Lake held in the mountains of upper Swat" },
      { src: "/images/pine-road.jpg", alt: "A pine road of the kind that climbs out of the Swat valley" },
      { src: "/images/hunza-traveler.jpg", alt: "A traveler paused at a high viewpoint" },
    ],
    highlights: ["Malam Jabba", "The Bahrain to Kalam river road", "Mahodand by jeep"],
    itinerary: [
      {
        title: "Day 1 — Lahore to Malam Jabba",
        body: "Across the plains and into Swat by afternoon. Malam Jabba is the first night's landscape: a chairlift if you want it, a walk if you do not. The hotel is chosen for sleep and a view, not for a lobby.",
      },
      {
        title: "Day 2 — Up the river to Kalam",
        body: "Madyan, Bahrain, and the narrowing valley. We stop where the water is worth getting out for, and we reach Kalam with daylight left. The town itself is a base. The point is the valley above it.",
      },
      {
        title: "Day 3 — Mahodand",
        body: "A jeep from Kalam toward Mahodand and the Ushu forest. The track is the day. If it is closed by weather or a local halt, we say so and walk the forest roads that are still open rather than sitting in a queue.",
      },
      {
        title: "Day 4 — Return to Lahore",
        body: "Down the same river in the morning light, then the long run home. A short stop in Fizagat or Mingora only if someone needs it. Lahore by night.",
      },
    ],
    included: [...baseIncluded, "Jeep from Kalam toward Mahodand for the group"],
    excluded: [...baseExcluded, "Malam Jabba chairlift tickets"],
    goodToKnow: [
      "July can be wet. The valley is still beautiful, and the jeep track is the first thing to close.",
      "Ask for a ground-floor room if anyone in the group struggles with hillside stairs.",
    ],
  },
  {
    slug: "kumrat-valley",
    title: "Kumrat Valley",
    region: "Khyber Pakhtunkhwa",
    days: 4,
    nights: 3,
    priceFrom: 52000,
    season: "May to early October",
    altitude: "The forest camp sits roughly between 2,400 and 3,000 metres. Jahaz Banda is a hike above that.",
    destinationIds: ["kumrat"],
    summary:
      "Four days through Dir into the deodar forest of Kumrat, with a jeep beyond the paved road and time for Kala Chashma or the Jahaz Banda trailhead. Quieter than Swat, rougher at the end. From PKR 52,000 a person for four.",
    lede: "Kumrat is for people who want forest more than a viewpoint with a tea stall. The last stretch is a jeep track under old deodars, and the night is darker and quieter than Kalam. It is not a luxury valley. The stay is simple on purpose, and the published price says so.",
    road: "Lahore to Dir is a full day. The jeep into Kumrat is arranged before you arrive, with a driver who uses that track, not a highway car asked to improvise. If rain has cut the track we wait or reroute. We do not push a family up a damaged road to keep a timetable.",
    image: "/images/katora.jpg",
    imageAlt: "Katora Lake in Kumrat, ringed by snow peaks",
    gallery: [
      { src: "/images/pine-road.jpg", alt: "Pine forest along a mountain road in Khyber Pakhtunkhwa" },
      { src: "/images/pines.jpg", alt: "Close pines with a snow ridge behind them" },
      { src: "/images/swat.jpg", alt: "A green northern valley of the kind you cross before Dir" },
    ],
    highlights: ["Deodar forest", "Kala Chashma", "Jahaz Banda trailhead for those who want the hike"],
    itinerary: [
      {
        title: "Day 1 — Lahore toward Dir",
        body: "A highway day with one proper meal stop. The night is in Dir or on the approach, so the jeep morning starts fresh. This is not a day of sightseeing, and we do not pretend otherwise.",
      },
      {
        title: "Day 2 — Into the forest",
        body: "Jeep from the roadhead into Kumrat. The drive under the trees is the introduction. Camp or guesthouse by the river, then a walk that does not need a guide's speech, only someone who knows where the path actually goes.",
      },
      {
        title: "Day 3 — Higher, or still",
        body: "Kala Chashma for most groups. Jahaz Banda for people who asked for a hike and brought shoes that can handle it. The choice is made the night before, from the weather, not from a fixed script.",
      },
      {
        title: "Day 4 — Out and home",
        body: "Jeep back to the road, then Lahore. It is a long return. We leave early so the last hours are motorway, not a mountain road after midnight.",
      },
    ],
    included: [...baseIncluded, "Jeeps for the forest track, both ways"],
    excluded: baseExcluded,
    goodToKnow: [
      "Simple and local is the honest comfort level here. Premium mostly means a better bed in Dir, not a resort in the trees.",
      "Mobile signal is patchy. Tell your people that before you go.",
    ],
  },
  {
    slug: "swat-kumrat",
    title: "Swat and Kumrat",
    region: "Khyber Pakhtunkhwa",
    days: 5,
    nights: 4,
    priceFrom: 62000,
    season: "May to early October",
    altitude: "From the Swat river near 1,000 metres up to Kumrat's forest around 2,500 metres and higher.",
    destinationIds: ["swat", "kumrat"],
    summary:
      "Five days joining the two green valleys: Swat and Kalam first, then Kumrat's forest for a night under the deodars. The best single trip if you want both water and woods. From PKR 62,000 a person for four.",
    lede: "Doing Swat and Kumrat separately wastes two long approaches from Lahore. This route takes the river road first, then crosses toward Dir and the forest, and comes home once. Five days is the shortest version that still gives each valley a night of its own.",
    road: "The link between Kalam and Kumrat is not a scenic afterthought. It is a driving day, and we keep it as a driving day. Trying to add Mahodand on the same morning is how luggage and tempers get left behind.",
    image: "/images/pine-road.jpg",
    imageAlt: "A pine-lined road through the mountains of Khyber Pakhtunkhwa",
    gallery: [
      { src: "/images/swat.jpg", alt: "Swat Valley slopes" },
      { src: "/images/katora.jpg", alt: "Katora Lake in Kumrat Valley" },
      { src: "/images/kandol.jpg", alt: "Kandol Lake in upper Swat" },
    ],
    highlights: ["Kalam and a Mahodand morning", "One night in Kumrat forest", "A single return to Lahore"],
    itinerary: [
      {
        title: "Day 1 — Lahore into Swat",
        body: "The first night is in lower or middle Swat, close enough to have arrived and far enough that tomorrow's river road starts without a city commute.",
      },
      {
        title: "Day 2 — Kalam",
        body: "Up the Swat river to Kalam. Time by the water in the evening. The town is a pause, not a performance.",
      },
      {
        title: "Day 3 — Mahodand, then toward the forest",
        body: "An early jeep toward Mahodand, back to Kalam by midday, and the road toward Dir only as far as daylight allows. We do not finish this day in the dark on a jeep track.",
      },
      {
        title: "Day 4 — Kumrat",
        body: "Into the deodars. A walk, the river, and a night that is the reason for adding this valley to Swat. Katora is included when the group is fit and the day is clear. It is not dragged into a timetable that cannot hold it.",
      },
      {
        title: "Day 5 — Lahore",
        body: "Out of the forest at first light and down to the plains. You are home at night. If anyone flies the next morning, tell us and we will protect that connection instead of a last viewpoint.",
      },
    ],
    included: [...baseIncluded, "Jeeps for Mahodand and the Kumrat track"],
    excluded: baseExcluded,
    goodToKnow: [
      "This is the route we suggest when a group cannot choose between Swat and Kumrat.",
      "Pack one small bag you can move into a jeep without a discussion.",
    ],
  },
  {
    slug: "hunza-valley",
    title: "Hunza Valley",
    region: "Gilgit-Baltistan",
    days: 5,
    nights: 4,
    priceFrom: 85000,
    season: "April to October, with late September and October for the autumn colour",
    altitude: "Karimabad is about 2,500 metres. Khunjerab, if you add it, is 4,693 metres and needs another day.",
    destinationIds: ["hunza"],
    summary:
      "Five days from Lahore to Karimabad, Attabad and the Passu cones, with the drive treated as part of the journey. Forts and the lake if the season agrees. From PKR 85,000 a person for four in a standard hotel. Khunjerab is an extension, not a hidden stop on this length.",
    lede: "Hunza from Lahore in five days is two long roads around one full day in the valley. We would rather say that plainly than promise Eagle's Nest, both forts, Attabad, Passu and the Chinese border before lunch. The day in Karimabad is unhurried. The border is a different trip.",
    road: "The usual night on the way up is Besham or Chilas, not Hunza. Coming home is the same shape in reverse. Babusar can replace part of the Karakoram Highway in high summer when the pass is open and you want that crossing. We choose it for the season, not for the photograph.",
    image: "/images/rakaposhi.jpg",
    imageAlt: "Rakaposhi above Hunza Valley",
    gallery: [
      { src: "/images/attabad.jpg", alt: "Attabad Lake in winter light, Hunza" },
      { src: "/images/passu.jpg", alt: "The river and cathedral peaks at Passu" },
      { src: "/images/attabad-traveler.jpg", alt: "A traveler looking across Attabad Lake" },
    ],
    highlights: ["Karimabad, Baltit and Altit", "Attabad by boat", "Passu cones", "Khunjerab only if you add a day"],
    itinerary: [
      {
        title: "Day 1 — Lahore to the highway night",
        body: "Before dawn, onto the Karakoram road as far as Besham or Chilas. This is a driving day with tea stops a driver actually uses. The hotel is clean and early. The valley is tomorrow.",
      },
      {
        title: "Day 2 — Into Karimabad",
        body: "The second road day ends in Hunza while there is still light on the peaks. A short walk above the town if people are not finished from the car. No forced sunset viewpoint.",
      },
      {
        title: "Day 3 — The valley",
        body: "Baltit and Altit, the eagle's view if the road up is sane that morning, and a boat on Attabad. The order follows the light. Passu can take the afternoon if the group would rather have the cones than a second fort.",
      },
      {
        title: "Day 4 — Passu, then south",
        body: "Morning at Passu if it was not taken yesterday, then the drive back to a highway night. We do not start the return after dark from Upper Hunza.",
      },
      {
        title: "Day 5 — Lahore",
        body: "The long road home. You arrive at night. Flights the same night are a bad idea. Tell us if someone has one and we will build the extra night into the quote instead of hoping the highway is kind.",
      },
    ],
    included: [...baseIncluded, "One Attabad boat for the group"],
    excluded: [...baseExcluded, "Khunjerab permits and the extra night that pass requires"],
    goodToKnow: [
      "October books out. If autumn colour is the reason, send dates early.",
      "The five-day price is standard hotels. Eagle's Nest and similar stays are a premium quote, not a surprise upgrade.",
    ],
  },
  {
    slug: "chitral-kalash",
    title: "Chitral and Kalash",
    region: "Khyber Pakhtunkhwa",
    days: 6,
    nights: 5,
    priceFrom: 95000,
    season: "May to September, with the Kalash festivals in May, August and December worth planning around",
    altitude: "Chitral town is near 1,500 metres. The Kalash valleys sit in a similar band, under Tirich Mir.",
    destinationIds: ["chitral"],
    summary:
      "Six days over the Lowari into Chitral and the Kalash valleys of Bumburet and Rumbur. Culture first, mountains behind it, and a pace that does not treat the valleys as a photo stop. From PKR 95,000 a person for four.",
    lede: "This trip is not a viewpoint tour with a cultural hour attached. You cross the Lowari, sleep in Chitral, and spend the real days in Bumburet and Rumbur. The rule is simple: ask before a camera comes up, and do not arrive during a festival unless the visit was arranged as a visit.",
    road: "The Lowari tunnel changed this journey. It is still a long first day from Lahore, often split with a night before the tunnel if we left late. Coming home gets the same respect. Chitral is not a place you extract in a weekend from Lahore.",
    image: "/images/chitral.jpg",
    imageAlt: "Still water and snow peaks at Karambar Lake in Chitral",
    gallery: [
      { src: "/images/pine-road.jpg", alt: "Mountain pines on a northern road" },
      { src: "/images/pines.jpg", alt: "Forest and a far snow ridge" },
      { src: "/images/kandol.jpg", alt: "A high lake of the sort the Chitral ranges hold" },
    ],
    highlights: ["Lowari into Chitral", "Bumburet", "Rumbur", "Garam Chashma if the day allows"],
    itinerary: [
      {
        title: "Day 1 — Lahore toward the Lowari",
        body: "A full road day to Dir or the tunnel approach. The night is positioned so the crossing happens in the morning, not as a tired addition to a fourteen-hour drive.",
      },
      {
        title: "Day 2 — Chitral town",
        body: "Through the Lowari into the valley. The fort and the bazaar if you want them, and a briefing that is practical: what the next two days are for, and how to be a guest rather than an audience.",
      },
      {
        title: "Day 3 — Bumburet",
        body: "Into the Kalash valley for a night. Walks between villages, time that is not scheduled down to the minute, and a local person with us so the visit is introduced rather than wandered into.",
      },
      {
        title: "Day 4 — Rumbur, or a second quiet day",
        body: "Rumbur when the group wants the second valley. A slower day in Bumburet when they do not. Garam Chashma is offered only if it does not turn the cultural days into another drive.",
      },
      {
        title: "Day 5 — Back across",
        body: "Return to the Dir side of the Lowari. This is a travel day. The hot springs are not squeezed in to decorate it.",
      },
      {
        title: "Day 6 — Lahore",
        body: "Down to the city. Same rule as the other long routes: no same-night flight unless we have built slack into the quote.",
      },
    ],
    included: [...baseIncluded, "A local companion in the Kalash valleys"],
    excluded: [...baseExcluded, "Festival homestay supplements, which we quote only for the dates you choose"],
    goodToKnow: [
      "December's Chaumos is a serious festival. We only take groups who have read what is welcome.",
      "Dress is ordinary and modest. That is practical advice, not a slogan.",
    ],
  },
  {
    slug: "hunza-skardu",
    title: "Hunza and Skardu",
    region: "Gilgit-Baltistan",
    days: 7,
    nights: 6,
    priceFrom: 125000,
    season: "May to September. Deosai is a summer road, roughly June to September.",
    altitude: "Hunza and Skardu towns sit near 2,200–2,500 metres. Deosai, when it is open, is around 4,000 metres.",
    destinationIds: ["hunza", "skardu"],
    summary:
      "Seven days linking Hunza with the road to Skardu: forts and Attabad, then the Indus valley, Shigar or the edge of Deosai when the season opens it. The long northern line from Lahore, from PKR 125,000 a person for four.",
    lede: "This is the trip for people who want both valleys and understand that a week from Lahore is still mostly road. You get one full day in Hunza and one full day in Skardu. Deosai is included when the plateau is open and the group is fit for the height. It is not promised in May.",
    road: "Hunza to Skardu via Gilgit is a full driving day along the Indus. We keep it whole. Splitting the sights of both valleys onto that day is how a week becomes a catalogue of windows. The nights on either end of the trip are on the Karakoram Highway, as they are on the shorter Hunza route.",
    image: "/images/passu.jpg",
    imageAlt: "Passu cones above the Hunza river",
    gallery: [
      { src: "/images/rakaposhi.jpg", alt: "Rakaposhi over Hunza" },
      { src: "/images/attabad.jpg", alt: "Attabad Lake" },
      { src: "/images/hunza-traveler.jpg", alt: "A traveler at a Hunza viewpoint" },
    ],
    highlights: ["A full Hunza day", "The Indus road to Skardu", "Shigar or Upper Kachura", "Deosai only in season"],
    itinerary: [
      {
        title: "Day 1 — Lahore onto the highway",
        body: "The same honest first day as the Hunza trip: a long road to a practical night in Besham or Chilas.",
      },
      {
        title: "Day 2 — Karimabad",
        body: "Into Hunza with light left. Walk, eat, sleep. The forts wait for a day that is not already eight hours long.",
      },
      {
        title: "Day 3 — Hunza properly",
        body: "Forts, the view above Karimabad, Attabad. Passu if the group would like the cones more than a second museum room. One boat, not a watersports hour.",
      },
      {
        title: "Day 4 — Hunza to Skardu",
        body: "Via Gilgit and along the Indus. A driving day with the right stops: the junction, the river, a meal. Skardu by evening.",
      },
      {
        title: "Day 5 — Skardu",
        body: "Shigar and the fort, or Upper Kachura, depending on what the group asked for in the brief. Deosai replaces this day when the road is open and everyone is comfortable at that height. We do not do Deosai as a rushed add-on after a fort tour.",
      },
      {
        title: "Day 6 — South",
        body: "Back toward a highway night. The cold desert is a stop if it sits on the way and the light is good, not a reason to leave Skardu at noon and call it a sightseeing day.",
      },
      {
        title: "Day 7 — Lahore",
        body: "Home by night. The week is full. If you want Deosai and a slow Hunza, ask for nine days and we will price that instead of compressing this one.",
      },
    ],
    included: [...baseIncluded, "Attabad boat", "Deosai transport when that day replaces the Skardu valley day"],
    excluded: baseExcluded,
    goodToKnow: [
      "At Deosai the air is thin. Tell us about heart or breathing conditions before we put it on the plan.",
      "Seven days is the minimum that still feels like both places. Nine is kinder.",
    ],
  },
];

export function getTours() {
  return tours;
}

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}

export function formatDestinationIds(ids: string[]) {
  return ids.map((id) => destinationLabel(id)).join(", ");
}
