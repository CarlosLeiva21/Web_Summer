interface Pokedex {
    _id: number,
    name: string,
    habilities: Array<number>,
    primaryType: string,
    secondaryType: string,
    description: string
};

export default Pokedex;