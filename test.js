const url =
  "https://aliexpress-datahub.p.rapidapi.com/store_item_search?storeId=1102051418&sellerId=231651707";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "07c3d30a48msh7f14b4b7ccee2cap11c871jsn9e2f0660efb4",
    "X-RapidAPI-Host": "aliexpress-datahub.p.rapidapi.com",
  },
};
let result = [];

async function resultados() {
  try {
    const response = await fetch(url, options);
    result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
