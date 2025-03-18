export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Tarımsal Ürünlerinizi Keşfedin",
    description:
      "AgriMatch ile tüm tarımsal ürünlerinizi kolayca yönetin ve takip edin. Ürün çeşitliliğinizi artırın.",
    image: require("../../assets/onboarding/farming.png"),
  },
  {
    id: "2",
    title: "Alıcılarla Doğrudan Bağlantı",
    description:
      "Aracısız bir şekilde potansiyel alıcılarla iletişime geçin ve ürünlerinizi en iyi fiyata satın.",
    image: require("../../assets/onboarding/connection.png"),
  },
  {
    id: "3",
    title: "Pazar Analizleri",
    description:
      "Güncel pazar fiyatlarını takip edin, trend analizlerini inceleyin ve karlılığınızı artırın.",
    image: require("../../assets/onboarding/analysis.png"),
  },
  {
    id: "4",
    title: "Güvenli Ticaret",
    description:
      "Güvenli ödeme sistemi ve sözleşme yönetimi ile risksiz ticaret yapın.",
    image: require("../../assets/onboarding/secure.png"),
  },
];
