const fs = require("fs");
const { faker } = require("@faker-js/faker");

const accessoriesMen = require("./categories/accessoriesMen");
const accessoriesWomen = require("./categories/accessoriesWomen");
const coatsMen = require("./categories/coatsMen");
const coatsWomen = require("./categories/coatsWomen");
const pantsMen = require("./categories/pantsMen");
const pantsWomen = require("./categories/pantsWomen");
const partyOutfitMen = require("./categories/partyOutfitMen");
const partyOutfitWomen = require("./categories/partyOutfitWomen");
const shoesMen = require("./categories/shoesMen");
const shoesWomen = require("./categories/shoesWomen");
const summerMen = require("./categories/summerMen");
const summerWomen = require("./categories/summerWomen");
const topsMen = require("./categories/topsMen");
const topsWomen = require("./categories/topsWomen");

// console.log(
//   pantsMen.length,
//   pantsWomen.length,
//   accessoriesMen.length,
//   accessoriesWomen.length,
//   coatsMen.length,
//   coatsWomen.length,
//   partyOutfitMen.length,
//   summerMen.length,
//   summerWomen.length,
//   topsMen.length,
//   topsWomen.length
// );

const data = {
  accessoriesMen,
  accessoriesWomen,
  coatsMen,
  coatsWomen,
  pantsMen,
  pantsWomen,
  partyOutfitMen,
  partyOutfitWomen,
  shoesMen,
  shoesWomen,
  summerMen,
  summerWomen,
  topsMen,
  topsWomen,
};

const finalCatalog = {
  products: [],
};

// function cleanProductName(name){

// }

function addProtocolToLinks(links) {
  const correctedUrls = [];
  links.forEach((link) => correctedUrls.push(`https://${link}`));
  return correctedUrls;
}

function defineGender(collectionName) {
  if (collectionName.endsWith("Women")) {
    return "Women";
  }
  return "Men";
}

for (const collection in data) {
  for (const product of data[collection]) {
    // define function hasPreviousPrice()
    // define function cleanProductName()
    // define function additionalImageInterpolation()

    console.log(product.brandName);
    const newProduct = {
      id: product.id,
      name: product.name,
      currentPrice: product.price.current.value,
      // previousPrice: hasPreviousPrice(),
      // onSale
      colour: product.colour,
      brand: product.brandName,
      image: `https://${product.imageUrl}`,
      secondImages: addProtocolToLinks(product.additionalImageUrls),
      // video: need to fix the links,
      gender: defineGender(collection),
      category: collection,
      description: faker.commerce.productDescription(),
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: {
        S: Math.floor(Math.random() * 500),
        M: Math.floor(Math.random() * 500),
        L: Math.floor(Math.random() * 500),
        XL: Math.floor(Math.random() * 500),
        XXL: Math.floor(Math.random() * 500),
      },
      tags: [],
      isSellingFast: Math.random() < 0.5,
      isNew: Math.random() < 0.5,
      // Product type needs the DB in english
    };
    finalCatalog.products.push(newProduct);
  }
}

fs.writeFileSync("catalog.json", JSON.stringify(finalCatalog, null, "\t"));

// "id": 204376389,
// "name": "Lacoste L001 Sneakers In Green White",
// "colour": "WHITE",
// "brandName": "Lacoste",
// "price": 150,
// "url": "lacoste/lacoste-l001-sneakers-in-green-white/prd/204376389?clr=white&colourWayId=204376390",
// "image": "images.asos-media.com/products/lacoste-l001-sneakers-in-green-white/204376389-1-white",
// "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
// "material": "Granite",
// "gender": "male"
