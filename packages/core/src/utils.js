const getDefaultExport = (content) => {
  content = content.toString('utf-8').trim();
  const matches =
    content.match(/^export\s+default\s+(.*)$/) ||
    content.match(/^module.exports\s*=\s*(.*)$/);
  return matches && matches[1].trim().replace(/;$/, '').trim(); // Remove trailing ';'
};

module.exports = {
  getDefaultExport,
};
