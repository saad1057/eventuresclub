import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/images");

const images = [
  {
    file: "passu.jpg",
    url: "https://images.unsplash.com/photo-1684230715200-40f32e068bf2?fm=jpg&q=82&w=2000&fit=crop",
    photographer: "Qasim Nagori",
    source: "https://unsplash.com/photos/AjFiqo-PsfE",
    place: "Passu, Upper Hunza",
    license: "Unsplash License",
  },
  {
    file: "rakaposhi.jpg",
    url: "https://images.unsplash.com/photo-1683548503315-bb949615f80b?fm=jpg&q=82&w=2000&fit=crop",
    photographer: "Faisal Nawaz",
    source: "https://unsplash.com/photos/cVjiwjH4NAg",
    place: "Rakaposhi viewpoint, Hunza",
    license: "Unsplash License",
  },
  {
    file: "attabad.jpg",
    url: "https://images.unsplash.com/photo-1611821887389-cd0ae7ebfff4?fm=jpg&q=82&w=2000&fit=crop",
    photographer: "Hussain Ali",
    source: "https://unsplash.com/photos/RoxONDwtgJo",
    place: "Attabad Lake, Hunza",
    license: "Unsplash License",
  },
  {
    file: "swat.jpg",
    url: "https://images.pexels.com/photos/37385405/pexels-photo-37385405.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Abdul Waheed",
    source: "https://www.pexels.com/photo/scenic-mountain-landscape-in-swat-valley-37385405/",
    place: "Swat Valley",
    license: "Pexels License",
  },
  {
    file: "kandol.jpg",
    url: "https://images.pexels.com/photos/38794094/pexels-photo-38794094.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Pexels contributor",
    source: "https://www.pexels.com/photo/breathtaking-view-of-kandol-lake-in-swat-valley-38794094/",
    place: "Kandol Lake, Swat",
    license: "Pexels License",
  },
  {
    file: "katora.jpg",
    url: "https://images.pexels.com/photos/29418371/pexels-photo-29418371.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Graphic House",
    source: "https://www.pexels.com/photo/stunning-katora-lake-in-kumrat-valley-29418371/",
    place: "Katora Lake, Kumrat Valley",
    license: "Pexels License",
  },
  {
    file: "chitral.jpg",
    url: "https://images.pexels.com/photos/28319571/pexels-photo-28319571.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Nauman Hunzai",
    source: "https://www.pexels.com/photo/karambar-lake-pakistan-28319571/",
    place: "Karambar Lake, Chitral",
    license: "Pexels License",
  },
  {
    file: "saif.jpg",
    url: "https://images.pexels.com/photos/34948624/pexels-photo-34948624.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Sohail Raza",
    source: "https://www.pexels.com/photo/majestic-lake-saif-ul-malook-with-stunning-snow-capped-mountains-34948624/",
    place: "Lake Saif-ul-Malook, Kaghan",
    license: "Pexels License",
  },
  {
    file: "pine-road.jpg",
    url: "https://images.pexels.com/photos/36803549/pexels-photo-36803549.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Abdul Basit",
    source: "https://www.pexels.com/photo/sunny-mountain-road-with-pine-trees-in-pakistan-36803549/",
    place: "Pine road, Khyber Pakhtunkhwa",
    license: "Pexels License",
  },
  {
    file: "nathiagali.jpg",
    url: "https://images.pexels.com/photos/12734613/pexels-photo-12734613.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Tiham Ul Haq",
    source: "https://www.pexels.com/photo/man-standing-on-a-snowy-hill-12734613/",
    place: "A walker in the snow at Nathiagali",
    license: "Pexels License",
  },
  {
    file: "murree.jpg",
    url: "https://images.pexels.com/photos/13428937/pexels-photo-13428937.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Har Fun MOULA",
    source: "https://www.pexels.com/photo/river-by-the-mountain-13428937/",
    place: "Murree hills",
    license: "Pexels License",
  },
  {
    file: "pines.jpg",
    url: "https://images.pexels.com/photos/11915233/pexels-photo-11915233.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Tahir Ali",
    source: "https://www.pexels.com/photo/green-pine-trees-near-snow-covered-mountains-11915233/",
    place: "Pines and snow peaks, Pakistan",
    license: "Pexels License",
  },
  {
    file: "hunza-traveler.jpg",
    url: "https://images.pexels.com/photos/35170643/pexels-photo-35170643.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Asad Ali",
    source: "https://www.pexels.com/photo/adventurous-viewpoint-over-hunza-valley-pakistan-35170643/",
    place: "A traveler above Hunza Valley",
    license: "Pexels License",
  },
  {
    file: "attabad-traveler.jpg",
    url: "https://images.pexels.com/photos/35302565/pexels-photo-35302565.jpeg?auto=compress&cs=tinysrgb&w=2000",
    photographer: "Arif Esapzai",
    source: "https://www.pexels.com/photo/man-admiring-attabad-lake-in-hunza-pakistan-35302565/",
    place: "A traveler at Attabad Lake, Hunza",
    license: "Pexels License",
  },
  {
    file: "event-table.jpg",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?fm=jpg&q=82&w=2000&fit=crop",
    photographer: "Jay Wennington",
    source: "https://unsplash.com/photos/N_Y88TWmGwA",
    place: "A dining table set for a long meal",
    license: "Unsplash License",
  },
  {
    file: "event-gathering.jpg",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?fm=jpg&q=82&w=2000&fit=crop",
    photographer: "See source page",
    source: "https://unsplash.com/photos/photo-1519225421980-715cb0215aed",
    place: "Reception tables prepared for a celebration",
    license: "Unsplash License",
  },
  {
    file: "event-room.jpg",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?fm=jpg&q=82&w=2000&fit=crop",
    photographer: "See source page",
    source: "https://unsplash.com/photos/photo-1511578314322-379afb476865",
    place: "A hall seated for a talk",
    license: "Unsplash License",
  },
];

await mkdir(root, { recursive: true });
const ok = [];
const failed = [];

for (const image of images) {
  try {
    const response = await fetch(image.url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/jpeg,image/png,image/*;q=0.8",
      },
    });
    const input = Buffer.from(await response.arrayBuffer());
    if (!response.ok || input.length < 20000) {
      failed.push(`${image.file} ${response.status} ${input.length}`);
      continue;
    }
    const jpeg = await sharp(input)
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await writeFile(path.join(root, image.file), jpeg);
    ok.push(image);
    console.log(`ok ${image.file} ${jpeg.length}`);
  } catch (error) {
    failed.push(`${image.file} ${error instanceof Error ? error.message : error}`);
  }
}

const lines = [
  "# Image attribution",
  "",
  "Photographs used on Eventures Club. Unsplash and Pexels allow commercial use. Credit is not required; it is recorded here.",
  "",
  "Northern frames are of the places named. Traveler frames are real people in Hunza or Nathiagali, not staged club trips. Event frames set a mood for gatherings. They are not records of Eventures Club productions.",
  "",
  "| File | Place | Photographer | License | Source |",
  "| --- | --- | --- | --- | --- |",
  ...ok.map(
    (image) =>
      `| ${image.file} | ${image.place} | ${image.photographer} | ${image.license} | ${image.source} |`,
  ),
  "",
];

await writeFile(path.join(root, "ATTRIBUTION.md"), lines.join("\n"));
if (failed.length) {
  console.log(failed.join("\n"));
  process.exitCode = 1;
}
