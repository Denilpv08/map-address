/* ════════════════════════════
            DATA
════════════════════════════ */

export const places = [
  {
    id: "home",
    icon: "🏠",
    name: "My Home",
    addr: "12 Maple Avenue",
    color: "#F4A32A",
    cx: 210,
    cy: 320,
    w: 54,
    h: 38,
    desc: "Starting point for all routes. A cozy two-story house next to the traffic light.",
    audioScript:
      "This is my home, located at number twelve, Maple Avenue. It is a cozy two-story house right next to the traffic light. From here you can reach all main places in Maplewood on foot.",
  },
  {
    id: "supermarket",
    icon: "🛒",
    name: "Supermarket",
    addr: "45 Maple Avenue",
    color: "#3A86FF",
    cx: 210,
    cy: 120,
    w: 70,
    h: 42,
    desc: "Open Monday to Saturday, 7 am – 9 pm. Great prices and fresh produce.",
    audioScript:
      "This is the Supermarket on Maple Avenue. It is open Monday to Saturday from seven in the morning to nine at night. It is next to the pharmacy and in front of the park entrance.",
  },
  {
    id: "school",
    icon: "🏫",
    name: "Maplewood School",
    addr: "8 Oak Street",
    color: "#FF6B6B",
    cx: 370,
    cy: 120,
    w: 72,
    h: 42,
    desc: "Primary and secondary school. Rated one of the best in the district.",
    audioScript:
      "This is Maplewood School, located on Oak Street. It offers primary and secondary education and is rated one of the best schools in the district. It is in front of the Corner Café.",
  },
  {
    id: "park",
    icon: "🌳",
    name: "Central Park",
    addr: "Oak St & Maple Ave",
    color: "#5BAD6F",
    cx: 400,
    cy: 270,
    w: 100,
    h: 90,
    desc: "Beautiful green space with a fountain, benches, and walking paths. Open 24 h.",
    audioScript:
      "Welcome to Central Park! It is located at the corner of Oak Street and Maple Avenue. It has a beautiful fountain, benches, and walking paths. The park is open twenty-four hours a day.",
  },
  {
    id: "hospital",
    icon: "🏥",
    name: "City Hospital",
    addr: "2 River Road",
    color: "#FF4D6D",
    cx: 90,
    cy: 490,
    w: 72,
    h: 42,
    desc: "Emergency services available 24/7. Pharmacy inside. Easy parking.",
    audioScript:
      "This is the City Hospital on River Road. Emergency services are available twenty-four hours a day. There is a pharmacy inside and easy parking. It is next to the river, in the south part of the neighborhood.",
  },
  {
    id: "subway",
    icon: "🚇",
    name: "Subway Station",
    addr: "Pine Boulevard",
    color: "#6C63FF",
    cx: 370,
    cy: 490,
    w: 70,
    h: 42,
    desc: "Line A & B. Trains every 8 minutes during rush hour.",
    audioScript:
      "This is the Subway Station on Pine Boulevard. Lines A and B stop here. During rush hour, trains arrive every eight minutes. The entrance is next to the Fashion Store.",
  },
  {
    id: "cafe",
    icon: "☕",
    name: "The Corner Café",
    addr: "1 Oak St (NE corner)",
    color: "#D4845A",
    cx: 510,
    cy: 120,
    w: 70,
    h: 40,
    desc: "Artisan coffee, pastries, and free Wi-Fi. Open 6 am – 8 pm.",
    audioScript:
      "This is the Corner Café, on the northeast corner of Oak Street. It serves artisan coffee, pastries, and offers free Wi-Fi. It is open from six in the morning to eight in the evening.",
  },
  {
    id: "library",
    icon: "📚",
    name: "Public Library",
    addr: "30 Elm Lane",
    color: "#4ECDC4",
    cx: 510,
    cy: 320,
    w: 68,
    h: 40,
    desc: "Free books, study rooms, and public computers. Open Tue–Sun 9 am – 7 pm.",
    audioScript:
      "This is the Public Library on Elm Lane. It offers free books, study rooms, and public computers. It is open Tuesday to Sunday from nine in the morning to seven in the evening.",
  },
  {
    id: "pharmacy",
    icon: "💊",
    name: "Pharmacy",
    addr: "50 Maple Avenue",
    color: "#2EC4B6",
    cx: 90,
    cy: 320,
    w: 65,
    h: 38,
    desc: "24-hour pharmacy. Prescriptions and over-the-counter medicines.",
    audioScript:
      "This is the Pharmacy on Maple Avenue. It is open twenty-four hours a day. You can get prescriptions and over-the-counter medicines here. It is next to the Supermarket.",
  },
  {
    id: "bank",
    icon: "🏦",
    name: "National Bank",
    addr: "15 Pine Boulevard",
    color: "#E9C46A",
    cx: 210,
    cy: 490,
    w: 65,
    h: 38,
    desc: "ATM available 24/7. Open Mon–Fri 9 am – 4 pm.",
    audioScript:
      "This is the National Bank on Pine Boulevard. The ATM is available twenty-four hours a day. The bank is open Monday to Friday from nine in the morning to four in the afternoon.",
  },
  {
    id: "store",
    icon: "🛍️",
    name: "Fashion Store",
    addr: "20 Oak Street",
    color: "#E76F51",
    cx: 510,
    cy: 490,
    w: 68,
    h: 38,
    desc: "Clothing, shoes, and accessories. Weekend sales every Friday night.",
    audioScript:
      "This is the Fashion Store on Oak Street. It sells clothing, shoes, and accessories. There are special sales every Friday night. It is next to the Subway Station.",
  },
];

export const routes = [
  {
    id: "route-supermarket",
    from: "🏠 Home",
    to: "🛒 Supermarket",
    emoji: "🛒",
    steps: [
      '<span class="route-keyword">Go straight on</span> Maple Avenue heading <strong>north</strong> for two blocks.',
      "The Supermarket is on your <strong>left side</strong>, next to the pharmacy.",
      '<span class="route-keyword">It is in front of</span> the park entrance.',
      '<span class="route-keyword">Five minutes by foot.</span>',
    ],
    audioScript: `"To get to the Supermarket from Home:
Go straight on Maple Avenue heading north for two blocks.
The supermarket is on your left side, next to the pharmacy.
It is in front of the park entrance. Five minutes by foot."`,
  },
  {
    id: "route-cafe",
    from: "🏠 Home",
    to: "☕ Corner Café",
    emoji: "☕",
    steps: [
      '<span class="route-keyword">Go straight on</span> Maple Avenue heading <strong>north</strong> for one block.',
      'At the traffic light, <span class="route-keyword">turn right</span> onto Oak Street.',
      'Walk one block east. <span class="route-keyword">Cross the street</span> at the pedestrian <em>crossing</em>.',
      'The Café is on the <em>corner</em>, <span class="route-keyword">in front of</span> the school. <span class="route-keyword">Seven minutes on foot.</span>',
    ],
    audioScript: `"To get to the Corner Café from Home:
Go straight on Maple Avenue heading north for one block.
At the traffic light, turn right onto Oak Street.
Walk one block east and cross the street at the pedestrian crossing.
The café is on the corner, in front of the school. Seven minutes on foot."`,
  },
  {
    id: "route-park",
    from: "🏠 Home",
    to: "🌳 Central Park",
    emoji: "🌳",
    steps: [
      '<span class="route-keyword">Go straight on</span> Maple Avenue heading <strong>north</strong>.',
      'At the first <em>traffic light</em>, <span class="route-keyword">turn right</span> on Oak Street.',
      "Walk straight for two blocks past the <em>roundabout</em>.",
      'The Park is <span class="route-keyword">in front of you</span>. <span class="route-keyword">Five minutes by foot.</span>',
    ],
    audioScript: `"To get to Central Park from Home:
Go straight on Maple Avenue heading north.
At the first traffic light, turn right onto Oak Street.
Walk straight for two blocks, past the roundabout.
The park is right in front of you. Five minutes by foot."`,
  },
  {
    id: "route-hospital",
    from: "🏠 Home",
    to: "🏥 City Hospital",
    emoji: "🏥",
    steps: [
      "Head <strong>south</strong> on Maple Avenue for two blocks.",
      '<span class="route-keyword">Turn left</span> at the corner onto River Road.',
      '<span class="route-keyword">Cross the street</span> at the pedestrian <em>bridge</em>.',
      'The Hospital is <span class="route-keyword">next to</span> the river. <span class="route-keyword">Ten minutes by foot.</span>',
    ],
    audioScript: `"To get to City Hospital from Home:
Head south on Maple Avenue for two blocks.
Turn left at the corner onto River Road.
Cross the street at the pedestrian bridge.
The hospital is the large building next to the river. Ten minutes by foot."`,
  },
  {
    id: "route-subway",
    from: "🏠 Home",
    to: "🚇 Subway Station",
    emoji: "🚇",
    steps: [
      "Walk <strong>east</strong> on Pine Boulevard for three blocks.",
      'At the <em>roundabout</em>, <span class="route-keyword">turn right</span> and go south half a block.',
      'The Station entrance is <span class="route-keyword">next to</span> the Fashion Store.',
      '<span class="route-keyword">Eight minutes by foot.</span>',
    ],
    audioScript: `"To get to the Subway Station from Home:
Walk east on Pine Boulevard for three blocks.
At the roundabout, turn right and go south half a block.
The station entrance is next to the Fashion Store, in front of the park.
Eight minutes by foot."`,
  },
];
