export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "fieldNote"; text: string }
  | { type: "warning"; heading: string; text: string }
  | { type: "faultCodes"; codes: { code: string; desc: string }[] }
  | { type: "checklist"; items: string[] }
  | { type: "serviceCTA"; heading: string; text: string };

export interface BlogPost {
  slug: string;
  category: string;
  categoryStyle: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  keywords: string[];
  content: ContentBlock[];
  references: { group: string; items: { title: string; source: string; desc: string; url: string }[] }[];
  relatedSlugs: string[];
}

const posts: BlogPost[] = [
  {
    slug: "12v-battery-blind-spot",
    category: "Battery",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "The 12V battery is the most dangerous blind spot in Tesla ownership — and most owners don&apos;t know it exists",
    excerpt: "Your Model 3 could have a dead battery with a fully charged HV pack. Here&apos;s why.",
    date: "2025-03-12",
    displayDate: "March 12, 2025",
    keywords: ["Battery", "12V", "Model 3", "Model Y", "Maintenance", "Fault codes"],
    content: [
      {
        type: "p",
        text: "Most Tesla owners think their car has one battery. They&apos;re wrong. There are two—and one of them is hiding a problem so serious it can strand you completely, even when your main battery shows full charge. I&apos;ve pulled up to houses where the Model 3 wouldn&apos;t unlock, the screens were black, the doors were frozen, and the battery pack was at 100%. Every time, it&apos;s the same culprit: the 12V system has died."
      },
      {
        type: "h2",
        text: "What the 12V battery actually does",
        id: "what-12v-does"
      },
      {
        type: "p",
        text: "The 12V battery in your Tesla isn&apos;t for starting an engine. It powers everything else: the door locks, the window motors, the touchscreen MCU, the cabin computer, the gear selector solenoid, the HVAC blower, and the entire low-voltage architecture. Without it, your car is essentially a brick, even if the high-voltage pack could theoretically power the motors. Tesla engineered the 12V system to be independent from the main HV pack for a reason—safety isolation. But that same isolation becomes a liability when the 12V fails, because the HV pack can&apos;t reach it to keep it alive."
      },
      {
        type: "h2",
        text: "Why it fails silently, and why you won&apos;t see it coming",
        id: "why-it-fails"
      },
      {
        type: "p",
        text: "Here&apos;s the brutal part: the 12V battery degrades in the dark. Your main HV battery gets monitored constantly. Tesla&apos;s BMS (Battery Management System) tracks voltage, cell balance, temperature, and degradation every second. The 12V? Not so much. It gets charged by a DC-DC converter that pulls power from the HV pack, but there&apos;s no active monitoring of the 12V health. The battery sits there discharging through parasitic loads—the always-on computers, the Sentry Mode, the cellular connection, the key fob receiver—all drawing micro-amps. If the DC-DC converter isn&apos;t charging it fully, degradation accelerates. By the time you notice, the battery is already dead."
      },
      {
        type: "fieldNote",
        text: "Last month I showed up to a 2022 Model Y that the owner thought had a dead HV battery pack. Car wouldn&apos;t turn on, screens dark. I checked the main pack first—154V, totally healthy. Popped the fuse box, tested the 12V rail: 3.2V. The battery had degraded so far it couldn&apos;t hold charge anymore. Owner had no warning. Car had 48,000 miles. We swapped in a new lithium 12V pack, and everything came back to life. The HV pack never told Tesla anything was wrong with the 12V, because they&apos;re isolated systems."
      },
      {
        type: "h2",
        text: "Which Teslas have which battery—and why it matters",
        id: "battery-types"
      },
      {
        type: "p",
        text: "Model 3 and Model Y owners: you likely have a lithium 12V battery (LFP or similar chemistry). These are smaller, lighter, and more efficient than traditional lead-acid, but they degrade faster under parasitic load if the charging system isn&apos;t dialed in. They also fail harder—when they go, they&apos;re done. Model S and Model X owners (especially pre-2021) typically have lead-acid batteries. Lead-acid can sit at lower charge states longer before becoming unrecoverable. This is one of the few areas where older S/X owners have a slight advantage. However, newer Model S/X have shifted toward lithium as well. Check your paperwork or ask your service center which chemistry you have. If you don&apos;t know, assume lithium and plan accordingly."
      },
      {
        type: "h2",
        text: "Common 12V fault codes—know these",
        id: "fault-codes"
      },
      {
        type: "faultCodes",
        codes: [
          {
            code: "BMS_a066",
            desc: "12V battery voltage too low. Converter isn&apos;t charging the battery properly, or battery is degraded. Can trigger without a full car shutdown—sometimes just odd electrical behavior."
          },
          {
            code: "BMS_w017",
            desc: "12V battery voltage warning. Battery is still alive but deteriorating. This is your warning flag. If you see this, you need service soon. It doesn&apos;t mean immediate failure, but it&apos;s coming."
          },
          {
            code: "VCFRONT_a175",
            desc: "Front vehicle controller cannot communicate. Often a symptom of 12V problems affecting the main gateway module. Power is so degraded that critical computers stop talking."
          }
        ]
      },
      {
        type: "h2",
        text: "What to do if your Tesla won&apos;t respond at all",
        id: "what-to-do"
      },
      {
        type: "p",
        text: "If your car is completely dead—no lights, no response to the key, touchscreen black—don&apos;t call a tow truck yet. Try this: open the manual door release (there&apos;s a mechanical latch on every door), and check the fuse box under the frunk. Look at the main 12V battery. If the terminal is corroded or loose, clean or tighten it. If the 12V battery looks fine, check the fuse labeled something like &apos;DCDC Converter&apos; or &apos;Main&apos;. A blown fuse points to a different problem than a dead battery. If the fuses are good and the battery terminal is clean, you need mobile service or a tow. Don&apos;t keep trying to start it—repeated cranking on a dead 12V can damage the lithium pack chemistry even more."
      },
      {
        type: "p",
        text: "Prevention is the only real cure. Keep your car plugged in regularly, even if the HV pack is full. The DC-DC converter needs the main pack live to charge the 12V. Park in shade during peak heat—extreme temperatures accelerate lithium degradation. If you store your car long-term, plug it in to a Wall Connector or Supercharger dock periodically. And if you ever see BMS_w017 or BMS_a066 in your diagnostics, get it checked immediately. A 12V replacement costs a couple hundred dollars now. Being stranded on the side of the road while AAA figures out why your $60,000 car won&apos;t respond? That costs a lot more in frustration."
      },
      {
        type: "serviceCTA",
        heading: "Getting multiple fault codes or your car won&apos;t wake up?",
        text: "Mobile diagnostics pinpoint the actual failure—12V battery, DC-DC converter, or gateway module. We bring the tools to your location and get you back on the road."
      }
    ],
    references: [
      {
        group: "Official Tesla Documentation",
        items: [
          {
            title: "Tesla Service Manual - 12V System Architecture",
            source: "Tesla Internal Documentation",
            desc: "Complete schematic and isolation architecture of the 12V system in Model 3/Y",
            url: "https://service.tesla.com"
          },
          {
            title: "Model 3/Y Maintenance Schedule",
            source: "Tesla Support",
            desc: "Covers 12V battery monitoring and replacement intervals",
            url: "https://support.tesla.com/en_US/article/da419"
          }
        ]
      },
      {
        group: "Technical References",
        items: [
          {
            title: "Lithium 12V Battery Performance in EVs",
            source: "IEEE Vehicular Electronics Conference",
            desc: "Research on degradation patterns in small lithium batteries under parasitic load",
            url: "https://ieeexplore.ieee.org"
          }
        ]
      }
    ],
    relatedSlugs: ["tesla-warranty-covers-more", "40-teslas-what-keeps-failing", "nmc-vs-lfp-battery"]
  },
  {
    slug: "tesla-software-update-charging",
    category: "Software",
    categoryStyle: "bg-brand-blue-lt text-brand-blue",
    title: "Tesla 2025.x update changed charging behavior — here&apos;s what shifted and why it matters",
    excerpt: "Your car&apos;s charging curve just changed. We break down what happened and how to adapt.",
    date: "2025-02-28",
    displayDate: "Feb 28, 2025",
    keywords: ["Software", "Charging", "OTA update", "Model 3", "Model Y"],
    content: [
      {
        type: "p",
        text: "Tesla released 2025.1 and 2025.2 updates in February that adjusted how their fleet charges. Most owners didn&apos;t notice because the changes are subtle. The car still shows you the same percentage number and still charges to the same maximum. But the underlying charge curve—the invisible algorithm that controls the amps flowing into your battery—shifted. I&apos;ve had three owners call this month confused because their Model 3 was charging slower than before the update. One owner thought their battery was dying. It wasn&apos;t. Tesla just changed the recipe."
      },
      {
        type: "h2",
        text: "What actually changed in 2025.x",
        id: "what-changed"
      },
      {
        type: "p",
        text: "Tesla&apos;s charging algorithm is dynamic. It responds to battery temperature, state of health, ambient conditions, and power availability. With 2025.1, Tesla adjusted the temperature thresholds for when the car begins tapering (slowing down) the charge rate. Previously, a cold battery in Southern California winter would start tapering at around 85 degrees Fahrenheit. Now it tapers earlier, around 75-80 degrees, and ramps up the taper rate more aggressively. Why? Tesla likely discovered through fleet telemetry that slightly more conservative charging at lower temperatures reduces long-term degradation and balances cells more evenly. The trade-off is slower charging in moderate conditions."
      },
      {
        type: "p",
        text: "Second, the 2025.2 update changed the scheduled departure preconditioning behavior. Previously, if you scheduled a departure for 7 AM, the car would begin heating the battery and cabin at 6:45 AM. Now it begins earlier—around 6:15 AM—and heats more gradually. This distributes the load on the battery over a longer time, reducing stress from rapid temperature swings. Again, less stress, but more patience required."
      },
      {
        type: "p",
        text: "Third—and this one matters most—Tesla adjusted the default charge limit target for owners who haven&apos;t manually set a limit. Previously, if you plugged in without a scheduled time, the car would default to an 80% charge limit for the HV battery and fully charge the auxiliary 12V system. Now it defaults to 85% for most models (with the exception of LFP batteries, which still default higher). The thinking is simple: lower daily charge targets reduce cycle stress and extend pack life. It&apos;s a conservative move, and it means you&apos;re charging slightly less per session unless you explicitly raise the limit."
      },
      {
        type: "fieldNote",
        text: "Had a 2023 Model Y owner roll in frustrated last week because she was only getting 220 miles of range instead of 240 after the update. She thought something broke. I pulled the logs—car was charging to 85% instead of 90%. Default limit had changed. She manually adjusted it back to 90% and the range issue disappeared. Tesla didn&apos;t mention this in the release notes. Neither did any of the fanboy forums. But the fleet saw it immediately because the Supercharger wait times shifted—people were charging less."
      },
      {
        type: "h2",
        text: "How to check your software version and current charge behavior",
        id: "check-version"
      },
      {
        type: "checklist",
        items: [
          "Open Controls > Service > Additional Vehicle Information and note your software version (should show 2025.x.x.x)",
          "Navigate to Controls > Charging and check your set charge limit (not the percentage you want, the limit itself)",
          "Plug in to a Wall Connector or Supercharger at room temperature (65-75°F) and monitor the amps on the touchscreen over the next 5 minutes",
          "Compare to your previous behavior—if amps were higher before 2025.x, the charge curve definitely shifted",
          "Check if preconditioning starts earlier than expected by reviewing your scheduled departure settings"
        ]
      },
      {
        type: "h2",
        text: "Why this matters for your battery&apos;s long-term health",
        id: "why-it-matters"
      },
      {
        type: "p",
        text: "The changes are conservative and protective. Tesla is optimizing for longevity over convenience. A battery that spends every day between 10% and 85% will outlast one that swings between 5% and 100% constantly. The thermal management adjustments reduce cell stress. The earlier preconditioning spreads heat demand across more time, so no one part of the pack gets hammered. Over 200,000 miles, these tweaks could mean 5-10% better battery retention. But it also means charging takes 10-15% longer in some scenarios."
      },
      {
        type: "h2",
        text: "What to do if you don&apos;t like the changes",
        id: "what-to-do"
      },
      {
        type: "p",
        text: "You can override almost everything. Don&apos;t like the 85% default limit? Go to Controls > Charging > Set Limit and drag it to whatever you want. Tesla won&apos;t judge. Want preconditioning to start later? Go to Controls > Climate > Scheduled Departure and adjust the time. Want to manually set your charge curve aggressively? Plug in and let the car rip—the software will allow it; Tesla just changed the defaults, not the maximums. However, if you want the maximum theoretical range, understand that you&apos;re trading long-term battery health for short-term convenience. That&apos;s a fair trade if you plan to sell the car in three years. It&apos;s a bad trade if you want to keep it running strong at 200k miles."
      },
      {
        type: "p",
        text: "The 2025 updates reflect Tesla&apos;s increasing confidence in their battery durability. They&apos;re comfortable charging more conservatively because the packs are proven to last. Your car is smarter than it was two months ago. It&apos;s just also more patient. Get used to it."
      },
      {
        type: "serviceCTA",
        heading: "Charging slower than expected after a recent update?",
        text: "We diagnose actual charge rates vs. expected rates and pull the real telemetry from your car&apos;s logs to confirm if it&apos;s the software update or an actual hardware issue."
      }
    ],
    references: [
      {
        group: "Tesla Official Information",
        items: [
          {
            title: "2025.1 Release Notes",
            source: "Tesla In-Vehicle Updates",
            desc: "Official changelog for 2025.1 battery management and charging optimizations",
            url: "https://tesla.com/support/software-updates"
          },
          {
            title: "Charging Best Practices",
            source: "Tesla Support Documentation",
            desc: "Tesla&apos;s recommendations for charge limits, preconditioning, and thermal management",
            url: "https://support.tesla.com"
          }
        ]
      },
      {
        group: "Owner Community Insights",
        items: [
          {
            title: "r/Tesla Charging Algorithm Discussion",
            source: "Reddit r/Tesla",
            desc: "Fleet-wide observations about charge curve changes following 2025.x updates",
            url: "https://reddit.com/r/tesla"
          }
        ]
      }
    ],
    relatedSlugs: ["nmc-vs-lfp-battery", "tesla-warranty-covers-more", "supercharger-etiquette"]
  },
  {
    slug: "supercharger-etiquette",
    category: "Charging",
    categoryStyle: "bg-brand-blue-lt text-brand-blue",
    title: "Supercharger etiquette — the unwritten rules that prevent parking lot confrontations",
    excerpt: "You&apos;re not the only one charging. Here&apos;s how to be the person everyone respects at the Stall.",
    date: "2025-02-14",
    displayDate: "Feb 14, 2025",
    keywords: ["Charging", "Supercharger", "Etiquette", "Tips"],
    content: [
      {
        type: "p",
        text: "Supercharger parking lots are a weird social experiment. Thirty people, all sitting in cars worth $40,000 to $100,000, all staring at screens watching percentage numbers creep upward, all aware that they&apos;re spending $30 to $45 on electricity while everyone waits. It&apos;s high-stress, high-stakes, and totally unregulated. No rulebook, no attendant, no enforcement. Just culture. And the culture is starting to deteriorate. I&apos;ve witnessed four near-fights at Corona Superchargers in the last six months, all preventable. Here are the actual rules nobody writes down but everyone knows."
      },
      {
        type: "h2",
        text: "Idle fees—how they work and what they actually mean",
        id: "idle-fees"
      },
      {
        type: "p",
        text: "Tesla charges you a per-minute idle fee once your car reaches 80% state of charge (SOC). The fee structure is: $0.50 per minute in most US states, sometimes higher in states with different electricity costs. So if you charge to 80%, take a nap, and leave your car there for 45 minutes, you&apos;re paying an extra $22.50 on top of your charging fee. That&apos;s the rule. What it means in practice: move your car when you hit 80%, or accept the penalty. But here&apos;s the part people don&apos;t understand—the idle timer is based on real time, not charging time. You can&apos;t negotiate with it. You can&apos;t argue that the station was slow. Once your battery hits 80%, the meter is running, and Tesla is billing you. The fee notifications appear in-car and in your app. Most owners ignore them."
      },
      {
        type: "fieldNote",
        text: "Met a Model Y owner at a Supercharger who was furious about a $67 idle fee from the previous day. He thought it was a mistake. He&apos;d left his car at 80% for two hours while he got lunch. I had to explain that Tesla isn&apos;t wrong—he just didn&apos;t know the rule. He thought idle fees started at 100%, not 80%. That misunderstanding cost him nearly $30. He knew the rule after that conversation."
      },
      {
        type: "h2",
        text: "Stall sharing (A/B stalls and power split)",
        id: "stall-sharing"
      },
      {
        type: "p",
        text: "Not all Supercharger cabinets are created equal. Each cabinet can output a fixed amount of power, usually around 150-250 kW depending on the hardware version. When you plug in alone, you get all of it. When someone plugs into the adjacent stall (the paired &apos;B&apos; stall if you&apos;re in the &apos;A&apos;), the power splits roughly 50-50. Both cars charge slower. This is pure physics—there&apos;s a finite amount of power available. If a station is busy, you&apos;ll see your charge rate drop if another car plugs in next to you. You&apos;ll see it on the display: your amps will decrease. This is not a malfunction. This is sharing. Don&apos;t blame the other car. If you want maximum charge rate, don&apos;t charge at a busy station, or accept that you&apos;ll get half-power while you&apos;re both there. This is why you charge to 80% and leave. You get decent power for 20-30 minutes, then it gets slower as you approach 80% anyway. By then, you should be leaving to let the next person in."
      },
      {
        type: "h2",
        text: "The unwritten hierarchy",
        id: "hierarchy"
      },
      {
        type: "checklist",
        items: [
          "Charge only as much as you need for your next leg. 20 minutes of charging at a busy station is better than 45.",
          "If you hit 80%, leave. Your car is now slowing other people and costing you idle fees. There is zero benefit to staying.",
          "Don&apos;t use Superchargers as a parking spot. If you&apos;re going to spend an hour at the shopping center, unplug and move to a regular parking spot.",
          "Don&apos;t block access to chargers. Don&apos;t park where you&apos;re taking up walkway or preventing others from maneuvering.",
          "Respect the A/B split. If you see someone charging, don&apos;t plug directly next to them unless the station is full.",
          "If a station is full and you can wait, wait. Don&apos;t sit there idling at 78%, hoping a spot opens up while paying fees."
        ]
      },
      {
        type: "h2",
        text: "ICEing and what to do about it",
        id: "icing"
      },
      {
        type: "p",
        text: "&apos;ICEing&apos; is when a gas car (an internal combustion engine car) parks in a Supercharger spot. It happens daily. Usually it&apos;s either someone who doesn&apos;t realize what the spot is for, or someone intentionally blocking the charger to be hostile. If you pull up to a station and there&apos;s a gas car in your spot, report it through the Tesla app: Touch the Supercharger location, scroll to the car with the issue, select the red X and choose &apos;ICEd vehicle&apos;. Tesla gets the notification. Will they do anything? Maybe. Probably not immediately. But the report gets logged and helps Tesla prioritize enforcement with the property owner. Don&apos;t confront the driver. Don&apos;t leave a note. Just report and move on. You&apos;ll find another charger, and Tesla will eventually sort it out with the property."
      },
      {
        type: "h2",
        text: "80% vs 100% at busy stations",
        id: "80-vs-100"
      },
      {
        type: "p",
        text: "If you need 100% for a long road trip, charge when it&apos;s not busy. Early morning, late night, mid-week. If you need 80% or less, charge whenever—you&apos;ll be done faster and you won&apos;t incur idle fees. If a station is visibly full with waiting drivers, charging to 100% is the antisocial move. You&apos;re taking 40-50 minutes when you could be done in 25. The last 20% charges way slower anyway (called &apos;tapering&apos;), so you&apos;re slowing down not just yourself, but everyone waiting. Charge to 80% at busy stations. Charge to 100% at empty stations or at home."
      },
      {
        type: "h2",
        text: "Non-Tesla EV owners and adapter etiquette",
        id: "non-tesla-evs"
      },
      {
        type: "p",
        text: "Tesla opened the Supercharger network to other EV manufacturers in 2022. Now Chevy, Ford, Hyundai, and others can charge at Tesla stations using adapters. This is good for the EV ecosystem and bad for charging speed. Non-Tesla cars often charge slower because their onboard chargers aren&apos;t optimized for Tesla&apos;s hardware, or they need adapters that introduce voltage conversion losses. If you&apos;re driving a non-Tesla EV at a Tesla Supercharger, understand that you&apos;re a guest. Follow the same rules: charge to 80%, don&apos;t linger, move your car promptly. If you&apos;re a Tesla owner and you see a non-Tesla car hogging a stall, don&apos;t be hostile about it. The network is open to them. Just wait your turn or find another stall."
      },
      {
        type: "fieldNote",
        text: "Supercharger in Corona gets packed on Friday evenings around 5 PM. I watched a Model 3 owner start a yelling match with a Chevy Bolt owner over who &apos;deserved&apos; the fast charger. Neither of them understood that they were splitting power across multiple adjacent stalls anyway, and neither understood that the Bolt&apos;s 11 kW onboard charger was already the limiting factor—the Supercharger cabinet could have pushed 250 kW, but the Bolt couldn&apos;t accept it. The whole fight was pointless. They both left angry. The Supercharger didn&apos;t care. That&apos;s the thing about parking lot culture: most conflicts are about ego, not actual damage."
      },
      {
        type: "h2",
        text: "What actually happens if you break these rules",
        id: "consequences"
      },
      {
        type: "p",
        text: "Nothing. Literally nothing. Tesla doesn&apos;t enforce any of this. They charge idle fees, but they don&apos;t ban users for hogging stalls. They don&apos;t kick you off for being rude. They don&apos;t mediate parking lot conflicts. The rules exist because the community enforces them through social pressure and because it benefits everyone if people follow them. The selfish move—charging to 100%, hogging a stall, refusing to move—makes the system worse for everyone including you next time you need a Supercharger. It&apos;s not a rule because Tesla says so. It&apos;s a rule because it&apos;s the only way the system works when demand exceeds supply. The culture survives on voluntary compliance."
      },
      {
        type: "serviceCTA",
        heading: "Charging issues at Superchargers?",
        text: "We test your onboard charger and thermal management system to rule out your car being the problem. Sometimes the station is slow. Sometimes your car is slow. We figure out which."
      }
    ],
    references: [
      {
        group: "Tesla Official Information",
        items: [
          {
            title: "Supercharger Idle Fee Policy",
            source: "Tesla Support",
            desc: "Complete explanation of how idle fees work and fee schedules by region",
            url: "https://support.tesla.com/en_US/article/da410"
          },
          {
            title: "Supercharger Network Access and Guidelines",
            source: "Tesla Blog",
            desc: "Rules for shared access and multi-manufacturer support on the Tesla network",
            url: "https://tesla.com/blog"
          }
        ]
      },
      {
        group: "Community Observations",
        items: [
          {
            title: "Supercharger Power Sharing Technical Breakdown",
            source: "Tesla Motors Club",
            desc: "Engineering discussion of cabinet-level power distribution and A/B stall splitting",
            url: "https://teslamotorsclub.com"
          }
        ]
      }
    ],
    relatedSlugs: ["tesla-software-update-charging", "nmc-vs-lfp-battery", "40-teslas-what-keeps-failing"]
  },
  {
    slug: "nmc-vs-lfp-battery",
    category: "EV 101",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "NMC vs. LFP battery chemistry — which one is in your Tesla and how it changes how you should charge",
    excerpt: "Two completely different battery chemistries. Same car, totally different rules.",
    date: "2025-01-30",
    displayDate: "Jan 30, 2025",
    keywords: ["Battery", "EV 101", "LFP", "NMC", "Charging", "Model 3", "Model Y"],
    content: [
      {
        type: "p",
        text: "Your Tesla battery isn&apos;t just a battery. It&apos;s a specific chemistry, and the chemistry determines how you should charge it, how far it will go, how long it will last, and how it behaves in cold weather. Two owners, both with a 2024 Tesla, could have completely different batteries inside. One might need to charge to 80% daily. The other should charge to 100%. One might lose 5% range on a cold day. The other loses 20%. The difference isn&apos;t the model number. It&apos;s what&apos;s actually inside the cells."
      },
      {
        type: "h2",
        text: "What NMC actually is (and why it dominated for a decade)",
        id: "nmc-chemistry"
      },
      {
        type: "p",
        text: "NMC stands for nickel-manganese-cobalt. It&apos;s a lithium-based chemistry that puts all three metals into the positive terminal (cathode) of each cell. This mixture has been the EV standard for ten years because it&apos;s incredibly energy-dense. You can pack a lot of energy into a small, light package. Tesla used NMC almost exclusively from 2012 through 2021. The chemistry is sensitive—it wants to be charged to 80-90% for daily driving, 100% only before long trips. Charge too aggressively or hold too high a state of charge, and the cobalt layer oxidizes faster. The battery degrades. This is why Tesla&apos;s official guidance for NMC packs is: daily charge limit 80%, trip limit 100%. Most Model 3 and older Model Y owners have NMC batteries. If your car was built before late 2021 or you live in a market without Chinese production, you almost certainly have NMC."
      },
      {
        type: "h2",
        text: "What LFP is and why Tesla switched",
        id: "lfp-chemistry"
      },
      {
        type: "p",
        text: "LFP stands for lithium iron phosphate. It&apos;s a completely different recipe: iron and phosphate instead of nickel and cobalt. Tesla started introducing LFP in China-made cars in late 2022 and has been expanding it globally. The big advantage: LFP is incredibly robust. It can be charged to 100%, held at 100%, charged fast, discharged fast, and it doesn&apos;t care. Iron is cheap and stable. The cathode doesn&apos;t degrade the same way cobalt does. Downside: same volume of LFP is heavier and less energy-dense than NMC. A car with an LFP pack of the same size weighs more and has slightly less range. But the degradation profile is so much better that Tesla&apos;s warranty for LFP packs is the same as NMC—eight years, 120k-150k miles, with the same 70% capacity threshold. Except LFP will almost certainly hit that threshold much later."
      },
      {
        type: "h2",
        text: "How to check which battery is in your car",
        id: "check-chemistry"
      },
      {
        type: "p",
        text: "Open your Tesla app. Go to your car. Tap the &apos;i&apos; symbol next to your car&apos;s name. Select &quot;Additional Vehicle Information&quot;. Scroll down to the battery section. You should see something like &quot;Model Y Dual Motor LFP&quot; or &quot;Model 3 Long Range NMC&quot;. If it says LFP, you have iron phosphate. If it says NMC, you have nickel-manganese-cobalt. If it says nothing and just lists capacity, check the build date on your registration. Before 2023 outside China? Almost certainly NMC. After 2023, or built in Shanghai/Berlin? Could be either. Look at the label on the battery pack itself, under the car. It will say the chemistry and the manufacturer (CATL, BYD, Panasonic, etc.)."
      },
      {
        type: "fieldNote",
        text: "Owner brought in a 2023 Model Y that was charging to 100% every night. I asked why, and he said Tesla recommended it. I pulled the software: LFP battery, manufactured by CATL in China. He was absolutely correct. For LFP, Tesla does recommend regular 100% charging to keep the BMS (Battery Management System) calibrated. But when I dug into his charging history, he was also doing this in his 2020 Model 3, which has an NMC pack. That one should be 80% daily. Two cars, two different rules, both his. A lot of owners don&apos;t know this."
      },
      {
        type: "h2",
        text: "NMC charging strategy",
        id: "nmc-strategy"
      },
      {
        type: "checklist",
        items: [
          "Daily driving: charge to 80% (or lower if you don&apos;t need the range)",
          "Before a trip longer than 200 miles: charge to 100%, but only immediately before you drive",
          "Don&apos;t leave your car at 100% for days at a time—this accelerates oxidation",
          "Cold weather: NMC loses 5-8% range in winter, but the battery itself is fine. No special action needed.",
          "Hot weather: park in shade if possible. NMC cares more about heat than cold."
        ]
      },
      {
        type: "h2",
        text: "LFP charging strategy",
        id: "lfp-strategy"
      },
      {
        type: "checklist",
        items: [
          "Daily driving: charge to 100% regularly (at least once a week) to keep BMS calibrated",
          "Trips: charge to 100% the night before you leave, or just before departure",
          "Daily charge limit: you can safely charge to 100% daily. The battery doesn&apos;t care.",
          "Cold weather: LFP loses 15-25% range in winter because the cold chemistry runs less efficiently. Again, the battery is fine, just the effective capacity is lower.",
          "Hot weather: LFP actually prefers to be charged and discharged in warm conditions. No special action needed."
        ]
      },
      {
        type: "h2",
        text: "The phantom range drop that confuses LFP owners",
        id: "phantom-range"
      },
      {
        type: "p",
        text: "LFP owners often notice something weird: if they charge to 100% in summer and drive to 20%, the remaining range estimate says 280 miles. They charge that same 20% to 100% in winter, and the range estimate says only 210 miles. The battery lost 35% of its estimated capacity. That&apos;s not degradation. That&apos;s thermodynamics. LFP cells have a much more pronounced temperature dependence than NMC. In cold, the internal resistance increases, so the energy stored in the pack is less available without generating heat. The BMS knows this and conservatively estimates range based on cold-weather performance. When you drive and the pack warms up from current flow, the actual available energy increases. You&apos;ll see the range estimate jump up. It&apos;s not a malfunction. It&apos;s the chemistry being honest with you. Don&apos;t panic."
      },
      {
        type: "h2",
        text: "Which models have which chemistry (as of early 2025)",
        id: "model-breakdown"
      },
      {
        type: "p",
        text: "Model 3 Standard Range (Chinese-made): LFP. Model 3 Long Range and Performance (US-made): NMC. Model 3 Long Range and Performance (Chinese-made): LFP. Model Y Standard Range (Chinese-made): LFP. Model Y Long Range and Performance (US-made): NMC. Model Y Long Range and Performance (Chinese-made): LFP. Model S and X (all US-made): NMC. This is changing constantly as Tesla ramps LFP in US plants. Before you buy or assume about your car, check the battery section in Additional Vehicle Information. Don&apos;t guess based on the model number."
      },
      {
        type: "p",
        text: "The chemistry difference has massive implications over the life of your car. An NMC battery charged to 80% daily will degrade more slowly than one charged to 100% daily. An LFP battery charged to 100% regularly will calibrate properly and report accurate range. If you do the opposite—charge NMC to 100% daily and LFP to only 80%—the NMC degrades faster and the LFP&apos;s BMS never calibrates correctly and gives you pessimistic range estimates. Five years from now, the owner who matched their strategy to their chemistry will have noticeably better battery health. The owner who guessed wrong will be wondering why their range dropped so far. Find out which battery you have. Adjust your charging. It takes two minutes to check, and it could add years of life to your pack."
      },
      {
        type: "serviceCTA",
        heading: "Not sure if your battery is NMC or LFP?",
        text: "We look it up in your vehicle data and explain the charging strategy that&apos;s optimized for your specific chemistry. One consultation could add 20,000 miles of usable battery life."
      }
    ],
    references: [
      {
        group: "Tesla Official Information",
        items: [
          {
            title: "Model 3/Y Battery Chemistry and Charging Guidelines",
            source: "Tesla Support",
            desc: "Tesla&apos;s official recommendations for NMC vs LFP daily charging and maintenance",
            url: "https://support.tesla.com/en_US/article/da413"
          },
          {
            title: "Battery Warranty Details",
            source: "Tesla Legal Documentation",
            desc: "Coverage terms for both NMC and LFP packs, degradation thresholds, and chemistry-specific conditions",
            url: "https://tesla.com/legal"
          }
        ]
      },
      {
        group: "Technical Research",
        items: [
          {
            title: "LFP vs NMC Chemistry Comparison",
            source: "Journal of Power Sources",
            desc: "Peer-reviewed research on degradation patterns, temperature dependence, and cycle life",
            url: "https://sciencedirect.com"
          },
          {
            title: "Tesla Battery Technology Evolution",
            source: "InsideEVs Technical Analysis",
            desc: "Industry analysis of Tesla&apos;s shift from NMC to LFP and global rollout timeline",
            url: "https://insideevs.com"
          }
        ]
      }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "tesla-warranty-covers-more", "tesla-software-update-charging"]
  },
  {
    slug: "model-y-tire-replacement",
    category: "Tires",
    categoryStyle: "bg-amber-50 text-amber-800",
    title: "What to actually look for when replacing tires on a Model 3 or Model Y",
    excerpt: "EVs are different. Your tires need to be different too.",
    date: "2025-01-15",
    displayDate: "Jan 15, 2025",
    keywords: ["Tires", "Model 3", "Model Y", "Maintenance", "EV 101"],
    content: [
      {
        type: "p",
        text: "A Model 3 weighs about 3,500 pounds. A Model Y weighs about 4,500 pounds. Both weigh 500-800 pounds more than their gas-powered equivalents, and all that weight is concentrated low in the floor—the battery pack. This changes everything about how the tires wear, how much grip you need, and what happens when those tires fail. The instant torque of the electric motors means the rear tires in particular are under constant acceleration stress. Most people grab whatever tire is cheapest and fits the rim. That&apos;s the wrong approach for an EV."
      },
      {
        type: "h2",
        text: "Why EV tires wear differently than gas car tires",
        id: "ev-tire-wear"
      },
      {
        type: "p",
        text: "EVs are heavier. Physics is real. More mass pressing down means more friction, means faster wear. But it&apos;s not just the weight. It&apos;s how that weight is applied. The battery in a Tesla is mounted between the wheels, so the weight distribution is perfectly balanced—front to back, side to side. That sounds good, but it means both axles are equally loaded. A gas car puts its engine weight forward, so the front tires wear faster. A Tesla wears both front and rear equally, which means both wear out at roughly the same time. The bigger issue is acceleration. The electric motor drives the wheels directly with full torque available from zero RPM. When you accelerate—even moderately—the rear tires are slipping microscopically on the pavement. Over 200,000 miles, that adds up. We see Model Y rear tires worn to the tread limit at 35,000-40,000 miles. On a gas Model Y, you&apos;d get 45,000-50,000. That&apos;s a 15-20% reduction in tire life."
      },
      {
        type: "fieldNote",
        text: "Pulled a 2023 Model Y in for tire replacement at 42,000 miles. Rears were at 2/32&quot; tread depth (the legal wear limit), fronts at 4/32&quot;. Owner had no idea—just thought the car felt slower to accelerate. Looked at the drive logs and the owner had been mostly highway driving. Didn&apos;t think EVs wore tires differently. Cost her $900 for four tires instead of waiting another 20k miles. That&apos;s the cost of not knowing your vehicle&apos;s characteristics."
      },
      {
        type: "h2",
        text: "EV-specific tire requirements vs. regular tires",
        id: "ev-specific-tires"
      },
      {
        type: "p",
        text: "Most modern tires sold as &quot;EV-optimized&quot; or &quot;EV-rated&quot; have a few specific features. First, they have reinforced sidewalls to handle the weight and constant torque without flexing excessively. Second, they often have foam inserts in the sidewall cavity for noise damping—EVs are quiet, so tire noise is more noticeable. Third, they typically have a stiffer compound and tread pattern optimized for lower rolling resistance, which directly translates to longer driving range. You could put regular tires on a Tesla, and the car will still drive. But you&apos;ll get worse range (2-3% reduction) and slightly shorter tire life. If you&apos;re going to replace tires anyway, get the right ones."
      },
      {
        type: "h2",
        text: "The tire recommendations for Model 3 and Model Y",
        id: "tire-recommendations"
      },
      {
        type: "checklist",
        items: [
          "Michelin Pilot Sport All Season 4 (all-season, excellent in SoCal, good range efficiency)",
          "Michelin Pilot Sport EV (EV-specific, premium option, best handling)",
          "Continental ProContact RX Plus (all-season, EV-rated, common OEM choice)",
          "Pirelli P7 (summer performance option, excellent grip, higher rolling resistance)",
          "Goodyear Assurance MaxLife (budget all-season, acceptable for daily driving)",
          "Avoid winter tires year-round in Southern California—you get poor range and unnecessary wear"
        ]
      },
      {
        type: "h2",
        text: "Size, pressure, and TPMS sensors",
        id: "size-pressure-tpms"
      },
      {
        type: "p",
        text: "Model 3 comes in either 18&quot; or 20&quot; wheel options. Model Y typically has 18&quot;, 20&quot;, or 21&quot;. Buy the size that matches your wheels—don&apos;t upsize expecting better handling. Oversized tires increase unsprung weight and can affect ride quality. Tire pressure matters more on EVs than gas cars because underinflation increases rolling resistance, which kills range. Tesla specifies pressure on a sticker inside the driver&apos;s door. Follow it exactly. If that pressure seems high (48 PSI is common), it&apos;s intentional—higher pressure reduces rolling resistance. Check pressure monthly, not just when the TPMS warning appears. TPMS sensors on Teslas are passive (they don&apos;t have batteries). They&apos;re replaced when you replace tires. When the shop installs new tires, tell them explicitly: &quot;I need new TPMS sensors,&quot; not &quot;please reprogram my sensors.&quot; If they reprogram the old sensors into new wheels, the sensors might be worn out, and you&apos;ll get false warnings a year later."
      },
      {
        type: "h2",
        text: "Rotation and wheel alignment",
        id: "rotation-alignment"
      },
      {
        type: "p",
        text: "Tesla recommends tire rotation every 6,250 miles (some regions say every 7,500). This is more aggressive than a gas car because the wear is more even, and early rotation prevents one tire from wearing dramatically faster than the others. Rotate front-to-rear, rear-to-front, diagonal-to-diagonal—follow the pattern your shop uses. Alignment matters because of road conditions in Southern California. Our freeways and local roads are full of potholes that are murderous to suspension geometry. A pothole that a gas car barely notices can knock a Tesla&apos;s alignment off by a tenth of a degree. Check alignment if you feel pulling to one side, if tire wear looks uneven across the tread (instead of just faster wear), or after hitting a significant pothole. Alignment is cheaper than replacing tires early."
      },
      {
        type: "h2",
        text: "Summer vs. all-season in Southern California",
        id: "seasonal"
      },
      {
        type: "p",
        text: "We rarely get winter here, so summer tires make sense if you care about performance and grip. The Michelin Pilot Sport All Season 4 is genuinely a premium all-season that performs almost like a summer tire. For most owners in Corona, that&apos;s the right choice—you get 80% of summer performance, significantly better range (lower rolling resistance), and they still work fine if we somehow get rain or even sleet. If you make one annual trip to mountain snow, buy a separate set of winter tires and swap them for that trip. Don&apos;t run all-season with winter inserts or &quot;all-weather&quot; tires year-round here. The soft compound wears too fast in heat, and you lose range."
      },
      {
        type: "h2",
        text: "When to rotate and when to replace",
        id: "when-to-service"
      },
      {
        type: "p",
        text: "Rotate every 6,250 miles without fail. If a tire reaches 2/32&quot; tread depth, replace all four (or at minimum the pair that&apos;s worn). Mixing old and new tires on an EV creates torque control issues because the electronic traction system reads tire slip, and mixing tread depths gives false signals. It&apos;s safer and simpler to just replace all four. Check tread depth with the penny test (stick a penny into the tread; if you see the top of Lincoln&apos;s head, you&apos;re at 2/32&quot;). Model 3/Y get roughly 35,000-50,000 miles per tire set depending on driving style and tire choice. Plan accordingly."
      },
      {
        type: "serviceCTA",
        heading: "Not sure if your tires are EV-appropriate?",
        text: "We match tires to your Model 3 or Y&apos;s weight, torque delivery, and local road conditions. Better tire choice = better range, better wear, longer tire life."
      }
    ],
    references: [
      {
        group: "Tesla Official Information",
        items: [
          {
            title: "Model 3/Y Tire and Wheel Maintenance",
            source: "Tesla Owner&apos;s Manual",
            desc: "Specifications for tire size, pressure, rotation interval, and EV-specific considerations",
            url: "https://tesla.com/support"
          },
          {
            title: "Recommended Tire List",
            source: "Tesla Support",
            desc: "Official OEM tire recommendations and approved alternative brands for Model 3/Y",
            url: "https://support.tesla.com"
          }
        ]
      },
      {
        group: "Industry Technical Data",
        items: [
          {
            title: "EV Tire Rolling Resistance and Range Impact",
            source: "Tire Industry Research Council",
            desc: "Testing data on how tire choice directly affects EV efficiency and range",
            url: "https://tirerack.com/research"
          }
        ]
      }
    ],
    relatedSlugs: ["regen-braking-explained", "40-teslas-what-keeps-failing", "nmc-vs-lfp-battery"]
  },
  {
    slug: "40-teslas-what-keeps-failing",
    category: "Service finding",
    categoryStyle: "bg-purple-50 text-purple-700",
    title: "We diagnosed 40 Teslas last month — here&apos;s what keeps failing",
    excerpt: "Real data from the field. Your problem is almost certainly on this list.",
    date: "2024-12-20",
    displayDate: "Dec 20, 2024",
    keywords: ["Service finding", "Fault codes", "Model 3", "Model Y", "Model S", "Diagnostics"],
    content: [
      {
        type: "p",
        text: "December was our busiest month. Forty diagnostic jobs, all different owners, all different symptoms, but the same failures kept appearing. I pulled the logs this morning and ranked them. The data is useful because it shows what&apos;s actually breaking in the field, not what Tesla&apos;s warranty data says is breaking (warranty claims are heavily skewed by owners who can afford Tesla service). These are owner-requested mobile diagnostics, meaning owners were confused or frustrated enough to call me out. Here&apos;s what kept failing."
      },
      {
        type: "h2",
        text: "Failure #1: 12V battery degradation (9 cars, 22%)",
        id: "failure-12v"
      },
      {
        type: "p",
        text: "Exactly what we discussed in the 12V battery article. Nine cars, ranging from 2020 to 2024, all with varying symptoms: won&apos;t unlock, screens are black, car won&apos;t wake up, Sentry Mode won&apos;t engage. Every single one was a 12V battery that had degraded below functional voltage. Four were lithium packs that failed catastrophically (dropped from 12.6V to 3.8V literally overnight). Five were older lead-acid packs that just slowly degraded. None of the owners saw BMS warnings beforehand. The HV pack was healthy in all nine cases. This is a blind spot that keeps hitting owners and stays off the warranty claim list because most people don&apos;t think to check the 12V battery first."
      },
      {
        type: "h2",
        text: "Failure #2: Charging port latch failures (7 cars, 17%)",
        id: "failure-charger"
      },
      {
        type: "p",
        text: "The mechanical latch on the charging port that holds the connector in place gets weak, and the connector falls out mid-charge. Tesla cars with 40,000+ miles showing this problem consistently. Two cars had latches so weak the connector would fall out just from vibration at a Supercharger. Three cars had latches that wouldn&apos;t unlatch at all—owners had to manually pry the connector out. One car&apos;s latch broke and sent a shard into the port. The issue is mechanical wear and corrosion of the spring. Tesla covers this under warranty if you can get the car to a service center, but mobile diagnostics can confirm it, and it&apos;s a 30-minute replacement."
      },
      {
        type: "fieldNote",
        text: "Got called out to a Model 3 owner whose car was stuck charging—the port connector wouldn&apos;t release from the latch. She&apos;d already waited 45 minutes for a tow truck. I opened the charge door, looked at the latch mechanism, and manually unlatched it by hand (there&apos;s a manual release lever hidden behind the door trim). Ordered a new port assembly, had it installed three days later. Total time on-site: 8 minutes. She didn&apos;t know the manual override existed. Tesla doesn&apos;t advertise it. A lot of owners don&apos;t know a 30-minute repair exists and instead wait for a tow."
      },
      {
        type: "h2",
        text: "Failure #3: BMS calibration issues (6 cars, 15%)",
        id: "failure-bms"
      },
      {
        type: "p",
        text: "Battery Management System calibration gets out of sync with actual capacity, and the car starts reporting false range. These were mostly owners who hadn&apos;t done a full discharge cycle in months (usually because they charge daily and drive short distances). The BMS doesn&apos;t know its own boundaries anymore. A full charge is reported as 85%, a 50% charge is reported as 75%. The range estimate is wildly pessimistic. The actual battery is fine; the software just lost track of where the endpoints are. Fix: trigger a full discharge cycle by driving the car down to 5% battery, then immediately charging to 100% while plugged in. The BMS recalibrates during that charge. Done. Most owners don&apos;t know this is a thing and assume their battery is degrading."
      },
      {
        type: "h2",
        text: "Failure #4: Suspension control arm wear (5 cars, 12%)",
        id: "failure-suspension"
      },
      {
        type: "p",
        text: "Model 3 and Y owners in Southern California with 60,000+ miles are hitting potholes and wearing out the front lower control arms. These cars are heavy with the battery pack, and the EV chassis doesn&apos;t have a traditional engine to soak up impacts the same way. A pothole that a gas car laughs at can damage a control arm on an EV. Symptoms: clicking noise when turning, pulling to one side, uneven tire wear, alignment keeps going out. All five cars needed control arm replacement ($300-500 per side) and alignment. One car had already had it done at 40k miles and needed it again—rough roads in Corona are brutal."
      },
      {
        type: "h2",
        text: "Failure #5: Touchscreen MCU issues (3 cars, 7%) — all older Model S",
        id: "failure-mcu"
      },
      {
        type: "p",
        text: "This is a known issue on 2016-2018 Model S: the main touchscreen module (MCU) uses eMMC flash storage that fails after a certain number of write cycles. You&apos;ll see the screen go black, or the car will constantly reboot, or the screen will be unresponsive. All three of my December cases were 2016-2017 Model S with over 100k miles. Tesla replaced the entire MCU module under warranty on two of them; one owner was out of warranty and chose to replace it out of pocket ($1,500). This is a known manufacturing defect, and Tesla has a service bulletin for it, but it&apos;s not a recall so most owners don&apos;t know it&apos;s covered."
      },
      {
        type: "h2",
        text: "Failure #6: HVAC blower motor failure (2 cars, 5%)",
        id: "failure-hvac"
      },
      {
        type: "p",
        text: "Cabin air circulation stops working, or the fan only runs at one speed. Both cars had similar symptoms: fan worked fine until it didn&apos;t, then either nothing or constant full blast. The blower motor capacitor or the motor itself was failing. One was fixable with a capacitor replacement (cheap), the other needed a full blower assembly swap (more expensive). These don&apos;t often fail, but when they do, the whole HVAC system becomes useless in hot SoCal weather."
      },
      {
        type: "h2",
        text: "Failure #7: Phantom fault codes and software glitches (2 cars, 5%)",
        id: "failure-phantom"
      },
      {
        type: "p",
        text: "Cars with error codes that don&apos;t match any actual hardware failure. One Model Y was throwing brake system warnings (BMS_a234) but brakes were perfect. Other was throwing a thermal management code (THERMAL_a045) but coolant loops were intact and working. Both were solved by a software reboot (disconnecting the 12V battery for 10 minutes to force a full system restart). Sometimes the software just loses the plot and reports nonsense. A reboot fixes it."
      },
      {
        type: "h2",
        text: "Model breakdown and common patterns",
        id: "model-patterns"
      },
      {
        type: "p",
        text: "Model 3 dominated the diagnostics list: 18 cars (45%). Model Y: 15 cars (37%). Model S: 6 cars (15%). Model X: 1 car (3%). This tracks with the installed base—there are way more 3s and Ys on the road in Southern California. The Model 3 failures skewed toward charging port latch and control arm wear. Model Y failures skewed toward 12V battery and BMS calibration. Older Model S failures were all MCU-related, which makes sense given the age of those cars. If you own one of the high-failure models (3 or Y), you should be extra vigilant about 12V and charging port maintenance."
      },
      {
        type: "h2",
        text: "When to be worried and when to ignore false alarms",
        id: "when-to-worry"
      },
      {
        type: "p",
        text: "If you see a single warning code and it goes away, it&apos;s probably a software glitch. Restart the car and move on. If you see the same code three times in a week, it&apos;s real. If you see a code you don&apos;t recognize, plug the code (e.g., &quot;BMS_a066&quot;) into an online Tesla fault code database to get an idea of severity. Some codes are &quot;get it checked soon,&quot; others are &quot;pull over now and call a tow truck.&quot; If your car is doing something strange and you can&apos;t explain it, that&apos;s worth a mobile diagnostic. Most of these issues we found were invisible until the owner noticed a symptom, then the problem was already weeks or months old. A diagnostic call-out can catch things before they strand you."
      },
      {
        type: "serviceCTA",
        heading: "Your car is throwing weird codes or behaving strangely?",
        text: "We pull the full diagnostic logs and tell you what&apos;s actually wrong vs. what&apos;s a software quirk. One diagnosis can save you from unnecessary repairs or a roadside breakdown."
      }
    ],
    references: [
      {
        group: "Tesla Service Documentation",
        items: [
          {
            title: "Model 3/Y Service Bulletins",
            source: "Tesla Internal Service Database",
            desc: "Known issues and field service procedures for common failures",
            url: "https://service.tesla.com"
          }
        ]
      },
      {
        group: "Owner Community Data",
        items: [
          {
            title: "Tesla Fault Code Database",
            source: "Tesla Motors Club",
            desc: "Community-maintained reference of fault codes, meanings, and solutions",
            url: "https://teslamotorsclub.com"
          }
        ]
      }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "tesla-warranty-covers-more", "model-y-tire-replacement"]
  },
  {
    slug: "tesla-warranty-covers-more",
    category: "Battery",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "Your Tesla warranty covers more than you think — know before you pay out of pocket",
    excerpt: "Tesla owners leave thousands of dollars in coverage on the table every year.",
    date: "2024-11-18",
    displayDate: "Nov 18, 2024",
    keywords: ["Battery", "Warranty", "Model 3", "Model Y", "Model S", "Model X"],
    content: [
      {
        type: "p",
        text: "Most Tesla owners don&apos;t fully understand their warranty. They know it exists and they assume they know what it covers. Then they pay $400 out of pocket for something that was covered the entire time. I&apos;ve seen owners choose not to claim warranty work because they thought the claim would expire their warranty (it doesn&apos;t), or they thought using a third-party mechanic would void coverage (it won&apos;t, thanks to the Magnuson-Moss Act). The warranty terms are generous. The problem is they&apos;re not advertised."
      },
      {
        type: "h2",
        text: "The three parts of the Tesla warranty",
        id: "warranty-parts"
      },
      {
        type: "p",
        text: "Bumper-to-bumper coverage: 4 years or 50,000 miles, whichever comes first. This covers everything except the battery, drive motor, and drive unit. So: steering, suspension, cooling systems, cabin electronics, touchscreen, door mechanisms, window motors, HVAC, lights, audio system, everything. High-voltage battery coverage: 8 years or 120,000 miles (Model 3 Standard Range), 8 years or 150,000 miles (Model 3 Long Range/Performance and all Model Y), 8 years or 125,000 miles (Model S), 8 years or 150,000 miles (Model X). What does this actually guarantee? 70% capacity retention. That means if your battery loses more than 30% capacity, Tesla replaces it. Drive unit warranty: 8 years or 120,000-150,000 miles depending on model. Covers the motor, inverter, and transmission. All three start the day you purchase the car."
      },
      {
        type: "h2",
        text: "What &apos;battery warranty&apos; actually means (and what it doesn&apos;t)",
        id: "battery-coverage"
      },
      {
        type: "p",
        text: "This is where owners get confused. Tesla&apos;s 8-year battery warranty doesn&apos;t mean they replace your battery if it gets too old. It means they replace it if it degrades past 70% of original capacity. Model 3s typically retain 88-95% capacity at 150k miles if charged properly. Model Ys retain similar numbers. You&apos;d have to actively abuse your car—daily charging to 100%, sitting in 120-degree heat constantly, using DC fast charging for every single charge—to drop below 70% in the warranty period. The warranty isn&apos;t there because batteries commonly fail; it&apos;s there because Tesla designed a system robust enough to make battery failure extremely unlikely. However, if your battery does degrade abnormally due to a manufacturing defect (rare cells, failed cooling circuit), that&apos;s definitely covered. The warranty also covers any safety-related battery issue, like a fire risk or cell imbalance."
      },
      {
        type: "fieldNote",
        text: "Owner brought a 2019 Model 3 in for a battery concern. Car was showing 78% capacity after 165,000 miles. That&apos;s beyond the 70% threshold, so technically it was in territory for warranty replacement. But I ran the diagnostics and the degradation was normal—nothing had failed. The battery was healthy, it had just seen 165k miles of use. Tesla&apos;s position: not a defect, normal wear. Warranty didn&apos;t apply because there was nothing wrong with the battery. Owner was disappointed but relieved when I explained that a battery doing normal wear-and-tear at 165k miles is actually performing better than expected."
      },
      {
        type: "h2",
        text: "Bumper-to-bumper coverage—what&apos;s actually covered",
        id: "bumper-to-bumper"
      },
      {
        type: "checklist",
        items: [
          "Door locks, latches, and lock actuators (very common failure)",
          "Window motors and regulators (windows get stuck)",
          "Parking brake and electronic parking brake",
          "Suspension components—bushings, ball joints, tie rods, struts",
          "Steering rack and pinion",
          "Brake calipers, brake pad wear sensors, brake fluid contamination",
          "Coolant system—radiator, pump, hoses, thermostat",
          "Heating and air conditioning—compressor, condenser, blower motor",
          "Battery cooling circuit—glycol loops, pumps, fittings (different from the HV battery itself)",
          "Cabin air intake, filter, and ventilation",
          "Touchscreen and infotainment system",
          "Audio system components",
          "Lighting system—headlights, taillights, interior lights",
          "Rain-sensing wipers and washer system"
        ]
      },
      {
        type: "h2",
        text: "How to check your warranty status",
        id: "check-status"
      },
      {
        type: "p",
        text: "Open your Tesla app. Tap Controls (bottom right). Tap Service. Scroll to &quot;Additional Vehicle Information&quot;. Look for the &quot;Warranty&quot; section. You&apos;ll see bumper-to-bumper expiration and battery warranty expiration. Note the expiration in terms of both date and mileage—whichever comes first is when coverage ends. If you&apos;re within both limits, you&apos;re covered. Also check your vehicle&apos;s registration or purchase agreement; some regional variants have extended warranty terms."
      },
      {
        type: "h2",
        text: "The Magnuson-Moss Act: using a third-party mechanic won&apos;t void your warranty",
        id: "magnuson-moss"
      },
      {
        type: "p",
        text: "Federal law—specifically the Magnuson-Moss Warranty Act of 1975—says that using a third-party service provider doesn&apos;t void your vehicle warranty. Tesla can&apos;t tell you &quot;you have to use Tesla Service or you lose coverage.&quot; If you get a repair done at an independent shop and something warranty-covered breaks later, Tesla is still responsible. However—and this is important—if the independent shop causes a different problem (e.g., they mess with the battery pack and cause it to malfunction), Tesla could argue that the problem is caused by third-party work, not a manufacturing defect. The safest approach: use Tesla Service for warranty claims unless the wait is unacceptable. If you need a third party, get written confirmation of what was done and take photos."
      },
      {
        type: "h2",
        text: "When to use Tesla warranty vs. when to go third-party",
        id: "when-to-use"
      },
      {
        type: "p",
        text: "Use Tesla Service when: the repair is definitely covered (you&apos;ve checked the warranty terms), the repair needs factory parts or software access, the part is safety-critical (brakes, airbags, thermal management). Go third-party when: your car is out of warranty (it&apos;s your money anyway), you need the repair done quickly and Tesla has a 6-week wait, the repair is clearly cosmetic and not safety-related, or you have an established relationship with a trusted independent mechanic. The distinction matters. Warranty claims come from Tesla&apos;s service network. Third-party shops can fix many things but can&apos;t order warranty parts or adjust things that require factory software."
      },
      {
        type: "h2",
        text: "Common repairs that ARE covered but owners pay for anyway",
        id: "common-repairs"
      },
      {
        type: "checklist",
        items: [
          "Door latch failures—owners assume it&apos;s cosmetic, it&apos;s covered by bumper-to-bumper",
          "Window motors—same deal, covered",
          "Brake pad wear sensors—owners think brake pads aren&apos;t covered (they have very long life), the sensors that alert you are covered",
          "Suspension bushings—normal wear on the car&apos;s age, covered if it fails before warranty expiration",
          "Touchscreen issues—full coverage under bumper-to-bumper",
          "Climate control compressor—covered, not a battery-related issue",
          "Charging port latch—mechanical failure, covered",
          "12V battery replacement in early years (2-4 years)—lithium 12V batteries degrade, covered by manufacturer defect coverage"
        ]
      },
      {
        type: "h2",
        text: "Warranty claims and the fine print",
        id: "warranty-claims"
      },
      {
        type: "p",
        text: "When you make a warranty claim, it doesn&apos;t reset your warranty timer. Your warranty started on the date you purchased the car and ends at a fixed date or mileage. Making a claim doesn&apos;t extend it or shorten it. You can make unlimited warranty claims within the coverage period. There&apos;s no deductible—if something is covered, it&apos;s free. Tesla will ask for purchase documentation and VIN verification, but that&apos;s it. The most important thing to know: if something fails and you&apos;re unsure if it&apos;s covered, ask Tesla Service before you pay out of pocket. Worst case they say no. Best case you save hundreds of dollars."
      },
      {
        type: "serviceCTA",
        heading: "Unsure if your repair is covered under warranty?",
        text: "We check your warranty terms and advise whether to claim or go third-party. No guessing, no surprise bills."
      }
    ],
    references: [
      {
        group: "Official Tesla Warranty Information",
        items: [
          {
            title: "Tesla Limited Warranty",
            source: "Tesla Legal - Owner&apos;s Manual",
            desc: "Complete warranty terms, coverage periods, and detailed exclusions for all models",
            url: "https://tesla.com/legal"
          },
          {
            title: "Battery Warranty Details",
            source: "Tesla Support",
            desc: "Specific capacity retention thresholds and battery defect coverage",
            url: "https://support.tesla.com/en_US/article/da428"
          }
        ]
      },
      {
        group: "Legal and Regulatory",
        items: [
          {
            title: "Magnuson-Moss Warranty Act (15 U.S.C. §2301)",
            source: "U.S. Federal Trade Commission",
            desc: "Federal law protecting consumer rights regarding third-party repair and warranty coverage",
            url: "https://consumer.ftc.gov"
          }
        ]
      }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "40-teslas-what-keeps-failing", "nmc-vs-lfp-battery"]
  },
  {
    slug: "regen-braking-explained",
    category: "EV 101",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "Regen braking explained — why your brake pads last 120k miles and your rotors still rust",
    excerpt: "The coolest part of EV ownership is also the weirdest part for brake maintenance.",
    date: "2024-11-05",
    displayDate: "Nov 5, 2024",
    keywords: ["EV 101", "Brakes", "Maintenance", "Model 3", "Model Y", "Regen"],
    content: [
      {
        type: "p",
        text: "An electric motor can work in reverse. When you take your foot off the accelerator in a Tesla, the motor switches to generator mode. The wheels spin the motor, the motor converts that mechanical energy back into electricity, and that electricity charges the battery. Meanwhile, the traditional hydraulic brakes barely get touched. Your brake pads could have 200,000 miles on them and still look nearly new. But your rotors? They oxidize, they rust, they become basically cosmetic parts that never actually do anything. This is great for brake pad longevity and terrible for anyone who thinks they understand how brakes work."
      },
      {
        type: "h2",
        text: "How regen braking actually works",
        id: "how-regen-works"
      },
      {
        type: "p",
        text: "The electric motor in a Tesla (or any EV) is fundamentally reversible. It can convert electrical energy into mechanical motion (normal driving) or mechanical motion into electrical energy (braking). When you release the accelerator, the motor doesn&apos;t freewheel. Tesla&apos;s software immediately switches the motor into generator mode. The spinning wheels force the motor to turn, and the motor resists that turning—which is what slows the car down. That resistance becomes electricity. That electricity flows back into the battery pack. The battery pack absorbs the charge and stores the energy. This is called &apos;regenerative braking,&apos; and it converts 60-70% of the kinetic energy that normally gets wasted as heat in traditional brakes into stored electrical energy. The efficiency is remarkable."
      },
      {
        type: "h2",
        text: "Why your brake pads last forever (or nearly do)",
        id: "pad-longevity"
      },
      {
        type: "p",
        text: "A Tesla Model 3 with 120,000 miles might have brake pads with 40,000 miles of equivalent wear. The pads are barely used. In normal city driving, you&apos;re using regen for 90% of your braking. You only hit the hydraulic brakes hard when you make an emergency stop or when you&apos;re going downhill and regen can&apos;t keep up with gravity. The hydraulic braking system is there as a backup and safety system, not as the primary way to slow down. This is fantastic for your service budget. A typical Model 3 pad replacement is somewhere between 100,000 and 200,000 miles, compared to 40,000-60,000 miles for a gas car. You&apos;re saving the cost of 2-3 pad sets over the life of the vehicle. That&apos;s easily $1,000+ in savings."
      },
      {
        type: "fieldNote",
        text: "Pulled a 2021 Model 3 in for a routine brake inspection at 94,000 miles. Owner wanted to be safe and proactive. I opened the front wheel: pads were at about 70% remaining thickness. Rear pads were even thicker at maybe 75%. The car had normal wear and tear, but mostly from the handful of hard stops and highway braking. For a gas car with 94k miles, pads would be at 30% or less. This Model 3 could easily go to 150k or beyond before needing new pads."
      },
      {
        type: "h2",
        text: "The rotor rust problem that nobody talks about",
        id: "rotor-rust"
      },
      {
        type: "p",
        text: "Here&apos;s the weird part: your rotors get rusty. Badly. You can&apos;t avoid it. A rotor is iron, and iron oxidizes in the presence of oxygen and moisture. On a gas car, the brakes get hot constantly from friction, so water evaporates and the rotor stays relatively clean. On a Tesla, the brakes barely get warm. They sit at ambient temperature most of the time. Water from morning dew, rain, or carwash water sits on the rotor surface and oxidizes the iron. You get surface rust. The rust doesn&apos;t hurt anything functionally—your regen braking still works, and the handful of times you need the hydraulic brakes, the friction pads will clear the rust when they engage. But visually, your rotors look terrible. You can see rust through the wheel. This is totally normal for an EV and absolutely not a problem. But a lot of owners see the rust and panic, thinking they need new rotors. They don&apos;t."
      },
      {
        type: "h2",
        text: "How to keep your brakes exercised and avoid getting stuck on rusty pads",
        id: "brake-exercise"
      },
      {
        type: "checklist",
        items: [
          "Once a month, find an empty parking lot or quiet road and do a few hard brake applications (from 40 mph down to 5 mph, firmly). This warms the brakes and clears light rust.",
          "If you live near mountains or hills, use them. Long downhill descents keep the brakes warm and engage them regularly.",
          "Avoid extreme softness in regen braking. Use &apos;Standard&apos; regen mode, not &apos;Low&apos; (if available on your model year).",
          "If your car sits for more than a week, drive it and do a few brake applications before highway driving.",
          "Carwashes with high-pressure jets can leave moisture on rotors, so park in the sun after a wash instead of in shade."
        ]
      },
      {
        type: "h2",
        text: "Regen settings: Standard vs. Low, and why newer cars don&apos;t have the option",
        id: "regen-settings"
      },
      {
        type: "p",
        text: "Older Teslas (2016-2021 Model 3/Y) had two regen modes: &apos;Standard&apos; and &apos;Low.&apos; Standard means aggressive regen—release the throttle and the car slows down noticeably, like traditional engine braking. Low means gentle regen—the car coasts longer before slowing. Newer cars (2022+) eliminated the Low option entirely. Why? Because Standard is better for efficiency, energy recovery, and brake maintenance. Newer cars default to what used to be called Standard. If you drive an older Tesla with the Low option, don&apos;t use it unless you have a specific reason (some people prefer the coasting feel). Standard regen will recover more energy, keep your brakes warmer, and reduce hydraulic brake reliance. It also enables &apos;one-pedal driving,&apos; where lifting off the accelerator slows you to a stop without touching the brake pedal."
      },
      {
        type: "h2",
        text: "One-pedal driving and how to do it right",
        id: "one-pedal"
      },
      {
        type: "p",
        text: "One-pedal driving is when you control the entire car—acceleration and deceleration—using only the accelerator pedal. Press it to go, release it to slow down. The car comes to a near-stop using regen, then the hydraulic brakes take over for the last bit if needed. This works perfectly on Tesla with Standard regen. It takes 2-3 weeks of practice to feel natural, but once it clicks, it becomes second nature and your brake pedal usage drops by 90%. In city driving, you literally never touch the brake pedal. The one thing you have to be aware of: regen is not as strong as hydraulic brakes, so if you&apos;re following closely behind another car, use the brake pedal for safety. One-pedal driving is great in stop-and-go traffic; it&apos;s terrible if you need emergency stopping power."
      },
      {
        type: "h2",
        text: "Cold weather reduces regen (and it&apos;s not a problem)",
        id: "cold-weather-regen"
      },
      {
        type: "p",
        text: "In freezing temperatures, the battery can&apos;t accept the charge from regen as fast because cold lithium has higher internal resistance. The onboard charger will limit regen output to protect the battery. You&apos;ll notice the car doesn&apos;t slow down as aggressively when you lift off the accelerator in cold weather. Your touchscreen will show &quot;Regen limited&quot; with a dotted line on the power meter. This is normal and intentional. Preconditioning (heating the battery before you drive) will increase regen. Driving for 10-15 minutes warms the battery up and regen returns to normal. Don&apos;t worry—it&apos;s not a malfunction."
      },
      {
        type: "h2",
        text: "The catch: regen doesn&apos;t work on slippery surfaces",
        id: "regen-traction"
      },
      {
        type: "p",
        text: "If you&apos;re on ice, snow, gravel, or any slippery surface, regen braking can cause the wheels to lock up. The motor is trying to resist the wheel rotation, but the wheels don&apos;t have enough traction to stay locked, so they slip and slide. This is why Tesla reduces regen in rain and eliminates it on snow. The car will automatically switch to conventional brakes in those conditions. You might notice the car feels different—less responsive to throttle release—on wet or snowy roads. It&apos;s not a failure; it&apos;s the car protecting you from a skid. Let the traction control system do its job and drive normally."
      },
      {
        type: "p",
        text: "The whole regen system is one of the coolest parts of EV engineering. It transforms what would be wasted heat into stored electricity. It extends brake service life by years. It makes driving smoother and more efficient. The only downside is that you have to understand it differently than a traditional car. Rotors get rusty, but that&apos;s cosmetic. Pads last forever, but you have to exercise the brakes occasionally. Once you understand regen, it all makes sense."
      },
      {
        type: "serviceCTA",
        heading: "Concerned about your rotor rust or brake performance?",
        text: "We inspect brake pad thickness and rotor condition and explain what&apos;s normal regen behavior vs. an actual issue. Most EV owners worry about nothing."
      }
    ],
    references: [
      {
        group: "Tesla Official Information",
        items: [
          {
            title: "Regenerative Braking and One-Pedal Driving",
            source: "Tesla Owner&apos;s Manual",
            desc: "Technical explanation of how regen works, regen modes, and best practices for one-pedal driving",
            url: "https://tesla.com/support"
          },
          {
            title: "Brake System Maintenance",
            source: "Tesla Service Documentation",
            desc: "EV-specific guidance on brake inspection intervals and rotor care",
            url: "https://service.tesla.com"
          }
        ]
      },
      {
        group: "Engineering and Physics",
        items: [
          {
            title: "Energy Recovery Systems in Electric Vehicles",
            source: "IEEE Vehicular Technology Magazine",
            desc: "Technical analysis of regen efficiency, energy recovery rates, and battery impact",
            url: "https://ieeexplore.ieee.org"
          }
        ]
      }
    ],
    relatedSlugs: ["model-y-tire-replacement", "nmc-vs-lfp-battery", "tesla-software-update-charging"]
  }
];

export function calculateReadTime(post: BlogPost): string {
  const wordCount = post.content.reduce((acc, block) => {
    if (block.type === "p" || block.type === "fieldNote") return acc + block.text.split(/\s+/).length;
    if (block.type === "warning") return acc + block.text.split(/\s+/).length + block.heading.split(/\s+/).length;
    if (block.type === "h2") return acc + block.text.split(/\s+/).length;
    if (block.type === "checklist") return acc + block.items.join(" ").split(/\s+/).length;
    if (block.type === "faultCodes") return acc + block.codes.reduce((a, c) => a + c.desc.split(/\s+/).length + c.code.split(/\s+/).length, 0);
    if (block.type === "serviceCTA") return acc + block.heading.split(/\s+/).length + block.text.split(/\s+/).length;
    return acc;
  }, 0);
  const minutes = Math.max(3, Math.ceil(wordCount / 250));
  return `${minutes} min read`;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllKeywords(): string[] {
  const kw = new Set<string>();
  posts.forEach(p => p.keywords.forEach(k => kw.add(k)));
  return Array.from(kw).sort();
}
