import { owner } from "@/config/demo";

export type Line = { t: string; who: "AF" | "MH"; text: string; key?: number };

/** Ahmed ↔ Mira, Thursday 2pm ET. `key` links a line to the summary item it becomes. */
export const transcript: Line[] = [
  { t: "02:14", who: "MH", text: "Our reps spend Friday afternoons updating HubSpot.", key: 0 },
  { t: "06:40", who: "AF", text: "SooqSense writes those updates for you, and you approve them." },
  { t: "11:05", who: "MH", text: "We need it live before Q1 planning on January 12.", key: 1 },
  { t: "17:32", who: "MH", text: "Legal will ask for the DPA early.", key: 2 },
  { t: "24:18", who: "AF", text: "I’ll send the DPA and a security overview by Monday.", key: 3 },
  { t: "29:51", who: "MH", text: "If pricing holds at 12 seats, we can sign this month.", key: 4 },
];

export const summary = {
  title: "Carthage Labs · discovery call",
  meta: `${owner.name} and Mira Haddad · Thu 14:00 ET · 32 min`,
  points: [
    "Pain: reps lose Friday afternoons to CRM updates.",
    "Timeline: live before Q1 planning, January 12.",
    "Legal needs the DPA early.",
  ],
  actions: [
    { who: "Ahmed", text: "Send DPA and security overview by Monday" },
    { who: "Ahmed", text: "Hold pricing at 12 seats on Growth" },
  ],
  followUp: "Recap and next steps — draft ready for Ahmed",
};
