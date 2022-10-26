// mouse.js
import { ref, onMounted, onUnmounted } from "vue";
import useSupabase from "./UseSupabase";

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
  return data;
}

// Get count for all giant boxes for given compination of gender/age/year
export async function getAllBoxesCategory(gender, box_age, year) {
  const { supabase } = useSupabase();
  let { data, error } = await supabase
    .from("giant_boxes")
    .select("box_count")
    .match({ gender: gender, box_age: box_age, year: year });
  let box_count = data.map((count) => count.box_count);

  return box_count;
}

// Create giant box
export async function createGiantBox(gender, box_age, year) {
  const { supabase } = useSupabase();
  let boxes = await getAllBoxesCategory(gender, box_age, year);
  let box_number = boxes.length + 1;
  let name = `${gender}-${agesCategories[box_age]}-${year}`;
  console.log("name testing", name);
  const { data, error } = await supabase.from("giant_boxes").insert([
    {
      gender: gender,
      box_age: box_age,
      year: year,
      box_number: box_number,
      name: name,
    },
  ]);
  // let box_count = data.map((count) => count.box_count);
  console.log("creat box", data);
  return true;
}

// Add action logs
export async function logAction(
  user,
  gender,
  age,
  box_number,
  action,
  counter_change
) {
  const action_time = new Date();
  const { data, error } = await supabase
    .from("counter_log")
    .insert([
      {
        user_name: user,
        gender: gender,
        age: age,
        giant_box_id: box_number,
        action: action,
        counter_change,
        action_time,
      },
    ]);
  console.log("log action:", data);
  return data;
}
