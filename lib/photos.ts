/**
 * Photography. Everything here is CC0 / public domain unless marked CC BY,
 * and every image is credited on /credits. These are stand-ins: replace them
 * with Shehmeer's own photography as it is made.
 * Property photos are 1024px wide, so they are used in frames up to about
 * half the page width. The Arizona landscapes are larger and can go full bleed.
 */
type Photo = { src: string; width: number; height: number; alt: string; credit: string; license: string; source: string };

const cc0 = (src: string, width: number, height: number, alt: string, credit: string, source: string): Photo => ({ src, width, height, alt, credit, license: "CC0", source });

export const photos = {
  // Arizona
  saguaroSunset: { src: "/photos/az/saguaro-sunset.jpg", width: 1920, height: 1280, alt: "Saguaros and a lone cloud lit gold above the Sonoran Desert at sunset", credit: "John Fowler", license: "CC BY 2.0", source: "https://commons.wikimedia.org/w/index.php?curid=86543153" },
  camelbackWide: { src: "/photos/az/camelback.jpg", width: 2048, height: 1536, alt: "Camelback Mountain above the desert floor under a broken sky", credit: "Dru Bloomfield", license: "CC BY 2.0", source: "https://commons.wikimedia.org/w/index.php?curid=6539844" },
  hermosaGarden: cc0("/photos/az/hermosa-garden.jpg", 1024, 768, "A cactus garden with palo verde in bloom in Paradise Valley", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582291/carol-highsmiths-arizona-photograph"),
  taliesinPool: cc0("/photos/az/taliesin-pool.jpg", 1024, 768, "Taliesin West in Scottsdale at dusk, its stone walls reflected in a long pool", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582253/carol-highsmiths-arizona-photograph"),
  taliesinGarden: cc0("/photos/az/taliesin-garden.jpg", 1024, 768, "Taliesin West's terraces below the McDowell foothills", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582271/carol-highsmiths-arizona-photograph"),
  taliesinNight: cc0("/photos/az/taliesin-night.jpg", 1024, 768, "A bronze sculpture in front of Taliesin West at nightfall", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582284/carol-highsmiths-arizona-photograph"),
  camelback: cc0("/photos/camelback.jpg", 1024, 674, "Camelback Mountain rising above homes and desert trees in late light", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582237/carol-highsmiths-arizona-photograph"),
  camelbackEtching: cc0("/photos/camelback-etching.jpg", 1024, 728, "Etching of Camelback Mountain with a saguaro in the foreground", "George Elbert Burr, etching", "https://www.rawpixel.com/image/8848513/camelback-mountain-phoenix-george-elbert-burr"),
  valleyDusk: cc0("/photos/valley-dusk.jpg", 1024, 683, "The Valley of the Sun seen from a rocky ridge at dusk", "Public domain, via rawpixel", "https://www.rawpixel.com/image/3287167/free-photo-image-adventure-aerial-view-architecture"),
  interiorView: cc0("/photos/interior-view.jpg", 1024, 705, "A living room opening through a wide doorway to a view of Camelback Mountain", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582277/carol-highsmiths-arizona-photograph"),
  tempeHome: cc0("/photos/tempe-home.jpg", 1024, 683, "A white stucco home in Tempe with bougainvillea in bloom", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582434/carol-highsmiths-arizona-photograph"),
  saguaroDusk: cc0("/photos/saguaro-sunset.jpg", 1024, 768, "Saguaro cacti in silhouette against the last light of sunset", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582358/carol-highsmiths-arizona-photograph"),
  saguaroDay: cc0("/photos/saguaro-day.jpg", 1024, 683, "Saguaros and palo verde trees under a clear Sonoran sky", "Carol M. Highsmith, Library of Congress", "https://www.rawpixel.com/image/582401/carol-highsmiths-arizona-photograph"),

  // Property stand-ins
  villaPool: cc0("/photos/property/villa-pool.jpg", 1024, 576, "A low modern house with glass walls opening onto a pool at dusk", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5907779/photo-image-public-domain-free-cc0"),
  duskPool: cc0("/photos/property/dusk-pool.jpg", 1024, 685, "A two-storey house lit at dusk above a rectangular pool", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5919803/photo-image-public-domain-house-interior"),
  mountainPool: cc0("/photos/property/mountain-pool.jpg", 1024, 683, "A pool terrace looking out to a ridge of mountains", "Public domain, via rawpixel", "https://www.rawpixel.com/image/6031267/france-holidays-free-public-domain-cc0-photo"),
  duskGable: cc0("/photos/property/dusk-gable.jpg", 1024, 683, "A modern gabled house with tall windows glowing at twilight", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5919896/photo-image-public-domain-house-interior"),
  terraces: cc0("/photos/property/terraces.jpg", 1024, 683, "A white residential tower with deep stepped terraces", "Public domain, via rawpixel", "https://www.rawpixel.com/image/3285824/free-photo-image-office-building-residence-city"),
  whiteTower: cc0("/photos/property/white-tower.jpg", 1024, 683, "The corner of a white apartment tower against a pale sky", "Public domain, via rawpixel", "https://www.rawpixel.com/image/3285860/free-photo-image-offices-building-modern-apartments-apartment"),
  corner: cc0("/photos/property/corner.jpg", 1024, 768, "A curved apartment building with long bands of windows", "Public domain, via rawpixel", "https://www.rawpixel.com/image/3285548/free-photo-image-sky-png-angle-apartment-building"),
  suburb: cc0("/photos/property/suburb.jpg", 1024, 680, "A street of two-storey townhomes under a blue sky", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5925736/photo-image-cloud-public-domain-free"),
  livingBright: cc0("/photos/property/living-bright.jpg", 1024, 727, "A bright living room with floor-to-ceiling windows", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5915137/image-light-public-domain-plants"),
  livingWide: cc0("/photos/property/living-wide.jpg", 1024, 694, "A wide white living room with tall windows", "Public domain, via rawpixel", "https://www.rawpixel.com/image/6043312/photo-image-public-domain-table-living-room"),
  livingGreen: cc0("/photos/property/living-green.jpg", 1024, 685, "A living room with a window wall onto trees", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5924316/photo-image-light-public-domain-black"),
  livingGallery: cc0("/photos/property/living-gallery.jpg", 1024, 683, "A long living room with art on the walls", "Public domain, via rawpixel", "https://www.rawpixel.com/image/6043332/photo-image-public-domain-table-living-room"),
  livingLibrary: cc0("/photos/property/living-library.jpg", 1024, 719, "A sitting room with built-in bookshelves and wingback chairs", "Public domain, via rawpixel", "https://www.rawpixel.com/image/6043322/photo-image-public-domain-table-living-room"),
  kitchenWhite: cc0("/photos/property/kitchen-white.jpg", 1024, 697, "A white kitchen with an island and a pendant light", "Public domain, via rawpixel", "https://www.rawpixel.com/image/6039071/photo-image-public-domain-minimal-wood"),
  kitchenIsland: cc0("/photos/property/kitchen-island.jpg", 1024, 1010, "A kitchen island with wire stools and open shelving", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5906894/photo-image-public-domain-kitchen-interior"),
  kitchenSteel: cc0("/photos/property/kitchen-steel.jpg", 1024, 683, "A long kitchen in white stone and walnut", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5924425/photo-image-public-domain-kitchen-living-room"),
  kitchenWood: cc0("/photos/property/kitchen-wood.jpg", 1024, 683, "A compact kitchen in pale wood and cream", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5912749/image-public-domain-kitchen-interior"),
  kitchenTile: cc0("/photos/property/kitchen-tile.jpg", 1024, 683, "A galley kitchen with a patterned tile backsplash", "Public domain, via rawpixel", "https://www.rawpixel.com/image/5925293/photo-image-public-domain-kitchen-living-room"),
  bedroomHotel: cc0("/photos/property/bedroom-hotel.jpg", 1024, 683, "A warm bedroom with an upholstered headboard and lamps", "Public domain, via rawpixel", "https://www.rawpixel.com/image/6036396/photo-image-public-domain-wood-house"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
