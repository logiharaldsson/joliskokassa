// mouse.js
import { ref, onMounted, onUnmounted } from "vue";
import useAuthUser from "@/composables/UseAuthUser";

import useSupabase from "./UseSupabase";
const { user } = useAuthUser();

const agesCategories = { "1-2": 1, "3-6": 2, "7-10": 3, "11-14": 4, "15+": 5 };

// This one might be unused... check
export async function getBoxName() {
  const { supabase } = useSupabase();
  const { data, error } = await supabase
    .from("giant_boxes")
    .select("name")
    .order("name", { ascending: true });
  return data;
}

// Add to box counter by givne amount (x)
export async function incrementBox(x, gender, box_age, box_number, year) {
  const { supabase } = useSupabase();
  let { data, error } = await supabase.rpc("increment5", {
    q_age: box_age,
    q_box_number: box_number,
    q_gender: gender,
    q_year: year,
    x: x,
  });

  const log = await logAction(
    user.value.email,
    gender,
    box_age,
    box_number,
    x,
    data
  );
  // const history = getHistoryLog();
  return data;
}

// Get count for all giant boxes for given compination of gender/age/year
export async function getAllBoxesCategory(gender, box_age, year) {
  const { supabase } = useSupabase();
  let { data, error } = await supabase
    .from("giant_boxes")
    .select("box_count")
    .match({ gender: gender, box_age: box_age, year: year })
    .order("box_number", { ascending: true });
  let box_count = data.map((count) => count.box_count);

  return box_count;
}

// Create giant box
export async function createGiantBox(gender, box_age, year) {
  const { supabase } = useSupabase();
  let boxes = await getAllBoxesCategory(gender, box_age, year);
  let box_number = boxes.length + 1;
  let name = `${gender}-${agesCategories[box_age]}-${year}`;
  const { data, error } = await supabase.from("giant_boxes").insert([
    {
      gender: gender,
      box_age: box_age,
      year: year,
      box_number: box_number,
      name: name,
    },
  ]);

  // Logging action - create new box
  const log = await logAction(
    user.value.email,
    gender,
    box_age,
    box_number,
    "nýr kassi",
    0
  );

  return data;
}

// Add action logs
export async function logAction(
  user_name,
  gender,
  age,
  box_number,
  action,
  counter_change
) {
  // console.log("user object", user.value.email);
  const { supabase } = useSupabase();
  // const action_time = new Date();
  const { data, error } = await supabase.from("counter_log").insert([
    {
      user_name: user_name,
      gender: gender,
      age: age,
      giant_box_id: box_number,
      action: action,
      counter_change,
      action_time: new Date(),
    },
  ]);
  return data;
}

export async function getHistoryLog() {
  const { supabase } = useSupabase();
  let { data, error } = await supabase
    .from("counter_log")
    .select("*")
    .limit(15)
    .order("id", { ascending: false });

  let table = "";
  data.forEach((log, index) => {
    let genderClass =
      log.gender === "girls" ? "text-pink-500" : "text-blue-500";
    let tableRow = `
      <div class="grid grid-cols-6">
      <div class="text-center p-2 pb-3 border-b-2 border-gray-500 ${genderClass} ${
      index % 2 !== 0 ? "bg-gray-100" : ""
    }">${log.gender === "girls" ? "Stelpur" : "Strákar"}</div>
      <div class="text-center p-2 pb-3 border-b-2 border-gray-500 ${genderClass} ${
      index % 2 !== 0 ? "bg-gray-100" : ""
    }">${log.age}</div>
                <div class="text-center p-2 pb-3 border-b-2 border-gray-500 ${genderClass} ${
      index % 2 !== 0 ? "bg-gray-100" : ""
    }">${log.giant_box_id}</div>
      <div class="text-center p-2 pb-3 border-b-2 border-gray-500 ${genderClass} ${
      index % 2 !== 0 ? "bg-gray-100" : ""
    }">${log.action}</div>
                <div class="text-center p-2 pb-3 border-b-2 border-gray-500 ${genderClass} ${
      index % 2 !== 0 ? "bg-gray-100" : ""
    }">${log.counter_change}</div>
      <div class="text-center p-2 pb-3 border-b-2 border-gray-500 ${genderClass} ${
      index % 2 !== 0 ? "bg-gray-100" : ""
    }">${dayjs(log.action_time).format("HH:mm:ss - D MMM")}</div>
      </div>`;
    table += tableRow;
  });

  return { data, table };
}

// Add to box counter by givne amount (x)
export async function total_boxes(q_year) {
  const { supabase } = useSupabase();
  let { data, error } = await supabase.rpc("total_boxes", {
    q_year,
  });

  console.log(" total boxes:", data);
  return data;
}

// Add to box counter by givne amount (x)
export async function total_gender(q_year, q_gender) {
  const { supabase } = useSupabase();
  let { data, error } = await supabase.rpc("total_gender", {
    q_year,
    q_gender,
  });

  console.log(" total gender:", data);
  return data;
}

// Get total boxes by group
export async function total_group_gender(q_year) {
  const { supabase } = useSupabase();
  let { data, error } = await supabase.rpc("get_total_group_gender", {
    q_year,
  });

  console.log(" total gender:", data);
  return data;
}
