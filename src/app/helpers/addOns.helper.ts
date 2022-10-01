import {AddOnOptionsData} from "../../dashboard/constants/add-on-data";

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
