export const ART_DATA = {
  profile: {
    name: 'Jane Doe',
    bio: 'Jane Doe is an artist dedicated to exploring the intersection of imagination, ink, and color. Her work spans traditional mediums like charcoal and oil, and digital art, focusing on themes of nature and cosmos.',
    profileImageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=Artist',
  },
  artworks: [
    { id: 'art1', title: 'Pencil Sketch', imageUrl: 'https://placehold.co/300x320/F0EBE0/333333?text=Art+1', isPrintAvailable: false, order: 1 },
    { id: 'art2', title: 'Landscape Painting', imageUrl: 'https://placehold.co/300x340/F0EBE0/333333?text=Art+2', isPrintAvailable: true, order: 2 },
    { id: 'art3', title: 'Floral Arrangement', imageUrl: 'https://placehold.co/300x360/F0EBE0/333333?text=Art+3', isPrintAvailable: false, order: 3 },
    { id: 'art4', title: 'Cityscape Night', imageUrl: 'https://placehold.co/300x380/F0EBE0/333333?text=Art+4', isPrintAvailable: true, order: 4 },
    { id: 'art5', title: 'Cosmic View', imageUrl: 'https://placehold.co/300x400/F0EBE0/333333?text=Art+5', isPrintAvailable: true, order: 5 },
    { id: 'art6', title: 'Portrait Print', imageUrl: 'https://placehold.co/300x420/F0EBE0/333333?text=Art+6', isPrintAvailable: true, order: 6 },
    { id: 'art7', title: 'Abstract Ocean', imageUrl: 'https://placehold.co/300x440/F0EBE0/333333?text=Art+7', isPrintAvailable: false, order: 7 },
  ].sort((a, b) => a.order - b.order),

  testimonials: [
    { id: 1, quote: "Jane’s attention to detail is unmatched. The custom piece perfectly captured my vision, highly recommended!", source: "Client A. (Commission)", type: "client" },
    { id: 2, quote: "A must-see portfolio. This artist is redefining digital landscapes with stunning color work and depth.", source: "Art Daily Magazine", type: "press", link: "#" },
    { id: 3, quote: "Incredible quality for the price. The print arrived quickly and looks gorgeous on my wall.", source: "Etsy Purchaser", type: "client" },
  ],

  socialFeed: [
    { id: 101, type: 'post', caption: 'New sketch for my upcoming series on deep space.', image: 'https://placehold.co/250x250/F0EBE0/333333?text=Social+1', platform: 'Instagram', link: "#" },
    { id: 102, type: 'video', caption: 'Time-lapse of the cityscape painting. Watch the layers form!', image: 'https://placehold.co/250x250/F0EBE0/333333?text=Social+2', platform: 'Youtube', link: "#" },
    { id: 103, type: 'announcement', caption: 'Prints back in stock this Friday! Limited quantity available.', image: 'https://placehold.co/250x250/F0EBE0/333333?text=Social+3', platform: 'Dribbble', link: "#" },
    { id: 104, type: 'post', caption: 'Playing with vibrant greens and blues today. What do you think?', image: 'https://placehold.co/250x250/F0EBE0/333333?text=Social+4', platform: 'Dribbble', link: "#" },
  ]
};
