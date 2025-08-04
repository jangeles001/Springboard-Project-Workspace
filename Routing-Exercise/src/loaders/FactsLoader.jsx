export const FactsLoader = async ({ params }) => {
   let response = await fetch('/mock-data.json')

    if (!response.ok) {
    throw new Error("Failed to load facts");
  }
    let data = await response.json();

    data = data?.find(resource => resource.id === params.id);

    if(!data){
      throw new Error("Resource not found")
    }

    return data;
}