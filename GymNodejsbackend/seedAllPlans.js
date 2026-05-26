import ConnectDB from "./db.js";
import AllPlans from "./modules/allPlansModule.js";
// ConnectDB();

const declarPlans = async () => {
  console.log("palns save");
  try {
    await ConnectDB();
  } catch (err) {
    return console.log("err in db connection", err);
  }
  if ((await AllPlans.countDocuments()) == 0) {
    await AllPlans.insertMany([
      {
        name: "Starter",
        price: 499,
        plan_type: "monthly",
        duration: "30",
        offer: "Perfect for beginners",
        badge: "Entry",
        features: ["Cardio zone", "Locker facility"],
        is_active: true,
      },
      {
        name: "Basic",
        price: 999,
        plan_type: "monthly",
        duration: "1 month",
        offer: "No Joining Fee",
        badge: "Popular",
        is_active: true,
        features: ["Gym equipment", "Locker facility"],
      },
      {
        name: "Standard",

        price: 1499,
        plan_type: "monthly",
        duration: "1 month",

        offer: "Free diet chart",
        badge: "Value",
        features: ["Weight training", "Group classes"],
        is_active: true,
      },
      {
        name: "Pro",

        price: 2499,
        plan_type: "monthly",
        duration: "1 month",

        offer: "1 Free PT Session",
        badge: "Best Value",
        features: ["Diet consultation", "Extended hours", "Group classes"],
        is_active: true,
      },
      {
        name: "Premium",
        price: 4999,
        plan_type: "monthly",
        duration: "1 month",

        offer: "Free Merchandise",
        badge: "Exclusive",
        features: ["Unlimited PT", "Nutrition plan", "Priority support"],
        is_active: true,
      },
      {
        name: "Elite",
        price: 6499,
        plan_type: "monthly",
        duration: "1 month",
        offer: "VIP Lounge Access",
        badge: "Luxury",
        features: ["Dedicated trainer", "Spa access", "Nutritionist support"],
        is_active: true,
      },
      {
        name: "Student",
        price: 799,
        plan_type: "monthly",
        duration: "1 month",
        offer: "Discounted for students",
        badge: "Youth",
        features: ["Flexible timings", "Study-friendly schedule"],
        is_active: true,
      },
      {
        name: "Couple",
        price: 3499,
        plan_type: "monthly",
        duration: "1 month",
        offer: "For 2 members",
        badge: "Duo",
        features: ["Shared trainer", "Couple yoga sessions"],
        is_active: true,
      },
      {
        name: "Family",
        price: 7499,
        plan_type: "monthly",
        duration: "1 month",
        offer: "Up to 4 members",
        badge: "Group",
        features: ["Family classes", "Nutrition workshops"],
        is_active: true,
      },
      {
        name: "Starter",
        price: 4499,
        plan_type: "yearly",
        duration: "12 months",
        offer: "Perfect for beginners",
        badge: "Entry",
        features: ["Cardio zone", "Locker facility"],
        is_active: true,
      },
      {
        name: "Basic",
        price: 8999,
        plan_type: "yearly",
        duration: "12 months",
        offer: "No Joining Fee",
        badge: "Popular",
        features: ["Gym equipment", "Locker facility"],
        is_active: true,
      },
      {
        name: "Standard",

        price: 13999,
        plan_type: "yearly",
        duration: "12 months",

        offer: "Free diet chart",
        badge: "Value",
        features: ["Weight training", "Group classes"],
        is_active: true,
      },
      {
        name: "Pro",

        price: 21999,
        plan_type: "yearly",
        duration: "12 months",

        offer: "1 Free PT Session",
        badge: "Best Value",
        features: ["Diet consultation", "Extended hours", "Group classes"],
        is_active: true,
      },
      {
        name: "Premium",
        price: 44999,
        plan_type: "yearly",
        duration: "12 months",

        offer: "Free Merchandise",
        badge: "Exclusive",
        features: ["Unlimited PT", "Nutrition plan", "Priority support"],
        is_active: true,
      },
      {
        name: "Elite",
        price: 62999,
        plan_type: "yearly",
        duration: "12 months",
        offer: "VIP Lounge Access",
        badge: "Luxury",
        features: ["Dedicated trainer", "Spa access", "Nutritionist support"],
        is_active: true,
      },
      {
        name: "Student",
        price: 6999,
        plan_type: "yearly",
        duration: "12 months",

        offer: "Discounted for students",
        badge: "Youth",
        features: ["Flexible timings", "Study-friendly schedule"],
        is_active: true,
      },
      {
        name: "Couple",
        price: 30999,
        plan_type: "yearly",
        duration: "12 months",

        offer: "For 2 members",
        badge: "Duo",
        features: ["Shared trainer", "Couple yoga sessions"],
        is_active: true,
      },
      {
        name: "Family",
        price: 69999,
        plan_type: "yearly",
        duration: "12 months",
        offer: "Up to 4 members",
        badge: "Group",
        features: ["Family classes", "Nutrition workshops"],
        is_active: true,
      },
    ]);
  }
  console.log("plans save succesfully");
};
declarPlans();
