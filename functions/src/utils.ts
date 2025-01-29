function parseDate(dateString: string | null | undefined): Date | null {
    if (!dateString) return null;

    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
}

export { parseDate };