// utils/filterGroups.js

// Normalize: lower case, remove special chars and spaces
const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

export const filterGroups = (groups, query) => {
  const search = normalize(query);

  return groups.filter((group) => {
    const groupName = normalize(group.title);
    const tags = group.tags || [];

    // Match name
    if (groupName.includes(search)) return true;

    // Match any tag
    return tags.some((tag) => normalize(tag).includes(search));
  });
};
