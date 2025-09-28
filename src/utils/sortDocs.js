export const sortDocs = (docs, sortType) => {
  const sorted = [...docs];

  switch (sortType) {
    case "name-asc":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
      );

    case "date-newest":
      return sorted.sort((a, b) => {
        const dateA = a.time?.toMillis?.() || 0;
        const dateB = b.time?.toMillis?.() || 0;
        return dateB - dateA;
      });

    case "date-oldest":
      return sorted.sort((a, b) => {
        const dateA = a.time?.toMillis?.() || 0;
        const dateB = b.time?.toMillis?.() || 0;
        return dateA - dateB;
      });

    default:
      return sorted;
  }
};
