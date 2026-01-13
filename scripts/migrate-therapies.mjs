import StoryblokClient from 'storyblok-js-client'

const THERAPIES = [
    {
        id: "hbot",
        slug: "hyperbaric-oxygen-therapy",
        name: "Hyperbaric Oxygen Therapy",
        type: "Device",
        category: "Oxygen",
        short: "Pressurised oxygen sessions to support recovery, energy and healing.",
        long:
            "HBOT increases dissolved oxygen in blood plasma under controlled pressure. It may support post-injury recovery, energy metabolism, circulation and general tissue healing when used judiciously.",
        duration: "45–60 min",
        price: "£££",
        image: "/therapies/hbot.jpg",
        icon: "🫁",
        benefits: [
            "Supports tissue healing & oxygenation",
            "May reduce post-exercise fatigue",
            "Can assist certain chronic recovery cases",
        ],
        forWho: ["Post-injury recovery", "Low energy", "Slow tissue healing"],
        contraindications: ["Untreated pneumothorax", "Recent ear surgery", "Severe COPD (consult prior)"],
        tags: ["recovery", "energy", "healing"],
    },
    {
        id: "light",
        slug: "light-based-therapies",
        name: "Light-based Therapies",
        type: "Device",
        category: "Light",
        short: "Targeted red/near-IR light for tissue repair, pain relief and skin health.",
        long:
            "Photobiomodulation can modulate cellular energy and inflammatory signalling. Used for soft-tissue recovery, aches, and healthy skin support.",
        duration: "30–45 min",
        price: "££",
        image: "/therapies/light.jpg",
        icon: "💡",
        benefits: ["May reduce soreness and mild pain", "Supports tissue repair", "Skin vitality support"],
        forWho: ["Muscle aches", "Skin support", "General recovery"],
        tags: ["red light", "near-IR", "photobiomodulation"],
    },
    {
        id: "laser",
        slug: "laser-acupuncture",
        name: "Laser Acupuncture",
        type: "Device",
        category: "Acupuncture",
        short: "Needle-free photobiomodulation on classic points to rebalance and relax.",
        long:
            "Low-level light is applied to acupuncture points to encourage relaxation and autonomic balance—great for needle-averse clients.",
        duration: "30–45 min",
        price: "££",
        image: "/therapies/laser-acu.jpg",
        icon: "🎯",
        benefits: ["Deep relaxation", "Gentle autonomic rebalance"],
        forWho: ["Needle-averse clients", "Stress", "Sleep support"],
        tags: ["needle-free", "relaxation", "balance"],
    },
    {
        id: "pemf",
        slug: "pemf-therapy",
        name: "PEMF Therapy",
        type: "Device",
        category: "PEMF",
        short: "Pulsed electromagnetic fields to support circulation and cellular repair.",
        long:
            "Low-intensity electromagnetic pulses may encourage microcirculation and healthy cellular signalling—often used alongside other modalities.",
        duration: "30–45 min",
        price: "££",
        image: "/therapies/pemf.jpg",
        icon: "🧲",
        benefits: ["Microcirculation support", "Calming sensations"],
        forWho: ["General recovery", "Desk-based stiffness"],
        tags: ["circulation", "cellular", "recovery"],
    },
    {
        id: "compression",
        slug: "compression-therapy",
        name: "Compression Therapy",
        type: "Device",
        category: "Compression",
        short: "Peristaltic compression to boost lymphatic flow and aid recovery.",
        long:
            "Sequential compression can help move lymphatic fluid and ease heaviness in legs—popular with runners and recovery seekers.",
        duration: "30–45 min",
        price: "£",
        image: "/therapies/compression.jpg",
        icon: "🦵",
        benefits: ["Lighter legs", "Recovery between sessions"],
        forWho: ["Runners", "Heavy legs", "Desk-based sitting"],
        tags: ["lymphatic", "peristaltic", "recovery"],
    },
    {
        id: "physio",
        slug: "physiotherapy",
        name: "Physiotherapy",
        type: "Manual",
        category: "Physiotherapy",
        short: "Hands-on assessment, movement rehab and tailored exercise plans.",
        long:
            "Assessment-led treatment focused on movement quality, strength and pacing. We blend manual therapy with practical home exercises.",
        duration: "45–60 min",
        price: "££",
        image: "/therapies/physio.jpg",
        icon: "🏃",
        benefits: ["Personalised rehab", "Better movement patterns"],
        forWho: ["Injury rehab", "Mobility goals", "Chronic niggles"],
        tags: ["assessment", "rehab", "exercise"],
    },
    {
        id: "combined",
        slug: "combined-therapies",
        name: "Combined Therapies",
        type: "Combined",
        category: "Combined",
        short: "Custom programmes that blend modalities for faster, lasting results.",
        long:
            "We create short programmes that layer manual and device-based options to target your priorities with sensible frequency and progression.",
        duration: "60–90 min",
        price: "£££",
        image: "/therapies/combined.jpg",
        icon: "➕",
        benefits: ["Complementary effects", "Clear progression"],
        forWho: ["Multi-goal recovery", "Time-bound outcomes"],
        tags: ["programmes", "faster results"],
    },
];

const SPACE_ID = process.env.SPACE_ID
const OAUTH_TOKEN = process.env.OAUTH_TOKEN

if (!SPACE_ID || !OAUTH_TOKEN) {
    console.error('Please provide SPACE_ID and OAUTH_TOKEN environment variables.')
    process.exit(1)
}

const Storyblok = new StoryblokClient({
    oauthToken: OAUTH_TOKEN,
})

function getUUID() {
    if (globalThis.crypto && globalThis.crypto.randomUUID) {
        return globalThis.crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function migrate() {
    console.log("Starting nested block migration...")

    // 1. Fetch the 'therapies' page summary to get ID
    let storyId;
    let storyName;
    let summary;

    try {
        const res = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            with_slug: 'therapies',
            version: 'draft'
        })

        if (res.data.stories.length === 0) {
            console.error("Could not find a story with slug 'therapies'. Please create it first.")
            return;
        }

        summary = res.data.stories[0];
        storyId = summary.id;
        storyName = summary.name;
        console.log(`Target Story: ${storyName} (${storyId}) Type: ${summary.content_type}`)

        if (summary.content_type !== 'page') {
            console.error("Target story is not of type 'page'. Aborting to avoid schema mismatch.")
            return;
        }

    } catch (e) {
        console.error("Error finding story:", e.response?.data || e.message)
        return;
    }

    // 2. Construct clean 'page' content structure (Overwrite logic)
    // This bypasses the issue of not being able to fetch existing empty content.
    const storyContent = {
        component: 'page',
        body: [
            {
                _uid: getUUID(),
                component: 'therapies_section',
                heading: 'Therapies',
                intro: 'Explore our range of therapies.',
                Cards: [],
                variant: 'full' // Ensure full variant is set
            }
        ]
    };

    const section = storyContent.body[0];

    // 3. Prepare the Card blocks
    const newCards = THERAPIES.map(therapy => ({
        _uid: getUUID(),
        component: 'therapy_card',
        name: therapy.name,
        slug: therapy.slug,
        category: therapy.category,
        type: therapy.type,
        duration: therapy.duration,
        price: therapy.price,
        long: therapy.long,
        benefits: therapy.benefits || [],
        forWho: therapy.forWho || [],
        contraindications: therapy.contraindications || [],
        view_href: { url: '', linktype: 'url' }
    }));

    // 4. Update the section
    section.Cards = newCards;

    console.log(`Prepared 'therapies_section' with ${newCards.length} cards.`)

    // 5. Save the story
    try {
        await Storyblok.put(`spaces/${SPACE_ID}/stories/${storyId}`, {
            story: {
                content: storyContent
            },
            publish: 1 // Publish immediately
        })
        console.log("Successfully updated the therapies page with new cards!")
    } catch (e) {
        console.error("Failed to update story:", e.response?.data || e.message)
    }
}

migrate()
