export enum Sunlight {
  no = 'no',
  low = 'low',
  high = 'high',
}

export enum WaterSymbol {
  rarely = 'OneDrop',
  regularly = 'TwoDrops',
  daily = 'ThreeDrops',
}

export interface Plant {
  name: string;
  price: string;
  sun: Sunlight | keyof typeof Sunlight;
  toxicity: boolean;
  url: string;
  water: keyof typeof WaterSymbol;
}

export const fetch = async (sun: string, water: string, pets: boolean): Promise<Plant[]> => {
  const params = new URLSearchParams();

  params.append('sun', sun);
  params.append('water', water);
  params.append('pets', pets.toString());
  
  const response = await window.fetch(
    `https://6nrr6n9l50.execute-api.us-east-1.amazonaws.com/default/front-plantTest-service?${params.toString()}`,
  )
  const data = await response.json();

  return data;
}