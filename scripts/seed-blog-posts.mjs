#!/usr/bin/env node
/**
 * Seed blog posts from static blogData.ts into Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/seed-blog-posts.mjs
 *
 * Requires a Sanity API token with write ("Editor" or "Deploy Studio") permissions.
 * Generate one at: https://www.sanity.io/manage/project/jw1qtqhf/api#tokens
 */

import { createClient } from "@sanity/client";
import crypto from "crypto";

const PROJECT_ID = "jw1qtqhf";
const DATASET = "production";
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error("❌  Missing SANITY_TOKEN env var.");
  console.error("   Generate a token at: https://www.sanity.io/manage/project/jw1qtqhf/api#tokens");
  console.error("   Then run: SANITY_TOKEN=<token> node scripts/seed-blog-posts.mjs");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

/* ── Helper: generate a stable _key for Portable Text blocks ──────────── */
function key() {
  return crypto.randomBytes(6).toString("hex");
}

/* ── Convert a single ContentBlock → Portable Text block(s) ───────────── */
function toPortableText(block) {
  switch (block.type) {
    case "p":
      return {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: decodeEntities(block.text), marks: [] }],
      };

    case "h2":
      return {
        _type: "block",
        _key: block.id || key(), // use the id as key so the TOC anchor works
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: decodeEntities(block.text), marks: [] }],
      };

    case "fieldNote":
      return {
        _type: "fieldNote",
        _key: key(),
        body: decodeEntities(block.text),
      };

    case "warning":
      return {
        _type: "warningNote",
        _key: key(),
        heading: decodeEntities(block.heading),
        body: decodeEntities(block.text),
      };

    case "faultCodes":
      return {
        _type: "faultCodeBlock",
        _key: key(),
        codes: block.codes.map((c) => ({
          _type: "object",
          _key: key(),
          code: decodeEntities(c.code),
          desc: decodeEntities(c.desc),
        })),
      };

    case "checklist":
      return {
        _type: "checklist",
        _key: key(),
        items: block.items.map((i) => decodeEntities(i)),
      };

    case "serviceCTA":
      return {
        _type: "serviceCTA",
        _key: key(),
        heading: decodeEntities(block.heading),
        ctaText: decodeEntities(block.text),
      };

    default:
      console.warn(`⚠  Unknown block type: ${block.type}`);
      return null;
  }
}

/* ── Decode &apos; and other HTML entities ─────────────────────────────────── */
function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/* ── All 8 blog posts (copied from blogData.ts structure) ─────────────── */
const posts = [
  {
    slug: "12v-battery-blind-spot",
    category: "Battery",
    title: "The 12V battery is the most dangerous blind spot in Tesla ownership — and most owners don't know it exists",
    excerpt: "Your Model 3 could have a dead battery with a fully charged HV pack. Here's why.",
    date: "2025-03-12",
    keywords: ["Battery", "12V", "Model 3", "Model Y", "Maintenance", "Fault codes"],
    content: [
      { type: "p", text: "Most Tesla owners think their car has one battery. They&apos;re wrong. There are two—and one of them is hiding a problem so serious it can strand you completely, even when your main battery shows full charge. I&apos;ve pulled up to houses where the Model 3 wouldn&apos;t unlock, the screens were black, the doors were frozen, and the battery pack was at 100%. Every time, it&apos;s the same culprit: the 12V system has died." },
      { type: "h2", text: "What the 12V battery actually does", id: "what-12v-does" },
      { type: "p", text: "The 12V battery in your Tesla isn&apos;t for starting an engine. It powers everything else: the door locks, the window motors, the touchscreen MCU, the cabin computer, the gear selector solenoid, the HVAC blower, and the entire low-voltage architecture. Without it, your car is essentially a brick, even if the high-voltage pack could theoretically power the motors. Tesla engineered the 12V system to be independent from the main HV pack for a reason—safety isolation. But that same isolation becomes a liability when the 12V fails, because the HV pack can&apos;t reach it to keep it alive." },
      { type: "h2", text: "Why it fails silently, and why you won&apos;t see it coming", id: "why-it-fails" },
      { type: "p", text: "Here&apos;s the brutal part: the 12V battery degrades in the dark. Your main HV battery gets monitored constantly. Tesla&apos;s BMS (Battery Management System) tracks voltage, cell balance, temperature, and degradation every second. The 12V? Not so much. It gets charged by a DC-DC converter that pulls power from the HV pack, but there&apos;s no active monitoring of the 12V health. The battery sits there discharging through parasitic loads—the always-on computers, the Sentry Mode, the cellular connection, the key fob receiver—all drawing micro-amps. If the DC-DC converter isn&apos;t charging it fully, degradation accelerates. By the time you notice, the battery is already dead." },
      { type: "fieldNote", text: "Last month I showed up to a 2022 Model Y that the owner thought had a dead HV battery pack. Car wouldn&apos;t turn on, screens dark. I checked the main pack first—154V, totally healthy. Popped the fuse box, tested the 12V rail: 3.2V. The battery had degraded so far it couldn&apos;t hold charge anymore. Owner had no warning. Car had 48,000 miles. We swapped in a new lithium 12V pack, and everything came back to life. The HV pack never told Tesla anything was wrong with the 12V, because they&apos;re isolated systems." },
      { type: "h2", text: "Which Teslas have which battery—and why it matters", id: "battery-types" },
      { type: "p", text: "Model 3 and Model Y owners: you likely have a lithium 12V battery (LFP or similar chemistry). These are smaller, lighter, and more efficient than traditional lead-acid, but they degrade faster under parasitic load if the charging system isn&apos;t dialed in. They also fail harder—when they go, they&apos;re done. Model S and Model X owners (especially pre-2021) typically have lead-acid batteries. Lead-acid can sit at lower charge states longer before becoming unrecoverable. This is one of the few areas where older S/X owners have a slight advantage. However, newer Model S/X have shifted toward lithium as well. Check your paperwork or ask your service center which chemistry you have. If you don&apos;t know, assume lithium and plan accordingly." },
      { type: "h2", text: "Common 12V fault codes—know these", id: "fault-codes" },
      { type: "faultCodes", codes: [
        { code: "BMS_a066", desc: "12V battery voltage too low. Converter isn&apos;t charging the battery properly, or battery is degraded." },
        { code: "BMS_w017", desc: "12V battery voltage warning. Battery is still alive but deteriorating. This is your warning flag." },
        { code: "VCFRONT_a175", desc: "Front vehicle controller cannot communicate. Often a symptom of 12V problems affecting the main gateway module." }
      ]},
      { type: "h2", text: "What to do if your Tesla won&apos;t respond at all", id: "what-to-do" },
      { type: "p", text: "If your car is completely dead—no lights, no response to the key, touchscreen black—don&apos;t call a tow truck yet. Try this: open the manual door release (there&apos;s a mechanical latch on every door), and check the fuse box under the frunk. Look at the main 12V battery. If the terminal is corroded or loose, clean or tighten it. If the 12V battery looks fine, check the fuse labeled something like &apos;DCDC Converter&apos; or &apos;Main&apos;. A blown fuse points to a different problem than a dead battery." },
      { type: "p", text: "Prevention is the only real cure. Keep your car plugged in regularly, even if the HV pack is full. The DC-DC converter needs the main pack live to charge the 12V. Park in shade during peak heat—extreme temperatures accelerate lithium degradation. If you store your car long-term, plug it in to a Wall Connector or Supercharger dock periodically. And if you ever see BMS_w017 or BMS_a066 in your diagnostics, get it checked immediately. A 12V replacement costs a couple hundred dollars now." },
      { type: "serviceCTA", heading: "Getting multiple fault codes or your car won&apos;t wake up?", text: "Mobile diagnostics pinpoint the actual failure—12V battery, DC-DC converter, or gateway module. We bring the tools to your location and get you back on the road." }
    ],
    references: [
      { group: "Tesla official", title: "Tesla Service Manual - 12V System Architecture", source: "Tesla Internal Documentation", desc: "Complete schematic and isolation architecture of the 12V system in Model 3/Y", url: "https://service.tesla.com" },
      { group: "Tesla official", title: "Model 3/Y Maintenance Schedule", source: "Tesla Support", desc: "Covers 12V battery monitoring and replacement intervals", url: "https://support.tesla.com/en_US/article/da419" },
      { group: "Further reading", title: "Lithium 12V Battery Performance in EVs", source: "IEEE Vehicular Electronics Conference", desc: "Research on degradation patterns in small lithium batteries under parasitic load", url: "https://ieeexplore.ieee.org" }
    ],
    relatedSlugs: ["tesla-warranty-covers-more", "40-teslas-what-keeps-failing", "nmc-vs-lfp-battery"]
  },
  {
    slug: "tesla-software-update-charging",
    category: "Software",
    title: "Tesla 2025.x update changed charging behavior — here's what shifted and why it matters",
    excerpt: "Your car's charging curve just changed. We break down what happened and how to adapt.",
    date: "2025-02-28",
    keywords: ["Software", "Charging", "OTA update", "Model 3", "Model Y"],
    content: [
      { type: "p", text: "Tesla released 2025.1 and 2025.2 updates in February that adjusted how their fleet charges. Most owners didn&apos;t notice because the changes are subtle. The car still shows you the same percentage number and still charges to the same maximum. But the underlying charge curve—the invisible algorithm that controls the amps flowing into your battery—shifted. I&apos;ve had three owners call this month confused because their Model 3 was charging slower than before the update. One owner thought their battery was dying. It wasn&apos;t. Tesla just changed the recipe." },
      { type: "h2", text: "What actually changed in 2025.x", id: "what-changed" },
      { type: "p", text: "Tesla&apos;s charging algorithm is dynamic. It responds to battery temperature, state of health, ambient conditions, and power availability. With 2025.1, Tesla adjusted the temperature thresholds for when the car begins tapering (slowing down) the charge rate. Previously, a cold battery in Southern California winter would start tapering at around 85 degrees Fahrenheit. Now it tapers earlier, around 75-80 degrees, and ramps up the taper rate more aggressively. Why? Tesla likely discovered through fleet telemetry that slightly more conservative charging at lower temperatures reduces long-term degradation and balances cells more evenly." },
      { type: "p", text: "Second, the 2025.2 update changed the scheduled departure preconditioning behavior. Previously, if you scheduled a departure for 7 AM, the car would begin heating the battery and cabin at 6:45 AM. Now it begins earlier—around 6:15 AM—and heats more gradually. This distributes the load on the battery over a longer time, reducing stress from rapid temperature swings." },
      { type: "p", text: "Third—and this one matters most—Tesla adjusted the default charge limit target for owners who haven&apos;t manually set a limit. Previously, if you plugged in without a scheduled time, the car would default to an 80% charge limit. Now it defaults to 85% for most models (with the exception of LFP batteries, which still default higher). Lower daily charge targets reduce cycle stress and extend pack life." },
      { type: "fieldNote", text: "Had a 2023 Model Y owner roll in frustrated last week because she was only getting 220 miles of range instead of 240 after the update. She thought something broke. I pulled the logs—car was charging to 85% instead of 90%. Default limit had changed. She manually adjusted it back to 90% and the range issue disappeared. Tesla didn&apos;t mention this in the release notes." },
      { type: "h2", text: "How to check your software version and current charge behavior", id: "check-version" },
      { type: "checklist", items: [
        "Open Controls > Service > Additional Vehicle Information and note your software version (should show 2025.x.x.x)",
        "Navigate to Controls > Charging and check your set charge limit",
        "Plug in to a Wall Connector or Supercharger at room temperature (65-75°F) and monitor the amps over the next 5 minutes",
        "Compare to your previous behavior—if amps were higher before 2025.x, the charge curve definitely shifted",
        "Check if preconditioning starts earlier than expected by reviewing your scheduled departure settings"
      ]},
      { type: "h2", text: "Why this matters for your battery&apos;s long-term health", id: "why-it-matters" },
      { type: "p", text: "The changes are conservative and protective. Tesla is optimizing for longevity over convenience. A battery that spends every day between 10% and 85% will outlast one that swings between 5% and 100% constantly. The thermal management adjustments reduce cell stress. The earlier preconditioning spreads heat demand across more time, so no one part of the pack gets hammered. Over 200,000 miles, these tweaks could mean 5-10% better battery retention. But it also means charging takes 10-15% longer in some scenarios." },
      { type: "warning", heading: "Don&apos;t override without understanding the trade-off", text: "You can manually raise the charge limit and disable scheduled departure. But you&apos;re trading battery longevity for convenience. Tesla made these changes because they work. If you don&apos;t need the extra range, leave the new defaults alone." },
      { type: "h2", text: "What to do if charging feels wrong after an update", id: "what-to-do" },
      { type: "p", text: "First, check your charge limit. It may have reset to a new default. Second, compare your charge rate to the published specs for your model and battery type. Third, check the ambient temperature—if it&apos;s below 70°F, the new taper thresholds might be kicking in earlier than you&apos;re used to. Fourth, reboot the car (hold both scroll wheels for 10 seconds) and try again. Sometimes the new software needs a fresh boot to calibrate properly." },
      { type: "serviceCTA", heading: "Charging slower than expected after an update?", text: "We can pull your charge logs, compare pre- and post-update behavior, and tell you exactly what changed. Most issues are software, not hardware—and we can confirm in under an hour." }
    ],
    references: [
      { group: "Tesla official", title: "Tesla Software Updates Release Notes", source: "Tesla Support", desc: "Official changelog for Tesla OTA updates", url: "https://support.tesla.com/en_US/article/software-updates" },
      { group: "Further reading", title: "EV Charging Curve Optimization", source: "Battery University", desc: "Technical reference on how charging algorithms balance speed vs. longevity", url: "https://batteryuniversity.com/article/bu-409-charging-lithium-ion" }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "nmc-vs-lfp-battery", "regen-braking-explained"]
  },
  {
    slug: "supercharger-etiquette",
    category: "Charging",
    title: "Supercharger etiquette and tips most Tesla owners learn the hard way",
    excerpt: "Avoid idle fees, pick the right stall, and charge faster with these real-world tips.",
    date: "2025-02-15",
    keywords: ["Charging", "Supercharger", "Etiquette", "Tips", "Road trip"],
    content: [
      { type: "p", text: "I&apos;ve used Superchargers across Southern California hundreds of times—between personal driving and rolling the service van to meet clients. The number of Tesla owners who don&apos;t know basic Supercharger behavior is staggering. I&apos;m not talking about manners (though those matter too). I&apos;m talking about the technical realities that affect how fast you charge, how much you pay, and whether you&apos;re accidentally degrading your battery." },
      { type: "h2", text: "How Supercharger power splitting works", id: "power-splitting" },
      { type: "p", text: "Most Supercharger stations use paired stalls—1A/1B, 2A/2B, and so on. Each pair shares a single power cabinet. If you pull into stall 1A and someone is already in 1B, you&apos;re splitting the available power. Instead of getting 250 kW, you might get 120 kW. The fix is simple: pick a stall where the paired slot is empty. Look at the numbering on the stall post. If 3A is occupied, skip 3B and go to 4A instead. This alone can cut your charge time by 30-40%." },
      { type: "fieldNote", text: "I timed this at the Supercharger in Cabazon last month. Stall 2A with 2B occupied: 45 minutes to go from 15% to 80%. Stall 5A with 5B empty: 28 minutes for the same charge. Same car, same battery temp, same day. Power splitting is real and it costs you time." },
      { type: "h2", text: "Idle fees and how to avoid them", id: "idle-fees" },
      { type: "p", text: "Tesla charges idle fees when your car is done charging but still occupying a stall. The fee kicks in at $1.00 per minute at busy stations. If you walk into a restaurant and forget your car for 30 minutes after it hits your charge limit, that&apos;s $30. The fix: set your charge limit to exactly what you need for the next leg of your trip, and set a phone alarm for 5 minutes before the estimated completion time. The Tesla app sends notifications, but they&apos;re unreliable on Android and sometimes delayed on iPhone." },
      { type: "h2", text: "Battery temperature and charge speed", id: "battery-temp" },
      { type: "p", text: "Your battery charges fastest when it&apos;s warm—around 95-115°F internal temperature. If you&apos;ve been driving for an hour on the highway, the battery is already warm and you&apos;ll hit peak charge rates immediately. If you&apos;ve been parked overnight in 50°F weather, the battery is cold and the car will spend the first 10-15 minutes warming it before ramping up. Use the &apos;Navigate to Supercharger&apos; feature in your car—it preheats the battery en route. This can save 15-20 minutes on a cold charge session." },
      { type: "h2", text: "The 80% rule and when to break it", id: "80-percent" },
      { type: "p", text: "Charging slows dramatically above 80%. From 80% to 100% takes almost as long as 10% to 80%. For road trips, the optimal strategy is to charge to 60-80% at each stop and make more frequent stops. You&apos;ll spend less total time charging. The only exception: if you&apos;re heading into a stretch with no Superchargers for 200+ miles, charge to 95-100% and accept the slower final 20%." },
      { type: "checklist", items: [
        "Pick unpaired stalls (if 3A is taken, use 4A not 3B)",
        "Set charge limit to what you actually need, not 100%",
        "Use &apos;Navigate to Supercharger&apos; to preheat the battery en route",
        "Set a phone alarm 5 minutes before estimated charge completion",
        "Don&apos;t unplug someone else&apos;s car—ever",
        "Pull through stalls are easier if you&apos;re towing or have a long vehicle"
      ]},
      { type: "serviceCTA", heading: "Charging issues at Superchargers?", text: "If your car consistently charges slowly at Superchargers, the problem might be your car—not the station. We can diagnose charge port issues, onboard charger problems, and battery health on-site." }
    ],
    references: [
      { group: "Tesla official", title: "Supercharger - How It Works", source: "Tesla Support", desc: "Tesla&apos;s official guide to using the Supercharger network", url: "https://support.tesla.com/en_US/article/supercharger" },
      { group: "Further reading", title: "Optimal EV Charging Strategy for Road Trips", source: "InsideEVs", desc: "Data-driven analysis of charging strategies for minimum total trip time", url: "https://insideevs.com" }
    ],
    relatedSlugs: ["tesla-software-update-charging", "nmc-vs-lfp-battery", "regen-braking-explained"]
  },
  {
    slug: "nmc-vs-lfp-battery",
    category: "EV 101",
    title: "NMC vs. LFP — the two battery chemistries in your Tesla, explained without the hype",
    excerpt: "Not all Tesla batteries are equal. Here&apos;s the real difference between NMC and LFP and what it means for your driving.",
    date: "2025-02-01",
    keywords: ["EV 101", "Battery", "NMC", "LFP", "Chemistry", "Model 3", "Model Y"],
    content: [
      { type: "p", text: "When Tesla owners ask me &apos;What kind of battery do I have?&apos; they usually mean &apos;How big is it?&apos; But the chemistry matters more than the capacity. Your Tesla has one of two main battery chemistries: NMC (Nickel Manganese Cobalt) or LFP (Lithium Iron Phosphate). They behave differently, charge differently, degrade differently, and need different maintenance habits. Most of the generic advice online ignores this distinction entirely." },
      { type: "h2", text: "NMC: the performance chemistry", id: "nmc-explained" },
      { type: "p", text: "NMC batteries (also called NCM or sometimes NCA for the nickel-cobalt-aluminum variant in some Teslas) have higher energy density. This means more range per pound of battery. They&apos;re used in the Long Range and Performance variants of Model 3 and Model Y, and in all Model S and Model X vehicles. NMC cells operate optimally between 20% and 80% state of charge. Keeping them at 100% for extended periods accelerates degradation. Keeping them below 10% stresses the cells. The recommended daily charge target for NMC is 80%." },
      { type: "h2", text: "LFP: the durability chemistry", id: "lfp-explained" },
      { type: "p", text: "LFP batteries have lower energy density—fewer miles per pound—but they&apos;re more tolerant of abuse. They handle full charges better, tolerate more cycles, and degrade more gracefully. Tesla uses LFP in the Standard Range Model 3 and the base Model Y. LFP owners should charge to 100% regularly. In fact, Tesla recommends it: the BMS (Battery Management System) in LFP packs needs regular full charges to calibrate its state-of-charge readings. If you only charge an LFP battery to 80%, the displayed percentage can drift and become inaccurate." },
      { type: "warning", heading: "Know your chemistry before setting charge habits", text: "Charging an NMC battery to 100% daily will degrade it faster. Charging an LFP battery to only 80% will cause calibration drift and inaccurate range estimates. The advice is opposite for each chemistry. Know which one you have." },
      { type: "h2", text: "How to tell which battery you have", id: "how-to-tell" },
      { type: "checklist", items: [
        "Check your purchase paperwork — Standard Range = LFP, Long Range/Performance = NMC",
        "In the car: Controls > Service > Additional Vehicle Information — battery type is listed",
        "If the car recommends charging to 100% on the charging screen, it&apos;s LFP",
        "If the car shows a &apos;Daily&apos; and &apos;Trip&apos; charge limit slider with Daily capped around 80-90%, it&apos;s NMC"
      ]},
      { type: "h2", text: "Real-world degradation differences", id: "degradation" },
      { type: "p", text: "After 100,000 miles of normal use, NMC batteries typically retain 88-93% of original capacity. LFP batteries retain 92-97%. The gap widens with abuse—frequent Supercharging and high-temperature operation hurt NMC more than LFP. However, NMC starts with more capacity, so even with slightly more degradation, a Long Range NMC pack at 90% might still have more usable range than a Standard Range LFP at 95%." },
      { type: "h2", text: "Charging recommendations by chemistry", id: "charging-recs" },
      { type: "p", text: "For NMC: daily charge limit at 80%. Only charge to 100% before road trips. Avoid sitting at 100% for more than a few hours. Avoid dropping below 10% regularly. For LFP: daily charge limit at 100%. Do a full charge at least once a week to keep the BMS calibrated. It&apos;s fine to sit at 100% overnight. You can drop to near-zero without the same stress as NMC, though it&apos;s still not ideal to do it regularly." },
      { type: "serviceCTA", heading: "Not sure what battery chemistry you have?", text: "We can check your VIN, pull battery data, and give you a clear answer plus personalized charging recommendations. Takes about 15 minutes." }
    ],
    references: [
      { group: "Tesla official", title: "Lithium Iron Phosphate Battery Information", source: "Tesla Support", desc: "Tesla&apos;s guidelines specific to LFP battery care", url: "https://support.tesla.com/en_US/article/lfp-battery" },
      { group: "Further reading", title: "NMC vs LFP Degradation Study", source: "Journal of Power Sources", desc: "Peer-reviewed comparison of cycle life between NMC and LFP chemistries", url: "https://www.sciencedirect.com/journal/journal-of-power-sources" }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "tesla-software-update-charging", "regen-braking-explained"]
  },
  {
    slug: "model-y-tire-replacement",
    category: "Tires",
    title: "Model Y tire replacement guide — what Ray actually puts on customer cars and why",
    excerpt: "Tesla OEM tires wear fast. Here&apos;s what to replace them with based on 200+ tire jobs.",
    date: "2025-01-20",
    keywords: ["Tires", "Model Y", "Model 3", "Replacement", "Maintenance"],
    content: [
      { type: "p", text: "Tesla owners burn through tires faster than any other car I service. The instant torque, the heavy battery pack, and the aggressive traction control all contribute. A set of OEM tires on a Model Y lasts 20,000-30,000 miles in Southern California conditions. I&apos;ve seen them go in 15,000 if the owner does a lot of spirited driving. Compare that to a typical sedan that gets 50,000-60,000 miles per set. The good news: tire replacement is one of the few things you can optimize significantly by choosing the right rubber." },
      { type: "h2", text: "Why Tesla tires wear faster", id: "why-faster-wear" },
      { type: "p", text: "Three factors: weight, torque, and alignment. A Model Y weighs about 4,400 pounds—800 more than a comparable Toyota RAV4. That extra weight sits low (battery pack), which helps handling but increases tire contact pressure. Second, electric motors deliver maximum torque instantly. Every time you accelerate from a stop, the tires absorb more force than they would in an ICE vehicle with a torque curve. Third, Tesla&apos;s default alignment runs slightly more negative camber than most cars for handling feel, which means the inside edges of the tires wear faster." },
      { type: "h2", text: "OEM vs. aftermarket: what actually matters", id: "oem-vs-aftermarket" },
      { type: "p", text: "Tesla ships with acoustic foam-lined tires to reduce road noise. These are more expensive and harder to find. Here&apos;s the truth: you don&apos;t need acoustic foam tires. The noise difference is minimal—maybe 1-2 dB at highway speed. What matters more is the tire compound, tread pattern, treadwear rating, and load rating. Save the $40-60 per tire premium on foam-lined versions and put it toward a better compound." },
      { type: "fieldNote", text: "I&apos;ve done over 200 tire replacements on Model 3s and Model Ys in the last two years. The owners who switched from OEM Continental ProContact to Michelin CrossClimate 2 consistently report better wear life (35,000+ miles), similar grip, and no meaningful noise increase. The CrossClimate 2 also handles rain significantly better than the OEM tire. It&apos;s my default recommendation for Southern California daily drivers." },
      { type: "h2", text: "Ray&apos;s top tire picks by use case", id: "tire-picks" },
      { type: "p", text: "For daily driving in Southern California: Michelin CrossClimate 2 (255/45R19 for Model Y, 235/45R18 for Model 3). Best all-around tire for the money. Excellent rain performance, good treadwear, quiet enough. For maximum range: Continental EcoContact 6 or Michelin Energy Saver. Low rolling resistance, but grip trade-offs in wet conditions. For performance driving: Michelin Pilot Sport 4S. Incredible grip but expect 15,000-20,000 mile life. Not recommended for daily driving unless you enjoy buying tires. For winter/mountain trips: Michelin CrossClimate 2 handles light snow. For serious snow, get a dedicated winter tire set on separate wheels." },
      { type: "h2", text: "Rotation schedule and alignment", id: "rotation" },
      { type: "p", text: "Rotate every 5,000-7,500 miles. Tesla&apos;s service manual says 6,250 miles. I split the difference and tell customers 5,000-6,000. The rear tires on a Model Y wear 30-40% faster than the fronts due to the rear motor bias. If you don&apos;t rotate, you&apos;ll replace rears twice before the fronts need it. Get an alignment check at every tire replacement or if you notice uneven wear. Tesla&apos;s factory alignment is not always perfect from the factory—I&apos;ve measured as much as 0.3 degrees off spec on new cars." },
      { type: "checklist", items: [
        "Check tire pressure monthly—Tesla recommends 42 PSI cold for Model Y",
        "Rotate every 5,000-6,000 miles (rear wears faster on AWD)",
        "Inspect inside edges for accelerated wear from negative camber",
        "Don&apos;t use tire shine products with silicone—they degrade the rubber compound",
        "Keep the TPMS sensors when swapping tires—new ones cost $60-80 each"
      ]},
      { type: "serviceCTA", heading: "Need tires or a rotation?", text: "We do mobile tire service—mount, balance, and alignment check at your home or office. No need to sit in a tire shop waiting room." }
    ],
    references: [
      { group: "Tesla official", title: "Tire Care and Maintenance", source: "Tesla Support", desc: "Tesla&apos;s official guidance on tire pressure, rotation, and replacement", url: "https://support.tesla.com/en_US/article/tire-care" },
      { group: "Parts & ordering", title: "Michelin CrossClimate 2 for Tesla Model Y", source: "Tire Rack", desc: "Direct link to recommended tire in Model Y size", url: "https://www.tirerack.com" }
    ],
    relatedSlugs: ["40-teslas-what-keeps-failing", "regen-braking-explained", "tesla-warranty-covers-more"]
  },
  {
    slug: "40-teslas-what-keeps-failing",
    category: "Service finding",
    title: "I&apos;ve serviced 40+ Teslas this quarter — here&apos;s what actually keeps failing",
    excerpt: "Real failure data from a mobile tech&apos;s log, not Reddit speculation.",
    date: "2025-01-10",
    keywords: ["Service finding", "Reliability", "Common failures", "Model 3", "Model Y", "Data"],
    content: [
      { type: "p", text: "Every quarter I review my service logs to spot patterns. This quarter I serviced 43 Teslas across Southern California—mostly Model 3 and Model Y, with a handful of Model S and one Model X. Here&apos;s the actual breakdown of what failed, how often, and what it cost to fix. No speculation, no Reddit theories—just my tool bag and the cars." },
      { type: "h2", text: "The top 5 failures this quarter", id: "top-5" },
      { type: "p", text: "Number one: 12V battery failures (8 out of 43 cars, 18.6%). This remains the single most common issue. Six of the eight were Model 3s with lithium 12V packs between 40,000-70,000 miles. Two were Model Ys under 30,000 miles. Cost: $150-250 for the battery plus labor. Average total: $350." },
      { type: "p", text: "Number two: tire replacements and rotations (7 cars, 16.3%). Not really a &apos;failure&apos; but it&apos;s the second most common reason people call me. Most were overdue rotations with uneven rear wear. Three needed full replacement sets. Cost: $800-1,200 for four tires installed." },
      { type: "p", text: "Number three: suspension noise and control arm issues (5 cars, 11.6%). The Model 3 and Model Y share a suspension design that develops a clunk over bumps around 40,000-60,000 miles. Usually it&apos;s the front lower control arm bushings. Tesla will sometimes cover this under warranty but often pushes back. Cost out of warranty: $400-600 per side." },
      { type: "p", text: "Number four: charge port latch failures (4 cars, 9.3%). The charge port door or the internal latch mechanism fails, preventing the car from accepting a charge cable or releasing one. I&apos;ve seen both—cables stuck in and cables that won&apos;t latch. The motorized latch mechanism is the usual culprit. Cost: $200-350 for the assembly plus labor." },
      { type: "p", text: "Number five: touchscreen MCU issues (3 cars, 7%). Two had the eMMC flash memory degradation that causes the screen to slow down, freeze, and eventually go black. One had a display connector issue. The eMMC problem is well-documented and Tesla extended warranty coverage for some VINs. Cost if not covered: $1,500-2,000 for MCU replacement." },
      { type: "h2", text: "Patterns worth noting", id: "patterns" },
      { type: "p", text: "Most failures cluster around 40,000-60,000 miles. That&apos;s when the 12V battery, suspension components, and charge port mechanisms tend to show their age. Cars under 20,000 miles almost never have issues beyond tire wear. Cars over 80,000 miles tend to have either been well-maintained (and their problems are predictable) or neglected (and everything hits at once)." },
      { type: "fieldNote", text: "The most expensive single job this quarter was a Model S with a failed drive unit at 95,000 miles. Out of warranty. Drive unit replacement cost the owner $7,200 all-in. The cheapest was a stuck charge port latch on a Model Y—$180 total. The median service cost across all 43 cars was $380." },
      { type: "h2", text: "What I almost never see fail", id: "rarely-fails" },
      { type: "p", text: "The electric motors. The battery packs (the big ones). The power electronics. The onboard charger. These are the core EV components and they are remarkably reliable. In three years of mobile service, I&apos;ve replaced exactly one main drive unit and zero battery packs. The stuff that fails is the stuff around the EV platform—the 12V system, the mechanical suspension, the charge port, the touchscreen. It&apos;s the legacy car parts on an electric platform." },
      { type: "serviceCTA", heading: "Due for a checkup?", text: "We offer a comprehensive 30-point Tesla inspection that catches problems before they strand you. Same inspection I use on my own fleet review." }
    ],
    references: [
      { group: "Further reading", title: "Tesla Reliability Report", source: "Consumer Reports", desc: "Annual reliability survey data for Tesla models", url: "https://www.consumerreports.org" },
      { group: "Further reading", title: "EV Maintenance Cost Comparison", source: "AAA", desc: "AAA study comparing maintenance costs between EVs and ICE vehicles", url: "https://www.aaa.com" }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "model-y-tire-replacement", "tesla-warranty-covers-more"]
  },
  {
    slug: "tesla-warranty-covers-more",
    category: "Battery",
    title: "Your Tesla warranty probably covers more than you think — here&apos;s what to push back on",
    excerpt: "Tesla service centers sometimes say &apos;not covered.&apos; Here&apos;s when they&apos;re wrong.",
    date: "2024-12-28",
    keywords: ["Battery", "Warranty", "Service", "Cost", "Model 3", "Model Y"],
    content: [
      { type: "p", text: "I&apos;ve had Tesla service centers tell my clients that repairs &apos;aren&apos;t covered&apos; when they absolutely are. It&apos;s not always malicious—sometimes the service advisor doesn&apos;t know the full warranty terms, sometimes the system flags it wrong, and sometimes they&apos;re just trying to move the queue faster. But it costs owners money. Knowing your warranty coverage gives you leverage." },
      { type: "h2", text: "What the basic vehicle warranty covers", id: "basic-warranty" },
      { type: "p", text: "Every new Tesla comes with a 4-year/50,000-mile bumper-to-bumper warranty (whichever comes first). This covers almost everything: suspension components, door handles, seat mechanisms, window regulators, touchscreen hardware, cameras, ultrasonic sensors, charge port mechanisms, HVAC system, 12V battery, and more. The only things excluded are wear items (tires, brake pads, wiper blades) and cosmetic damage. If a component fails within 4 years or 50,000 miles, it should be covered." },
      { type: "h2", text: "The battery and drive unit warranty is separate—and longer", id: "battery-warranty" },
      { type: "p", text: "The high-voltage battery pack and drive unit(s) are covered for 8 years or 120,000 miles on Model 3 Standard Range and Model Y Standard Range, and 8 years or 150,000 miles on Long Range and Performance variants. This warranty guarantees the battery will retain at least 70% of its original capacity. If it drops below 70%, Tesla will repair or replace it. This is separate from the bumper-to-bumper warranty and extends well beyond it." },
      { type: "warning", heading: "The 70% threshold is hard to prove", text: "Tesla measures capacity retention using their own diagnostic tools. The range displayed on your dashboard is not the same as actual battery capacity. A car showing 250 miles of range might have more or less than 70% capacity depending on calibration, temperature, and driving conditions. If you suspect battery degradation, get a proper battery health test—don&apos;t rely on the displayed range." },
      { type: "h2", text: "Components Tesla often pushes back on—but shouldn&apos;t", id: "pushback" },
      { type: "p", text: "12V battery failures within the bumper-to-bumper period are covered. I&apos;ve had two clients told they weren&apos;t. Charge port latch mechanisms: covered under bumper-to-bumper. Suspension control arms with premature bushing wear: covered, though Tesla sometimes argues this is &apos;normal wear.&apos; It&apos;s not normal at 30,000 miles. MCU/touchscreen hardware failures: covered, and Tesla extended coverage for specific eMMC failures even beyond the standard warranty period (check TSB 2021-006). Door handle mechanisms that won&apos;t present or retract: covered." },
      { type: "h2", text: "How to push back effectively", id: "how-to-push-back" },
      { type: "checklist", items: [
        "Know your warranty period and mileage—check your purchase date and current odometer before calling",
        "Reference the specific warranty section in the Tesla owner&apos;s manual (available as PDF on Tesla&apos;s support site)",
        "Ask for the denial in writing—service centers become more careful when you request documentation",
        "Escalate to Tesla corporate if the service center won&apos;t budge—the national customer service line can override local decisions",
        "Document everything: take photos of the failed component, note fault codes, and keep records of all communication",
        "If the car is out of bumper-to-bumper but the issue is a battery or drive unit problem, cite the 8-year warranty separately"
      ]},
      { type: "fieldNote", text: "Last month a client brought me a 2021 Model Y with a failed charge port latch at 46,000 miles. The service center quoted $350 for the repair and said it wasn&apos;t covered. I looked up the warranty—4 years/50,000 miles, and the car was at 3.5 years and 46,000 miles. Clearly within warranty. I called the service center with the client, cited the warranty terms, and they reversed the decision. No charge. That&apos;s $350 saved by knowing the rules." },
      { type: "serviceCTA", heading: "Need help navigating a warranty claim?", text: "We can diagnose the issue independently, document fault codes, and help you present the case to Tesla service. An independent diagnostic report carries weight." }
    ],
    references: [
      { group: "Tesla official", title: "Tesla New Vehicle Limited Warranty", source: "Tesla Support", desc: "Full warranty document covering all Tesla models", url: "https://www.tesla.com/support/vehicle-warranty" },
      { group: "Tesla official", title: "Tesla Battery and Drive Unit Warranty", source: "Tesla Support", desc: "Separate warranty terms for HV battery and drive unit", url: "https://www.tesla.com/support/vehicle-warranty" }
    ],
    relatedSlugs: ["12v-battery-blind-spot", "40-teslas-what-keeps-failing", "nmc-vs-lfp-battery"]
  },
  {
    slug: "regen-braking-explained",
    category: "EV 101",
    title: "Regenerative braking explained — why your Tesla slows itself and how to use it",
    excerpt: "Regen braking saves brake pads and adds range. Here&apos;s how it actually works under the hood.",
    date: "2024-12-15",
    keywords: ["EV 101", "Regenerative braking", "Range", "Efficiency", "Driving tips"],
    content: [
      { type: "p", text: "Every new Tesla owner has the same reaction the first time they lift their foot off the accelerator: the car slows down hard, like someone tapped the brakes. It&apos;s unsettling if you&apos;re not expecting it. That&apos;s regenerative braking—one of the most important features of your EV—and most owners don&apos;t understand what it&apos;s actually doing. Here&apos;s the engineering, the driving technique, and the maintenance implications." },
      { type: "h2", text: "What regenerative braking actually does", id: "what-it-does" },
      { type: "p", text: "When you lift off the accelerator, the electric motor switches from consuming electricity to generating it. The motor becomes a generator, converting the car&apos;s kinetic energy (motion) back into electrical energy that flows into the battery. This process creates resistance in the drivetrain, which slows the car down. The harder the regen, the more energy gets recovered and the stronger the deceleration feels." },
      { type: "p", text: "Tesla&apos;s regen system can recover up to 60-70 kW of power during deceleration, depending on speed, battery state of charge, and battery temperature. At highway speed, lifting off the accelerator fully can produce deceleration equivalent to light-to-moderate braking. At low speed, the effect is less dramatic. The energy recovered gets added back to your battery, directly extending your range." },
      { type: "h2", text: "Why regen is sometimes weak or disabled", id: "why-weak" },
      { type: "p", text: "If your battery is nearly full (above 90%), regen is reduced or disabled entirely. The battery can&apos;t accept more charge, so there&apos;s nowhere to put the recovered energy. You&apos;ll see a dotted line on the regen indicator on your dashboard. This is normal but catches people off guard—your car suddenly doesn&apos;t slow down when you expect it to. The same thing happens when the battery is very cold. Cold lithium cells can&apos;t accept charge as quickly, so the car limits regen to protect the battery. After 10-15 minutes of driving, the battery warms up and regen returns to full strength." },
      { type: "warning", heading: "Reduced regen means longer stopping distance", text: "When the regen bar shows dotted lines (reduced regen), you need to use the physical brake pedal more. The car will NOT slow down as aggressively when you lift off the accelerator. This catches people in parking garages and on downhill grades. Pay attention to the regen indicator, especially on cold mornings and when the battery is above 90%." },
      { type: "h2", text: "One-pedal driving technique", id: "one-pedal" },
      { type: "p", text: "Tesla&apos;s regen is strong enough that you can drive almost entirely with one pedal. Lift off the accelerator to slow down, press it to go. The brake pedal becomes a backup for emergency stops and the final few mph to a complete stop. One-pedal driving takes about a week to learn and becomes second nature. The benefits: less brake pad wear (Tesla brake pads can last 100,000+ miles), better range (10-15% improvement in city driving), and smoother driving feel once you calibrate your foot." },
      { type: "h2", text: "Regen and brake pad life", id: "brake-pads" },
      { type: "p", text: "Because regen handles most of the deceleration, Tesla brake pads last dramatically longer than conventional cars. I&apos;ve seen Model 3s at 80,000 miles with 70% brake pad life remaining. The flip side: because the brakes are used so infrequently, the rotors can develop surface rust in humid conditions. This is cosmetic but can cause a grinding noise on the first few stops after the car has been parked for a while. A few moderate brake applications clears it. If you live near the coast, use the physical brakes intentionally once a week to keep the rotors clean." },
      { type: "checklist", items: [
        "Practice one-pedal driving in a parking lot first—get a feel for the deceleration rate",
        "Watch the regen indicator on cold mornings and when battery is above 90%",
        "Use physical brakes intentionally once a week to prevent rotor rust",
        "Don&apos;t charge to 100% before driving in hilly areas—you&apos;ll have no regen going downhill",
        "In Stop mode, the car holds itself at a complete stop—no need to keep your foot on the brake"
      ]},
      { type: "serviceCTA", heading: "Regen feels different than it used to?", text: "Changes in regen behavior can indicate battery health issues, motor problems, or software glitches. We can run diagnostics to identify the root cause." }
    ],
    references: [
      { group: "Tesla official", title: "Regenerative Braking", source: "Tesla Support", desc: "Tesla&apos;s explanation of regen braking modes and settings", url: "https://support.tesla.com/en_US/article/regenerative-braking" },
      { group: "Further reading", title: "Energy Recovery in Electric Vehicles", source: "SAE International", desc: "Technical paper on regenerative braking efficiency across different EV architectures", url: "https://www.sae.org" }
    ],
    relatedSlugs: ["nmc-vs-lfp-battery", "tesla-software-update-charging", "supercharger-etiquette"]
  }
];

/* ── Build Sanity documents and push via transaction ──────────────────────── */
async function main() {
  console.log(`\n🔄  Seeding ${posts.length} blog posts into Sanity (${PROJECT_ID} / ${DATASET})...\n`);

  // First pass: create all documents (without relatedPosts references)
  const slugToId = {};
  const tx = client.transaction();

  for (const post of posts) {
    const docId = `blogPost-${post.slug}`; // deterministic ID for idempotence
    slugToId[post.slug] = docId;

    const body = post.content.map(toPortableText).filter(Boolean);

    const references = (post.references || []).map((ref) => ({
      _type: "externalLink",
      _key: key(),
      group: ref.group,
      title: ref.title,
      url: ref.url,
      source: ref.source || null,
      desc: ref.desc || null,
    }));

    const doc = {
      _id: docId,
      _type: "blogPost",
      title: decodeEntities(post.title),
      slug: { _type: "slug", current: post.slug },
      publishedAt: new Date(post.date + "T12:00:00Z").toISOString(),
      excerpt: decodeEntities(post.excerpt),
      category: post.category,
      keywords: post.keywords,
      body,
      references: references.length > 0 ? references : undefined,
    };

    tx.createOrReplace(doc);
    console.log(`  📝  ${post.slug}`);
  }

  await tx.commit();
  console.log(`\n✅  Created ${posts.length} blog posts.`);

  // Second pass: wire up relatedPosts references
  console.log("\n🔗  Linking related posts...");
  const tx2 = client.transaction();

  for (const post of posts) {
    if (!post.relatedSlugs || post.relatedSlugs.length === 0) continue;

    const docId = slugToId[post.slug];
    const related = post.relatedSlugs
      .filter((s) => slugToId[s])
      .map((s) => ({
        _type: "reference",
        _ref: slugToId[s],
        _key: key(),
      }));

    if (related.length > 0) {
      tx2.patch(docId, (p) => p.set({ relatedPosts: related }));
      console.log(`  🔗  ${post.slug} → ${post.relatedSlugs.join(", ")}`);
    }
  }

  await tx2.commit();
  console.log(`\n🎉  Done! All ${posts.length} posts seeded with related post links.\n`);
  console.log("   → Visit https://raysevservice.com/studio to see them in the Studio.");
  console.log("   → Visit https://raysevservice.com/blog to see them on the site.\n");
}

main().catch((err) => {
  console.error("❌  Migration failed:", err.message);
  process.exit(1);
});
