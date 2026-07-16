/* =====================================
   TravelVerse
   File: js/places.js
   Dynamic Bangladesh Tourist Places
===================================== */

const DEFAULT_PLACE_IMAGE = "/assets/images.jpeg";
const PLACE_PAGE_SIZE = 12;

let visiblePlaceCount = PLACE_PAGE_SIZE;

const touristPlaces = [
    {
        "id": "cox-bazar",
        "name": "Cox's Bazar",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Beach",
        "description": "Long sea beach, sunsets and a lively coastal atmosphere.",
        "rating": 4.9,
        "popular": true,
        "viral": true,
        "image": "/assets/longest-sea-beach-in.jpg"
    },
    {
        "id": "inani-beach",
        "name": "Inani Beach",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Beach",
        "description": "Rocky shoreline and a quieter beach experience south of Cox's Bazar.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "himchari",
        "name": "Himchari National Park",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Forest",
        "description": "Green hills, viewpoints and a seasonal waterfall beside Marine Drive.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "marine-drive",
        "name": "Cox's Bazar Marine Drive",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Nature",
        "description": "A scenic coastal road connecting beaches, hills and viewpoints.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "saint-martin",
        "name": "Saint Martin Island",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Island",
        "description": "Bangladesh's famous coral island with blue water and seaside cottages.",
        "rating": 5.0,
        "popular": true,
        "viral": true,
        "image": "/assets/image-299881-1754634544.jpg"
    },
    {
        "id": "chera-dwip",
        "name": "Chera Dwip",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Island",
        "description": "A small southern island known for coral stones and clear coastal views.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "maheshkhali",
        "name": "Maheshkhali Island",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Island",
        "description": "An island of mangroves, hills, salt fields and the Adinath Temple.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "sonadia-island",
        "name": "Sonadia Island",
        "division": "Chattogram",
        "district": "Cox's Bazar",
        "category": "Island",
        "description": "A quiet island destination with beaches, dunes and natural biodiversity.",
        "rating": 4.6,
        "popular": false,
        "viral": true
    },
    {
        "id": "patenga-beach",
        "name": "Patenga Sea Beach",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Beach",
        "description": "A popular urban sea beach near the mouth of the Karnaphuli River.",
        "rating": 4.4,
        "popular": true,
        "viral": false
    },
    {
        "id": "foys-lake",
        "name": "Foy's Lake",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Lake",
        "description": "A scenic lake and recreation area surrounded by green hills.",
        "rating": 4.4,
        "popular": true,
        "viral": false
    },
    {
        "id": "chandranath-hill",
        "name": "Chandranath Hill",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Hill",
        "description": "A hilltop pilgrimage and trekking destination in Sitakunda.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "sitakunda-eco-park",
        "name": "Sitakunda Eco Park",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Eco Park",
        "description": "Forest trails, hills and waterfalls near Sitakunda.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "khoiyachora-waterfall",
        "name": "Khoiyachora Waterfall",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Waterfall",
        "description": "A multi-step hill waterfall popular with adventure travelers.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "guliakhali-beach",
        "name": "Guliakhali Sea Beach",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Beach",
        "description": "A distinctive green grass beach with tidal channels and open views.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "banshbaria-beach",
        "name": "Banshbaria Sea Beach",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Beach",
        "description": "A peaceful beach known for its long jetty and sunset scenery.",
        "rating": 4.5,
        "popular": false,
        "viral": true
    },
    {
        "id": "parki-beach",
        "name": "Parki Sea Beach",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Beach",
        "description": "A coastal beach in Anwara with casuarina trees and river-mouth views.",
        "rating": 4.3,
        "popular": false,
        "viral": false
    },
    {
        "id": "mahamaya-lake",
        "name": "Mahamaya Lake",
        "division": "Chattogram",
        "district": "Chattogram",
        "category": "Lake",
        "description": "A lake surrounded by hills, offering boating and kayaking.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "sajek-valley",
        "name": "Sajek Valley",
        "division": "Chattogram",
        "district": "Rangamati",
        "category": "Hill",
        "description": "Cloudy hill views, indigenous culture and scenic sunrise points.",
        "rating": 4.8,
        "popular": true,
        "viral": true,
        "image": "/assets/images.jpeg"
    },
    {
        "id": "kaptai-lake",
        "name": "Kaptai Lake",
        "division": "Chattogram",
        "district": "Rangamati",
        "category": "Lake",
        "description": "A vast man-made lake with islands, hills and boat journeys.",
        "rating": 4.7,
        "popular": true,
        "viral": false,
        "image": "/assets/1525327366_1.jpg"
    },
    {
        "id": "shuvolong-waterfall",
        "name": "Shuvolong Waterfall",
        "division": "Chattogram",
        "district": "Rangamati",
        "category": "Waterfall",
        "description": "A seasonal waterfall reached by a scenic boat journey across Kaptai Lake.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "rangamati-hanging-bridge",
        "name": "Rangamati Hanging Bridge",
        "division": "Chattogram",
        "district": "Rangamati",
        "category": "Landmark",
        "description": "An iconic suspension bridge and lakeside viewpoint in Rangamati.",
        "rating": 4.4,
        "popular": true,
        "viral": false
    },
    {
        "id": "nilgiri",
        "name": "Nilgiri",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Hill",
        "description": "A high hill resort and viewpoint famous for clouds and panoramic scenery.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "nilachal",
        "name": "Nilachal",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Hill",
        "description": "A nearby hill viewpoint overlooking Bandarban town and surrounding valleys.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "chimbuk-hill",
        "name": "Chimbuk Hill",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Hill",
        "description": "A scenic mountain route with wide views of the hill tracts.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "boga-lake",
        "name": "Boga Lake",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Lake",
        "description": "A remote natural lake surrounded by mountains and tribal villages.",
        "rating": 4.9,
        "popular": true,
        "viral": true
    },
    {
        "id": "keokradong",
        "name": "Keokradong",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Hill",
        "description": "A well-known trekking destination with dramatic mountain landscapes.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "nafakhum-waterfall",
        "name": "Nafakhum Waterfall",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Waterfall",
        "description": "A remote waterfall reached through rivers, hills and adventure routes.",
        "rating": 4.9,
        "popular": true,
        "viral": true
    },
    {
        "id": "nijhum-dwip",
        "name": "Nijhum Dwip",
        "division": "Chattogram",
        "district": "Noakhali",
        "category": "Island",
        "description": "A quiet island and wildlife destination known for deer and migratory birds.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "meghla-tourist-complex",
        "name": "Meghla Tourist Complex",
        "division": "Chattogram",
        "district": "Bandarban",
        "category": "Park",
        "description": "A family recreation spot with a lake, cable car and hill scenery.",
        "rating": 4.3,
        "popular": true,
        "viral": false
    },
    {
        "id": "jaflong",
        "name": "Jaflong",
        "division": "Sylhet",
        "district": "Sylhet",
        "category": "Nature",
        "description": "Stone beds, rivers and green hills near the international border.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "ratargul",
        "name": "Ratargul Swamp Forest",
        "division": "Sylhet",
        "district": "Sylhet",
        "category": "Forest",
        "description": "A freshwater swamp forest best explored by boat in the rainy season.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "bisnakandi",
        "name": "Bisnakandi",
        "division": "Sylhet",
        "district": "Sylhet",
        "category": "Nature",
        "description": "A scenic meeting point of hills, streams and stone-covered riverbeds.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "lalakhal",
        "name": "Lalakhal",
        "division": "Sylhet",
        "district": "Sylhet",
        "category": "River",
        "description": "A calm blue-green river route with tea gardens and distant hills.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "sada-pathor",
        "name": "Sada Pathor",
        "division": "Sylhet",
        "district": "Sylhet",
        "category": "River",
        "description": "A clear river and white-stone destination in Bholaganj.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "sreemangal",
        "name": "Sreemangal",
        "division": "Sylhet",
        "district": "Moulvibazar",
        "category": "Nature",
        "description": "Tea gardens, forests and a relaxed town known as the tea capital.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "lawachara",
        "name": "Lawachara National Park",
        "division": "Sylhet",
        "district": "Moulvibazar",
        "category": "Forest",
        "description": "A tropical forest with walking trails, wildlife and rich biodiversity.",
        "rating": 4.7,
        "popular": true,
        "viral": false
    },
    {
        "id": "madhabkunda",
        "name": "Madhabkunda Waterfall",
        "division": "Sylhet",
        "district": "Moulvibazar",
        "category": "Waterfall",
        "description": "A famous waterfall surrounded by forested hills and tea estates.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "ham-ham",
        "name": "Ham Ham Waterfall",
        "division": "Sylhet",
        "district": "Moulvibazar",
        "category": "Waterfall",
        "description": "A remote trekking waterfall inside a green forest landscape.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "baikka-beel",
        "name": "Baikka Beel",
        "division": "Sylhet",
        "district": "Moulvibazar",
        "category": "Haor",
        "description": "A wetland sanctuary known for birds, watchtowers and sunset views.",
        "rating": 4.5,
        "popular": false,
        "viral": false
    },
    {
        "id": "tanguar-haor",
        "name": "Tanguar Haor",
        "division": "Sylhet",
        "district": "Sunamganj",
        "category": "Haor",
        "description": "A vast wetland famous for houseboat journeys and monsoon scenery.",
        "rating": 4.9,
        "popular": true,
        "viral": true
    },
    {
        "id": "niladri-lake",
        "name": "Niladri Lake",
        "division": "Sylhet",
        "district": "Sunamganj",
        "category": "Lake",
        "description": "A blue-water quarry lake backed by green border hills.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "jadukata-river",
        "name": "Jadukata River",
        "division": "Sylhet",
        "district": "Sunamganj",
        "category": "River",
        "description": "A clear river with sandbanks and scenic views toward Meghalaya hills.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "madhabpur-lake",
        "name": "Madhabpur Lake",
        "division": "Sylhet",
        "district": "Moulvibazar",
        "category": "Lake",
        "description": "A peaceful lake surrounded by tea gardens and low hills.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "lalbagh-fort",
        "name": "Lalbagh Fort",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Heritage",
        "description": "A historic Mughal fort complex in Old Dhaka.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "ahsan-manzil",
        "name": "Ahsan Manzil",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Museum",
        "description": "The iconic Pink Palace and a museum beside the Buriganga River.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "national-parliament",
        "name": "National Parliament House",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Landmark",
        "description": "A world-famous modern architectural landmark.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "national-martyrs-memorial",
        "name": "National Martyrs' Memorial",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Landmark",
        "description": "Bangladesh's national monument honouring the Liberation War martyrs.",
        "rating": 4.8,
        "popular": true,
        "viral": false
    },
    {
        "id": "sonargaon-museum",
        "name": "Sonargaon Folk Art Museum",
        "division": "Dhaka",
        "district": "Narayanganj",
        "category": "Museum",
        "description": "Traditional art, crafts and historic architecture in old Sonargaon.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "panam-city",
        "name": "Panam City",
        "division": "Dhaka",
        "district": "Narayanganj",
        "category": "Heritage",
        "description": "An atmospheric historic street of merchant houses and colonial-era buildings.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "dhakeshwari-temple",
        "name": "Dhakeshwari National Temple",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Religious",
        "description": "A major historic Hindu temple and national place of worship.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "star-mosque",
        "name": "Star Mosque",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Religious",
        "description": "A beautifully decorated mosque famous for star-patterned mosaics.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "curzon-hall",
        "name": "Curzon Hall",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Heritage",
        "description": "A distinctive colonial-era academic building at the University of Dhaka.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "ramna-park",
        "name": "Ramna Park",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Park",
        "description": "A large green park in central Dhaka with trees, lake and walking paths.",
        "rating": 4.4,
        "popular": true,
        "viral": false
    },
    {
        "id": "hatirjheel",
        "name": "Hatirjheel",
        "division": "Dhaka",
        "district": "Dhaka",
        "category": "Lake",
        "description": "An urban lakefront area with bridges, lights and evening recreation.",
        "rating": 4.5,
        "popular": true,
        "viral": true
    },
    {
        "id": "zinda-park",
        "name": "Zinda Park",
        "division": "Dhaka",
        "district": "Narayanganj",
        "category": "Park",
        "description": "A landscaped eco-friendly recreation area with greenery and lakes.",
        "rating": 4.5,
        "popular": true,
        "viral": true
    },
    {
        "id": "baliati-palace",
        "name": "Baliati Palace",
        "division": "Dhaka",
        "district": "Manikganj",
        "category": "Heritage",
        "description": "A grand zamindar palace complex with ornate colonial architecture.",
        "rating": 4.5,
        "popular": false,
        "viral": false
    },
    {
        "id": "mohera-zamindar-bari",
        "name": "Mohera Zamindar Bari",
        "division": "Dhaka",
        "district": "Tangail",
        "category": "Heritage",
        "description": "A preserved zamindar estate known for elegant palaces and gardens.",
        "rating": 4.6,
        "popular": true,
        "viral": true
    },
    {
        "id": "bhawal-national-park",
        "name": "Bhawal National Park",
        "division": "Dhaka",
        "district": "Gazipur",
        "category": "Forest",
        "description": "A sal forest park popular for picnics, walking and day trips.",
        "rating": 4.3,
        "popular": true,
        "viral": false
    },
    {
        "id": "bangabandhu-safari-park",
        "name": "Bangabandhu Safari Park",
        "division": "Dhaka",
        "district": "Gazipur",
        "category": "Safari Park",
        "description": "A large wildlife and safari attraction with open animal zones.",
        "rating": 4.4,
        "popular": true,
        "viral": true
    },
    {
        "id": "nikli-haor",
        "name": "Nikli Haor",
        "division": "Dhaka",
        "district": "Kishoreganj",
        "category": "Haor",
        "description": "A vast monsoon wetland known for boat trips and open-water horizons.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "sundarbans",
        "name": "Sundarbans",
        "division": "Khulna",
        "district": "Khulna",
        "category": "Forest",
        "description": "The world's largest mangrove forest and a major wildlife destination.",
        "rating": 4.9,
        "popular": true,
        "viral": true,
        "image": "/assets/922_giant.jpg"
    },
    {
        "id": "karamjal",
        "name": "Karamjal",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Eco Park",
        "description": "A popular Sundarbans gateway with boardwalks and wildlife viewing.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "katka",
        "name": "Katka Sea Beach",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Beach",
        "description": "A remote Sundarbans coast with forest, wildlife and open sea views.",
        "rating": 4.7,
        "popular": true,
        "viral": false
    },
    {
        "id": "hiron-point",
        "name": "Hiron Point",
        "division": "Khulna",
        "district": "Khulna",
        "category": "Forest",
        "description": "A protected Sundarbans area known for wildlife and river journeys.",
        "rating": 4.8,
        "popular": true,
        "viral": false
    },
    {
        "id": "harbaria",
        "name": "Harbaria Eco Tourism Center",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Eco Park",
        "description": "A forest trail and eco-tourism stop inside the Sundarbans region.",
        "rating": 4.5,
        "popular": false,
        "viral": false
    },
    {
        "id": "dublar-char",
        "name": "Dublar Char",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Island",
        "description": "A remote coastal island known for fisheries, wildlife and annual gatherings.",
        "rating": 4.6,
        "popular": true,
        "viral": true
    },
    {
        "id": "kochikhali",
        "name": "Kochikhali",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Forest",
        "description": "A quieter Sundarbans destination with creeks, wildlife and forest scenery.",
        "rating": 4.6,
        "popular": false,
        "viral": false
    },
    {
        "id": "sixty-dome-mosque",
        "name": "Sixty Dome Mosque",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Heritage",
        "description": "A UNESCO-listed historic mosque in the Mosque City of Bagerhat.",
        "rating": 4.8,
        "popular": true,
        "viral": false
    },
    {
        "id": "khan-jahan-ali-shrine",
        "name": "Khan Jahan Ali Shrine",
        "division": "Khulna",
        "district": "Bagerhat",
        "category": "Religious",
        "description": "A historic shrine complex associated with the heritage of Bagerhat.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "shilaidaha-kuthibari",
        "name": "Shilaidaha Kuthibari",
        "division": "Khulna",
        "district": "Kushtia",
        "category": "Heritage",
        "description": "A historic house linked to Rabindranath Tagore and Bengali literature.",
        "rating": 4.7,
        "popular": true,
        "viral": false
    },
    {
        "id": "lalon-shah-shrine",
        "name": "Lalon Shah Shrine",
        "division": "Khulna",
        "district": "Kushtia",
        "category": "Cultural",
        "description": "A major cultural site dedicated to the mystic poet Lalon Shah.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "mujibnagar-memorial",
        "name": "Mujibnagar Memorial Complex",
        "division": "Khulna",
        "district": "Meherpur",
        "category": "Heritage",
        "description": "A historic memorial connected with Bangladesh's provisional government.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "paharpur",
        "name": "Paharpur Buddhist Vihara",
        "division": "Rajshahi",
        "district": "Naogaon",
        "category": "Archaeology",
        "description": "The ruins of Somapura Mahavihara, a major ancient Buddhist monastery.",
        "rating": 4.8,
        "popular": true,
        "viral": false
    },
    {
        "id": "mahasthangarh",
        "name": "Mahasthangarh",
        "division": "Rajshahi",
        "district": "Bogura",
        "category": "Archaeology",
        "description": "One of the earliest known urban archaeological sites in Bangladesh.",
        "rating": 4.7,
        "popular": true,
        "viral": false
    },
    {
        "id": "puthia-temple-complex",
        "name": "Puthia Temple Complex",
        "division": "Rajshahi",
        "district": "Rajshahi",
        "category": "Heritage",
        "description": "A remarkable collection of historic Hindu temples and palaces.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "varendra-museum",
        "name": "Varendra Research Museum",
        "division": "Rajshahi",
        "district": "Rajshahi",
        "category": "Museum",
        "description": "A museum of archaeology, sculpture, manuscripts and regional history.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "bagha-mosque",
        "name": "Bagha Mosque",
        "division": "Rajshahi",
        "district": "Rajshahi",
        "category": "Religious",
        "description": "A historic brick mosque celebrated for terracotta ornamentation.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "natore-rajbari",
        "name": "Natore Rajbari",
        "division": "Rajshahi",
        "district": "Natore",
        "category": "Heritage",
        "description": "A historic royal palace complex surrounded by lakes and gardens.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "uttara-ganabhaban",
        "name": "Uttara Ganabhaban",
        "division": "Rajshahi",
        "district": "Natore",
        "category": "Heritage",
        "description": "A former royal palace now used as an official presidential residence.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "padma-garden",
        "name": "Padma Garden",
        "division": "Rajshahi",
        "district": "Rajshahi",
        "category": "River",
        "description": "A popular riverside recreation area for sunsets and evening walks.",
        "rating": 4.5,
        "popular": true,
        "viral": true
    },
    {
        "id": "chalan-beel",
        "name": "Chalan Beel",
        "division": "Rajshahi",
        "district": "Natore",
        "category": "Wetland",
        "description": "A large wetland region with seasonal waters, villages and birdlife.",
        "rating": 4.5,
        "popular": false,
        "viral": false
    },
    {
        "id": "kusumba-mosque",
        "name": "Kusumba Mosque",
        "division": "Rajshahi",
        "district": "Naogaon",
        "category": "Religious",
        "description": "A historic stone mosque known for its architecture and carved details.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "kantajew-temple",
        "name": "Kantajew Temple",
        "division": "Rangpur",
        "district": "Dinajpur",
        "category": "Religious",
        "description": "An ornate terracotta Hindu temple and major heritage attraction.",
        "rating": 4.9,
        "popular": true,
        "viral": true
    },
    {
        "id": "tajhat-palace",
        "name": "Tajhat Palace",
        "division": "Rangpur",
        "district": "Rangpur",
        "category": "Museum",
        "description": "A grand palace housing a museum of regional history and archaeology.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "ramsagar",
        "name": "Ramsagar National Park",
        "division": "Rangpur",
        "district": "Dinajpur",
        "category": "Lake",
        "description": "A large historic reservoir surrounded by a peaceful park.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "teesta-barrage",
        "name": "Teesta Barrage",
        "division": "Rangpur",
        "district": "Lalmonirhat",
        "category": "River",
        "description": "A major river barrage and scenic destination near the Teesta.",
        "rating": 4.4,
        "popular": true,
        "viral": false
    },
    {
        "id": "shopnopuri",
        "name": "Shopnopuri Artificial Amusement Park",
        "division": "Rangpur",
        "district": "Dinajpur",
        "category": "Park",
        "description": "A family amusement destination with gardens, rides and picnic spaces.",
        "rating": 4.3,
        "popular": true,
        "viral": false
    },
    {
        "id": "vinnya-jagat",
        "name": "Vinnya Jagat",
        "division": "Rangpur",
        "district": "Rangpur",
        "category": "Park",
        "description": "A popular family recreation and picnic park near Rangpur city.",
        "rating": 4.2,
        "popular": true,
        "viral": false
    },
    {
        "id": "nilsagar",
        "name": "Nilsagar",
        "division": "Rangpur",
        "district": "Nilphamari",
        "category": "Lake",
        "description": "A historic blue-water reservoir and quiet picnic destination.",
        "rating": 4.4,
        "popular": false,
        "viral": false
    },
    {
        "id": "rocks-museum",
        "name": "Rocks Museum",
        "division": "Rangpur",
        "district": "Panchagarh",
        "category": "Museum",
        "description": "A distinctive museum displaying rocks, fossils and regional collections.",
        "rating": 4.3,
        "popular": false,
        "viral": false
    },
    {
        "id": "banglabandha-zero-point",
        "name": "Banglabandha Zero Point",
        "division": "Rangpur",
        "district": "Panchagarh",
        "category": "Landmark",
        "description": "A northern border landmark and gateway near the Himalayan foothills.",
        "rating": 4.5,
        "popular": true,
        "viral": true
    },
    {
        "id": "tetulia-tea-gardens",
        "name": "Tetulia Tea Gardens",
        "division": "Rangpur",
        "district": "Panchagarh",
        "category": "Nature",
        "description": "Northern tea estates with open landscapes and distant mountain views.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "kuakata",
        "name": "Kuakata Sea Beach",
        "division": "Barishal",
        "district": "Patuakhali",
        "category": "Beach",
        "description": "A panoramic sea beach known for both sunrise and sunset views.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "lebur-char",
        "name": "Lebur Char",
        "division": "Barishal",
        "district": "Patuakhali",
        "category": "Beach",
        "description": "A quieter coastal spot near Kuakata with open views and red-crab habitat.",
        "rating": 4.5,
        "popular": false,
        "viral": true
    },
    {
        "id": "fatrar-char",
        "name": "Fatrar Char",
        "division": "Barishal",
        "district": "Patuakhali",
        "category": "Forest",
        "description": "A coastal mangrove area reached from Kuakata by boat.",
        "rating": 4.4,
        "popular": false,
        "viral": false
    },
    {
        "id": "floating-guava-market",
        "name": "Floating Guava Market",
        "division": "Barishal",
        "district": "Jhalokathi",
        "category": "Cultural",
        "description": "A unique seasonal floating market where boats trade fresh guavas.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "guthia-mosque",
        "name": "Guthia Mosque",
        "division": "Barishal",
        "district": "Barishal",
        "category": "Religious",
        "description": "A striking modern mosque complex with gardens and a large pond.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "durga-sagar",
        "name": "Durga Sagar",
        "division": "Barishal",
        "district": "Barishal",
        "category": "Lake",
        "description": "A large historic pond and quiet recreation destination.",
        "rating": 4.3,
        "popular": false,
        "viral": false
    },
    {
        "id": "sonar-char",
        "name": "Sonar Char",
        "division": "Barishal",
        "district": "Patuakhali",
        "category": "Island",
        "description": "A remote coastal island with beach, forest and wildlife scenery.",
        "rating": 4.5,
        "popular": false,
        "viral": true
    },
    {
        "id": "monpura-island",
        "name": "Monpura Island",
        "division": "Barishal",
        "district": "Bhola",
        "category": "Island",
        "description": "A serene river island known for natural beauty and local life.",
        "rating": 4.6,
        "popular": true,
        "viral": true
    },
    {
        "id": "char-kukri-mukri",
        "name": "Char Kukri Mukri",
        "division": "Barishal",
        "district": "Bhola",
        "category": "Island",
        "description": "A coastal wildlife sanctuary with mangroves, deer and quiet waterways.",
        "rating": 4.6,
        "popular": false,
        "viral": true
    },
    {
        "id": "andharmanik-river",
        "name": "Andharmanik River",
        "division": "Barishal",
        "district": "Patuakhali",
        "category": "River",
        "description": "A scenic river route near Kuakata and the coastal char areas.",
        "rating": 4.4,
        "popular": false,
        "viral": false
    },
    {
        "id": "birishiri",
        "name": "Birishiri",
        "division": "Mymensingh",
        "district": "Netrokona",
        "category": "Nature",
        "description": "A scenic destination combining hills, rivers and indigenous culture.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "someshwari-river",
        "name": "Someshwari River",
        "division": "Mymensingh",
        "district": "Netrokona",
        "category": "River",
        "description": "A clear seasonal river flowing beside Durgapur and border hills.",
        "rating": 4.7,
        "popular": true,
        "viral": true
    },
    {
        "id": "china-clay-hills",
        "name": "China Clay Hills",
        "division": "Mymensingh",
        "district": "Netrokona",
        "category": "Hill",
        "description": "Colorful clay hills and blue-green water near Bijoypur.",
        "rating": 4.8,
        "popular": true,
        "viral": true
    },
    {
        "id": "shashi-lodge",
        "name": "Shashi Lodge",
        "division": "Mymensingh",
        "district": "Mymensingh",
        "category": "Heritage",
        "description": "A historic palace featuring classical architecture and local history.",
        "rating": 4.6,
        "popular": true,
        "viral": false
    },
    {
        "id": "muktagacha-rajbari",
        "name": "Muktagacha Rajbari",
        "division": "Mymensingh",
        "district": "Mymensingh",
        "category": "Heritage",
        "description": "The remains of a prominent zamindar palace complex.",
        "rating": 4.4,
        "popular": false,
        "viral": false
    },
    {
        "id": "madhutila-eco-park",
        "name": "Madhutila Eco Park",
        "division": "Mymensingh",
        "district": "Sherpur",
        "category": "Eco Park",
        "description": "A forested border-hill park with viewpoints, trails and picnic areas.",
        "rating": 4.5,
        "popular": true,
        "viral": false
    },
    {
        "id": "gajni-obokash",
        "name": "Gajni Obokash",
        "division": "Mymensingh",
        "district": "Sherpur",
        "category": "Park",
        "description": "A scenic recreation area near the Garo Hills and Indian border.",
        "rating": 4.5,
        "popular": true,
        "viral": true
    },
    {
        "id": "alexander-castle",
        "name": "Alexander Castle",
        "division": "Mymensingh",
        "district": "Mymensingh",
        "category": "Heritage",
        "description": "A distinctive historic building associated with colonial-era Mymensingh.",
        "rating": 4.3,
        "popular": false,
        "viral": false
    }
];


function safePlaceParse(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value !== null ? value : fallback;
    } catch (error) {
        return fallback;
    }
}

function escapePlaceHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getPlaceImage(place) {
    return place.image || `/assets/places/${place.id}.jpg`;
}

function getSavedPlaces() {
    return safePlaceParse("savedPlaces", []);
}

function placeIsSaved(placeId) {
    return getSavedPlaces().some(function (item) {
        return String(item.id) === String(placeId);
    });
}

function getPlaceById(placeId) {
    return touristPlaces.find(function (place) {
        return String(place.id) === String(placeId);
    });
}

function ensurePlacesControls() {
    const searchBox = document.querySelector(".search-box");
    const categorySelect = document.getElementById("category");
    const placesContainer = document.getElementById("placesContainer");

    if (!searchBox || !placesContainer) return;

    searchBox.classList.add("dynamic-places-filter");

    if (categorySelect) {
        const categories = [...new Set(touristPlaces.map(function (place) {
            return place.category;
        }))].sort();

        categorySelect.innerHTML =
            '<option value="all">All Categories</option>' +
            categories.map(function (category) {
                return `<option value="${escapePlaceHTML(category)}">${escapePlaceHTML(category)}</option>`;
            }).join("");
    }

    const searchButton = searchBox.querySelector("button");

    if (!document.getElementById("divisionFilter")) {
        const divisionSelect = document.createElement("select");
        divisionSelect.id = "divisionFilter";
        divisionSelect.innerHTML = `
            <option value="all">All Divisions</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barishal">Barishal</option>
            <option value="Mymensingh">Mymensingh</option>
        `;
        searchBox.insertBefore(divisionSelect, searchButton);
    }

    if (!document.getElementById("popularityFilter")) {
        const popularitySelect = document.createElement("select");
        popularitySelect.id = "popularityFilter";
        popularitySelect.innerHTML = `
            <option value="all">All Places</option>
            <option value="viral">Viral Places</option>
            <option value="popular">Popular Places</option>
            <option value="hidden">Hidden Gems</option>
        `;
        searchBox.insertBefore(popularitySelect, searchButton);
    }

    if (!document.getElementById("placeSort")) {
        const sortSelect = document.createElement("select");
        sortSelect.id = "placeSort";
        sortSelect.innerHTML = `
            <option value="recommended">Recommended</option>
            <option value="rating-high">Highest Rated</option>
            <option value="name-az">Name A–Z</option>
            <option value="division-az">Division A–Z</option>
        `;
        searchBox.insertBefore(sortSelect, searchButton);
    }

    if (!document.getElementById("placesResultBar")) {
        const resultBar = document.createElement("div");
        resultBar.id = "placesResultBar";
        resultBar.className = "places-result-bar";
        resultBar.innerHTML = `
            <div>
                <strong id="visiblePlacesCount">0</strong>
                <span>places showing</span>
            </div>
            <p id="totalPlacesText">Explore destinations across all 8 divisions.</p>
        `;
        placesContainer.parentNode.insertBefore(resultBar, placesContainer);
    }

    if (!document.getElementById("loadMorePlacesWrap")) {
        const loadMoreWrap = document.createElement("div");
        loadMoreWrap.id = "loadMorePlacesWrap";
        loadMoreWrap.className = "load-more-places-wrap";
        loadMoreWrap.innerHTML = `
            <button type="button" id="loadMorePlacesBtn" class="load-more-places-btn">
                <i class="fa-solid fa-plus"></i>
                Load More Places
            </button>
        `;
        placesContainer.insertAdjacentElement("afterend", loadMoreWrap);
    }
}

function injectPlacesStyles() {
    if (document.getElementById("travelverseDynamicPlacesStyles")) return;

    const style = document.createElement("style");
    style.id = "travelverseDynamicPlacesStyles";
    style.textContent = `
        .dynamic-places-filter {
            display:grid !important;
            grid-template-columns:minmax(230px,1.4fr) repeat(4,minmax(145px,.7fr)) auto;
            gap:12px !important;
            align-items:center;
        }

        .dynamic-places-filter input,
        .dynamic-places-filter select,
        .dynamic-places-filter button {
            min-height:48px;
            width:100%;
            border-radius:14px;
        }

        .dynamic-places-filter select {
            padding:0 12px;
            color:var(--tv-text,#111827);
            background:var(--tv-input,#fff);
            border:1px solid var(--tv-border,#e2e8f0);
            outline:none;
        }

        .places-result-bar {
            width:min(1400px,90%);
            margin:30px auto 0;
            padding:16px 20px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:20px;
            border-radius:18px;
            color:var(--tv-text,#111827);
            background:var(--tv-card,#fff);
            border:1px solid var(--tv-border,#e2e8f0);
            box-shadow:0 10px 25px rgba(15,23,42,.06);
        }

        .places-result-bar div {
            display:flex;
            align-items:center;
            gap:7px;
        }

        .places-result-bar strong {
            color:var(--tv-primary,#6c63ff);
            font-size:22px;
        }

        .places-result-bar span,
        .places-result-bar p {
            color:var(--tv-muted,#64748b);
            font-size:12px;
        }

        .card {
            position:relative;
        }

        .place-image-wrap {
            position:relative;
            height:230px;
            overflow:hidden;
        }

        .place-image-wrap img {
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
            transition:.4s ease;
        }

        .card:hover .place-image-wrap img {
            transform:scale(1.05);
        }

        .place-badges {
            position:absolute;
            top:14px;
            left:14px;
            right:14px;
            display:flex;
            justify-content:space-between;
            gap:8px;
            z-index:2;
        }

        .place-badge {
            padding:7px 10px;
            border-radius:50px;
            color:#fff;
            font-size:10px;
            font-weight:700;
            background:rgba(15,23,42,.72);
            backdrop-filter:blur(10px);
        }

        .place-badge.viral {
            background:linear-gradient(135deg,#ef4444,#f97316);
        }

        .place-badge.popular {
            background:linear-gradient(135deg,#6c63ff,#9333ea);
        }

        .place-location {
            margin:8px 0;
            display:flex;
            align-items:center;
            gap:6px;
            color:var(--tv-muted,#64748b);
            font-size:11px;
        }

        .place-location i {
            color:var(--tv-primary,#6c63ff);
        }

        .place-rating-row {
            margin-top:12px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:10px;
        }

        .place-category {
            padding:6px 9px;
            border-radius:50px;
            color:var(--tv-primary,#6c63ff);
            background:color-mix(in srgb,var(--tv-primary,#6c63ff) 10%,transparent);
            font-size:10px;
            font-weight:600;
        }

        .card-actions a {
            display:block;
            flex:1;
        }

        .card-actions a button {
            width:100%;
        }

        .empty-places-state {
            grid-column:1/-1;
            min-height:330px;
            padding:45px 25px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            text-align:center;
            border-radius:24px;
            color:var(--tv-text,#111827);
            background:var(--tv-card,#fff);
            border:1px dashed var(--tv-border,#e2e8f0);
        }

        .empty-places-state i {
            color:var(--tv-primary,#6c63ff);
            font-size:42px;
        }

        .empty-places-state h3 {
            margin-top:16px;
        }

        .empty-places-state p {
            margin-top:7px;
            color:var(--tv-muted,#64748b);
            font-size:13px;
        }

        .load-more-places-wrap {
            width:min(1400px,90%);
            margin:35px auto 80px;
            text-align:center;
        }

        .load-more-places-btn {
            min-height:48px;
            padding:0 22px;
            border:none;
            border-radius:15px;
            color:#fff;
            font-weight:600;
            background:linear-gradient(135deg,var(--tv-primary,#6c63ff),var(--tv-secondary,#9333ea));
            box-shadow:0 12px 26px rgba(108,99,255,.24);
            cursor:pointer;
        }

        .load-more-places-wrap.hidden {
            display:none;
        }

        @media(max-width:1100px) {
            .dynamic-places-filter {
                grid-template-columns:repeat(3,1fr);
            }

            .dynamic-places-filter input {
                grid-column:1/-1;
            }
        }

        @media(max-width:700px) {
            .dynamic-places-filter {
                grid-template-columns:1fr;
            }

            .dynamic-places-filter input {
                grid-column:auto;
            }

            .places-result-bar {
                align-items:flex-start;
                flex-direction:column;
            }
        }
    `;

    document.head.appendChild(style);
}

function getFilteredPlaces() {
    const searchValue =
        (document.getElementById("searchPlace")?.value || "")
            .trim()
            .toLowerCase();

    const categoryValue =
        document.getElementById("category")?.value || "all";

    const divisionValue =
        document.getElementById("divisionFilter")?.value || "all";

    const popularityValue =
        document.getElementById("popularityFilter")?.value || "all";

    const sortValue =
        document.getElementById("placeSort")?.value || "recommended";

    let filtered = touristPlaces.filter(function (place) {
        const searchableText = [
            place.name,
            place.division,
            place.district,
            place.category,
            place.description
        ].join(" ").toLowerCase();

        const matchesSearch =
            !searchValue ||
            searchableText.includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            place.category === categoryValue;

        const matchesDivision =
            divisionValue === "all" ||
            place.division === divisionValue;

        const matchesPopularity =
            popularityValue === "all" ||
            (popularityValue === "viral" && place.viral) ||
            (popularityValue === "popular" && place.popular) ||
            (popularityValue === "hidden" && !place.popular && !place.viral);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesDivision &&
            matchesPopularity
        );
    });

    filtered.sort(function (firstPlace, secondPlace) {
        if (sortValue === "rating-high") {
            return Number(secondPlace.rating) - Number(firstPlace.rating);
        }

        if (sortValue === "name-az") {
            return firstPlace.name.localeCompare(secondPlace.name);
        }

        if (sortValue === "division-az") {
            return (
                firstPlace.division.localeCompare(secondPlace.division) ||
                firstPlace.name.localeCompare(secondPlace.name)
            );
        }

        const firstScore =
            (firstPlace.viral ? 3 : 0) +
            (firstPlace.popular ? 2 : 0) +
            Number(firstPlace.rating);

        const secondScore =
            (secondPlace.viral ? 3 : 0) +
            (secondPlace.popular ? 2 : 0) +
            Number(secondPlace.rating);

        return secondScore - firstScore;
    });

    return filtered;
}

function createPlaceCard(place) {
    const saved = placeIsSaved(place.id);

    const statusBadge = place.viral
        ? `
            <span class="place-badge viral">
                <i class="fa-solid fa-fire"></i>
                Viral
            </span>
        `
        : place.popular
            ? `
                <span class="place-badge popular">
                    <i class="fa-solid fa-star"></i>
                    Popular
                </span>
            `
            : `
                <span class="place-badge">
                    <i class="fa-solid fa-gem"></i>
                    Hidden Gem
                </span>
            `;

    return `
        <article
            class="card"
            data-category="${escapePlaceHTML(place.category)}"
            data-place-id="${escapePlaceHTML(place.id)}">

            <div class="place-image-wrap">

                <img
                    src="${escapePlaceHTML(getPlaceImage(place))}"
                    alt="${escapePlaceHTML(place.name)}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='${DEFAULT_PLACE_IMAGE}';">

                <div class="place-badges">

                    ${statusBadge}

                    <span class="place-badge">
                        ${escapePlaceHTML(place.division)}
                    </span>

                </div>

            </div>

            <div class="content">

                <h2>
                    ${escapePlaceHTML(place.name)}
                </h2>

                <p class="place-location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${escapePlaceHTML(place.district)},
                    ${escapePlaceHTML(place.division)}

                </p>

                <p>
                    ${escapePlaceHTML(place.description)}
                </p>

                <div class="place-rating-row">

                    <span>
                        ⭐ ${Number(place.rating).toFixed(1)}
                    </span>

                    <span class="place-category">
                        ${escapePlaceHTML(place.category)}
                    </span>

                </div>

                <div class="card-actions">

                    <a
                        href="hotels.html?destination=${encodeURIComponent(place.id)}"
                        data-action="hotels"
                        data-id="${escapePlaceHTML(place.id)}">

                        <button type="button">

                            <i class="fa-solid fa-hotel"></i>

                            View Hotels

                        </button>

                    </a>

                    <button
                        type="button"
                        class="save-place-btn ${saved ? "saved" : ""}"
                        data-action="save"
                        data-id="${escapePlaceHTML(place.id)}">

                        <i class="fa-solid ${saved ? "fa-check" : "fa-bookmark"}"></i>

                        ${saved ? "Saved" : "Save"}

                    </button>

                </div>

            </div>

        </article>
    `;
}

function renderPlaces() {
    const container =
        document.getElementById("placesContainer");

    const loadMoreWrap =
        document.getElementById("loadMorePlacesWrap");

    const visibleCount =
        document.getElementById("visiblePlacesCount");

    const totalText =
        document.getElementById("totalPlacesText");

    if (!container) return;

    const filteredPlaces =
        getFilteredPlaces();

    const visiblePlaces =
        filteredPlaces.slice(0, visiblePlaceCount);

    if (filteredPlaces.length === 0) {
        container.innerHTML = `
            <div class="empty-places-state">

                <i class="fa-solid fa-map-location-dot"></i>

                <h3>
                    No tourist places found
                </h3>

                <p>
                    Try another name, category, division or popularity filter.
                </p>

            </div>
        `;
    } else {
        container.innerHTML =
            visiblePlaces
                .map(createPlaceCard)
                .join("");
    }

    if (visibleCount) {
        visibleCount.textContent =
            visiblePlaces.length;
    }

    if (totalText) {
        totalText.textContent =
            `${filteredPlaces.length} destinations matched from ${touristPlaces.length} total places.`;
    }

    if (loadMoreWrap) {
        loadMoreWrap.classList.toggle(
            "hidden",
            visiblePlaces.length >= filteredPlaces.length ||
            filteredPlaces.length === 0
        );
    }
}

function resetPlacePaginationAndRender() {
    visiblePlaceCount = PLACE_PAGE_SIZE;
    renderPlaces();
}

function searchPlace() {
    resetPlacePaginationAndRender();
}

function filterPlaces() {
    resetPlacePaginationAndRender();
}

function saveDynamicPlace(placeId) {
    const place =
        getPlaceById(placeId);

    if (!place) return;

    let savedPlaces =
        getSavedPlaces();

    const existingIndex =
        savedPlaces.findIndex(function (item) {
            return String(item.id) === String(place.id);
        });

    if (existingIndex >= 0) {
        savedPlaces.splice(existingIndex, 1);

        localStorage.setItem(
            "savedPlaces",
            JSON.stringify(savedPlaces)
        );

        alert("Place removed from saved list!");
    } else {
        savedPlaces.unshift({
            id: place.id,
            name: place.name,
            location: `${place.district}, ${place.division}`,
            district: place.district,
            division: place.division,
            category: place.category,
            rating: Number(place.rating).toFixed(1),
            image: getPlaceImage(place),
            description: place.description
        });

        localStorage.setItem(
            "savedPlaces",
            JSON.stringify(savedPlaces)
        );

        alert("Place saved successfully!");
    }

    renderPlaces();
}

function savePlace(button) {
    if (!button) return;
    saveDynamicPlace(button.dataset.id);
}

function openDestinationHotels(placeId) {
    const place =
        getPlaceById(placeId);

    if (!place) return;

    localStorage.setItem(
        "selectedPlace",
        JSON.stringify({
            id: place.id,
            name: place.name,
            location: `${place.district}, ${place.division}`,
            district: place.district,
            division: place.division,
            image: getPlaceImage(place),
            rating: place.rating
        })
    );
}

function handlePlacesContainerClick(event) {
    const actionElement =
        event.target.closest("[data-action]");

    if (!actionElement) return;

    const action =
        actionElement.dataset.action;

    const placeId =
        actionElement.dataset.id;

    if (action === "save") {
        event.preventDefault();
        saveDynamicPlace(placeId);
    }

    if (action === "hotels") {
        openDestinationHotels(placeId);
    }
}

function setupPlacesEvents() {
    const searchInput =
        document.getElementById("searchPlace");

    const placesContainer =
        document.getElementById("placesContainer");

    const loadMoreButton =
        document.getElementById("loadMorePlacesBtn");

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            resetPlacePaginationAndRender
        );
    }

    [
        "category",
        "divisionFilter",
        "popularityFilter",
        "placeSort"
    ].forEach(function (elementId) {
        const element =
            document.getElementById(elementId);

        if (element) {
            element.addEventListener(
                "change",
                resetPlacePaginationAndRender
            );
        }
    });

    if (placesContainer) {
        placesContainer.addEventListener(
            "click",
            handlePlacesContainerClick
        );
    }

    if (loadMoreButton) {
        loadMoreButton.addEventListener(
            "click",
            function () {
                visiblePlaceCount += PLACE_PAGE_SIZE;
                renderPlaces();
            }
        );
    }
}

window.addEventListener(
    "storage",
    function (event) {
        if (event.key === "savedPlaces") {
            renderPlaces();
        }
    }
);

window.addEventListener(
    "pageshow",
    function () {
        renderPlaces();
    }
);

document.addEventListener(
    "DOMContentLoaded",
    function () {
        injectPlacesStyles();
        ensurePlacesControls();
        setupPlacesEvents();
        renderPlaces();
    }
);

console.log(
    `TravelVerse Places Loaded: ${touristPlaces.length} destinations`
);

