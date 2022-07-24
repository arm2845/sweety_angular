export function stringifyObj(data: any): string {
    return JSON.stringify(data);
}

export function parseObj(data: string | null): any {
    return JSON.parse(<string>data);
}
