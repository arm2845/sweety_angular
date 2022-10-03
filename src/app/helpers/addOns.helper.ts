import {AddOnOptionsData, doubleAddingPrice, tripleAddingPrice} from "../../dashboard/constants/add-on-data";

function extractAddOnNamesFromIds(ids: number[]): string[] {
    let addOnNames: string[] = [];
    ids.forEach(id => {
        addOnNames.push(AddOnOptionsData.find(item => item.id === id).name)
    });
    return addOnNames;
}

export function getAddOnsAsString(ids: number[]): string {
    let names = extractAddOnNamesFromIds(ids);
    return names.join(", ");
}

export function getAddOnPrice(addingIds: number[]): number {
    const count = addingIds.length;
    switch (count) {
        case 1: return AddOnOptionsData.find(item => item.id === addingIds[0]).price;
        case 2: return doubleAddingPrice;
        case 3: return tripleAddingPrice;
        default: return 0;
    }
}
