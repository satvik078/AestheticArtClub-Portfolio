const PLACEHOLDER_ART_URL = (id) =>
    `https://placehold.co/300x${300 + (id % 4) * 20}/F0EBE0/333333?text=Art+${id}`;
  const PLACEHOLDER_PROFILE_URL = 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Artist';
  const PLACEHOLDER_SOCIAL_URL = (id) =>
    `https://placehold.co/250x250/F0EBE0/333333?text=Social+${id}`;
  
  export const ART_DATA = {
    profile: {
      name: 'Jane Doe',
      bio: 'Jane Doe is an artist dedicated to exploring the intersection of imagination, ink, and color. Her work spans traditional mediums like charcoal and oil, and digital art, focusing on themes of nature and cosmos.',
      profileImageUrl: PLACEHOLDER_PROFILE_URL,
    },
    artworks: [
      { id: 'art1', title: 'Pencil Sketch', imageUrl: PLACEHOLDER_ART_URL(1), isPrintAvailable: false, order: 1 },
      { id: 'art2', title: 'Landscape Painting', imageUrl: PLACEHOLDER_ART_URL(2), isPrintAvailable: true, order: 2 },
      { id: 'art3', title: 'Floral Arrangement', imageUrl: PLACEHOLDER_ART_URL(3), isPrintAvailable: false, order: 3 },
      { id: 'art4', title: 'Cityscape Night', imageUrl: PLACEHOLDER_ART_URL(4), isPrintAvailable: true, order: 4 },
      { id: 'art5', title: 'Cosmic View', imageUrl: PLACEHOLDER_ART_URL(5), isPrintAvailable: true, order: 5 },
      { id: 'art6', title: 'Portrait Print', imageUrl: PLACEHOLDER_ART_URL(6), isPrintAvailable: true, order: 6 },
      { id: 'art7', title: 'Abstract Ocean', imageUrl: PLACEHOLDER_ART_URL(7), isPrintAvailable: false, order: 7 },
    ].sort((a, b) => a.order - b.order),
  
    testimonials: [
      { id: 1, quote: "Jane’s attention to detail is unmatched. The custom piece perfectly captured my vision, highly recommended!", source: "Client A. (Commission)", type: "client" },
      { id: 2, quote: "A must-see portfolio. This artist is redefining digital landscapes with stunning color work and depth.", source: "Art Daily Magazine", type: "press", link: "#" },
      { id: 3, quote: "Incredible quality for the price. The print arrived quickly and looks gorgeous on my wall.", source: "Etsy Purchaser", type: "client" },
    ],
  
    socialFeed: [
      { id: 101, type: 'post', caption: 'New sketch for my upcoming series on deep space.', image: PLACEHOLDER_SOCIAL_URL(1), platform: 'Instagram', link: "#" },
      { id: 102, type: 'video', caption: 'Time-lapse of the cityscape painting. Watch the layers form!', image: PLACEHOLDER_SOCIAL_URL(2), platform: 'Youtube', link: "#" },
      { id: 103, type: 'announcement', caption: 'Prints back in stock this Friday! Limited quantity available.', image: PLACEHOLDER_SOCIAL_URL(3), platform: 'Dribbble', link: "#" },
      { id: 104, type: 'post', caption: 'Playing with vibrant greens and blues today. What do you think?', image: PLACEHOLDER_SOCIAL_URL(4), platform: 'Dribbble', link: "#" },
    ]
  };
  